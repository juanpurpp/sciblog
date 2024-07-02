"use client"
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data";
import { Avatar } from "@nextui-org/react";
import { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Card, CardBody } from "@nextui-org/react";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from '@nextui-org/react';
import { TrashIcon, PencilIcon, ShareIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'; // Importa Link de Next.js
import ThemeSwitch from "@/components/ThemeSwitch";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import Axios from "@/services/Axios";

const Componente = () => {
  const { isOpen, onOpenChange } = useDisclosure();

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
  const session = useSession()
  const mis_publicaciones = useQuery("mis_publicaciones", async () => await Axios.get(`/estudios/byUser/${session.data.usuario.id}`))
  const {data, status} = useSession()
  console.log('pg', publicaciones_query)
  if(status != 'authenticated') return <div className="w-full h-44 flex justify-center items-center">
    <p className="text-center align-middle text-4xl text-slate-800 font-semibold w-full"> Debe iniciar sesión para ver su perfil</p>
  </div>
  return (
    <div className=" p-8 w-full">
      {/* Primera columna con 3 divs en fila */}
      <div className="flex w-full mb-24">
        <div className="w-1/3 space-x-1">
          <Link href="/perfil/eliminarCuenta">
            <button className="p-2 rounded bg-red-500 hover:bg-red-700 text-white">
              <TrashIcon className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/perfil/editarPerfil">
            <button className="p-2 rounded bg-blue-500 hover:bg-blue-700 text-white">
              <PencilIcon className="h-5 w-5" />
            </button>
          </Link>
          <div>
            <div className="font-bold text-lg">{data.user.nombre + ' ' +data.user.apellido}</div>
            <div className="text-sm">{ data.user.area_especializacion}</div>
            <div className="text-sm">{ data.user.organizacion }</div>
          </div>
        </div>
        <div className="flex w-1/3 justify-center">
          <Avatar src={data.user.image} className="w-20 h-20 text-large"/>
        </div>

        <div className="flex-col w-1/3 space-y-2">
          <div className="flex justify-end"> 
            <ThemeSwitch></ThemeSwitch>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              className="rounded-md text-white"
              color="success"
              onPress={() => onOpenChange(true)}
            >
              <ShareIcon className="h-5 w-5" />
              Compartir Perfil
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                <ModalHeader className="flex flex-col bg-azul">Compartir Enlace</ModalHeader>
                <ModalBody>
                  <label
                    className="text-md text-gray-500 mb-4 cursor-pointer"
                    onClick={() => copyToClipboard('google.com')}
                  >
                    google.com
                  </label>
                  {copied && <div className="text-sm text-green-500">Copiado</div>}
                </ModalBody>
              </ModalContent>
            </Modal>           
          </div>
        </div>
      </div>

      {/* Segunda columna */}
      <Card className=" bg-purpura">
        <CardBody>
        <div className="flex justify-center mx-6 ">
          
          <div className="flex w-1/2 justify-center">
            <Dropdown >
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="w-full bg-tarjeta"
                >
                  Publicaciones Guardadas
                </Button>
              </DropdownTrigger>
             
              <DropdownMenu>
                {!publicaciones_query.isLoading && publicaciones_query?.data?.data.map((guardado) => (
                  <DropdownItem key={guardado.estudio.id} href={`/publicacion/${guardado.estudio.id}`}>{guardado.estudio.titulo}</DropdownItem>
                ))}
              </DropdownMenu>
              
             
            </Dropdown>
          </div>
          <div className="flex w-1/2 justify-center">
            <Dropdown >
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="w-full bg-tarjeta"
                >
                  Mis Publicaciones
                </Button>
              </DropdownTrigger>
              
              <DropdownMenu>
                {
                  !mis_publicaciones.isLoading && mis_publicaciones.data.data.map((publicacion) => (
                    <DropdownItem key={publicacion.id} href={`/publicacion/${publicacion.id}`}>
                      {publicacion.titulo}
                    </DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>
          </div>
            
        </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Componente;