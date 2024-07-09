"use client"
import React from "react";
import { Avatar, Spinner } from "@nextui-org/react";
import { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Card, CardBody } from "@nextui-org/react";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from '@nextui-org/react';
import { TrashIcon, PencilIcon, ShareIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'; // Importa Link de Next.js
import ThemeSwitch from "@/components/ThemeSwitch";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import Axios from "@/services/Axios";

const Componente = ({params}) => {
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
  const perfil_query = useQuery("perfil", async () => await Axios.get(`/usuarios/${params.id}`))
  const mis_publicaciones = useQuery("mis_publicaciones", async () => await Axios.get(`/estudios/byUser/${params.id}`))
  const {data, status} = useSession()
  if(status != 'authenticated') return <div className="w-full h-44 flex justify-center items-center">
    <p className="text-center align-middle text-4xl text-slate-800 font-semibold w-full"> Debe iniciar sesión para ver su perfil</p>
  </div>
  console.log('pr', perfil_query.data)
  if(perfil_query.isLoading) return <Spinner></Spinner>
  return (
    <div className=" p-8 w-full">
      {/* Primera columna con 3 divs en fila */}
      <div className="flex w-full mb-24">
        <div className="w-1/3 space-x-1">
          <div>
            <div className="font-bold text-lg">{perfil_query.data?.data?.data.nombre + ' ' +perfil_query.data?.data?.data.apellido}</div>
            <div className="text-sm">{ perfil_query.data?.data?.data.area_especializacion}</div>
            <div className="text-sm">{ perfil_query.data?.data?.data.organizacion }</div>
          </div>
        </div>
        <div className="flex w-1/3 justify-center">
          <Avatar src={data.user.image} className="w-20 h-20 text-large"/>
        </div>

        <div className="flex-col w-1/3 space-y-2">

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
                    {window.location.href}
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
                  Sus publicaciones
                </Button>
              </DropdownTrigger>
              
              <DropdownMenu>
                {
                  !mis_publicaciones.isLoading && mis_publicaciones?.data?.data.map((publicacion) => (
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