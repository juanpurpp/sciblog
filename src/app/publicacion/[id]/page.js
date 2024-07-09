"use client";
import { useState } from 'react';
import Link from 'next/link'; // Importa Link de Next.js
import { Button } from '@nextui-org/react';
import { ArrowDownTrayIcon, ShareIcon, BookmarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from '@nextui-org/react';
import CommentsModal from '@/components/CommentsModal';
import { useMutation, useQuery } from 'react-query';
import Axios from '@/services/Axios';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Component({params}) {
  const session = useSession()

  const {data, isLoading} = useQuery("publicacion", async () => await Axios.get(`/estudios/${params.id}`))
  const { isOpen: isModalOneOpen, onOpenChange: setModalOneOpen } = useDisclosure();
  const { isOpen: isModalTwoOpen, onOpenChange: setModalTwoOpen } = useDisclosure();
  const { isOpen: isModalThreeOpen, onOpenChange: setModalThreeOpen } = useDisclosure();
  const [copied, setCopied] = useState(false);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // El mensaje "Copiado" desaparecerá después de 2 segundos
    }, () => {
      console.error('No se pudo copiar el texto');
    });
  };
  const publicaciones_query = useQuery("publicaciones", async () => await Axios.get('/estudios/guardados'))
  const guardarMutation = useMutation(async (data) => await Axios.post('/estudios/guardados', data),
    {
      onSuccess: () => {
        setModalThreeOpen(true)
        publicaciones_query.refetch()
      }
    })
  const handleGuardar = async () => {
    guardarMutation.mutate(
      {estudio_id: params.id}
    )
  }
  const router = useRouter()
  const borrar = useMutation(async () => await Axios.delete(`/estudios/${params.id}`), {onSuccess: () => router.push('/')})
 
  console.log('pg', publicaciones_query?.data?.data)
  const isSaved = publicaciones_query?.data?.data?.some((p) => p.estudioId == params.id)
  if(isLoading) return <div>Cargando...</div>
  return (
    <div className="bg-background p-8 w-full">
      <div className="flex w-full">
        <div className="w-1/3">
          <div className="font-bold text-lg">
            <Link className='hover:text-blue-400' href={`${window.location.origin}/perfil/${data.data.usuario_creador.id}`}>
              {data.data.usuario_creador.nombre + ' ' +data.data.usuario_creador.apellido }
            </Link>
          </div>
          <div className="text-sm">{data.data.usuario_creador.area_especializacion}</div>
          <div className="text-sm ">{data.data.usuario_creador.organizacion}</div>
        </div>
        <div className="flex w-1/3 justify-center">
          <h2 className="mb-4 text-2xl font-bold ">{data.data.titulo}</h2>
        </div>
        <div className="w-1/3 flex justify-end items-start space-x-2">


          <Modal isOpen={isModalOneOpen} onOpenChange={setModalOneOpen}>
            <ModalContent className='bg-azul'>
              <ModalHeader>Descarga Realizada</ModalHeader>
            </ModalContent>
          </Modal>
          <CommentsModal publicacion_id={params.id}/>
        </div>
      </div>

      <div className="flex w-full justify-center h-2/4 mb-48">
      {!isLoading && (
        <iframe title="covidcase" height={600} className='w-full' src={data?.data?.enlace} frameborder="0" allowFullScreen="true"></iframe>
      )}
      </div>
      <div className="flex w-full mb-4 space-x-4">
        <div className="flex-grow">
          <label htmlFor="description" className="text-md font-medium text-foreground ">Descripción</label>
        </div>

        <div className="flex space-x-2">
          <Button
            auto
            rounded
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white dark:bg-green-700 dark:hover:bg-green-800"
            onPress={() => setModalTwoOpen(true)}
          >
            Compartir Publicación
            <ShareIcon className="h-5 w-5 ml-2" />
          </Button>
          <Modal isOpen={isModalTwoOpen} onOpenChange={setModalTwoOpen}>
            <ModalContent>
              <ModalHeader className="flex flex-col bg-azul text-blanconegro">Compartir Enlace</ModalHeader>
              <ModalBody className='bg-azul'>
                <label
                  className="text-md text-blanconegro mb-4 cursor-pointer "
                  onClick={() => copyToClipboard(window.location.href)}
                >
                  {window.location.href}
                </label>
                {copied && <div className="text-sm text-green-500 dark:text-green-400">Copiado</div>}
              </ModalBody>
            </ModalContent>
          </Modal>
          {
            session.data && (
              <Button
                auto
                rounded
                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800 disabled:bg-blue-900 disabled:text-slate-400"
                onPress={handleGuardar}
                isDisabled={isSaved}
              >
                {isSaved ? 'Publicación Guardada' : 'Guardar Publicación'}
                {
                  isSaved?  <BookmarkIconSolid className="h-5 w-5 ml-2" /> : <BookmarkIcon className="h-5 w-5 ml-2" />
                }
              </Button>
            )
          }
          <Modal isOpen={isModalThreeOpen} onOpenChange={setModalThreeOpen}>
            <ModalContent className='bg-azul'>
              <ModalHeader className="dark:text-white">Publicacion Guardada</ModalHeader>
            </ModalContent>
          </Modal>
        </div>
      </div>

      <div className="flex w-full mb-24">
        <label htmlFor="description" className="text-sm font-medium text-foreground ">
          {data.data.descripcion}
        </label>
      </div>
      {
        (session.data && session.data.usuario.id == data.data.usuario_creador.id) && (
          <Button type='button' onClick={()=>borrar.mutate()} color='danger'>Borrar publicación</Button>
        )
      }  
    </div>
  );
}
