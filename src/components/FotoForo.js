import Image from 'next/image';
import { borrarTema } from '@/queries/foro';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Fotoforo = ({ className, nombre, description, idT, correo, usuarioCorreo, id_usuario }) => {
  const [deleted, setDeleted] = useState(false);

  const forMutation = useMutation({
    mutationFn: (data) => borrarTema(data),
    onSuccess: () => {
      console.log('Tema eliminado correctamente');
      setDeleted(true); // Actualiza el estado local para reflejar que el tema ha sido eliminado
    },
    onError: (error) => {
      console.error('Error al eliminar el tema', error);
    },
  });

  const onSubmit = (event) => {
    event.stopPropagation(); // Evitar la propagación del evento
    forMutation.mutate({
      idT,
    });
  };

  // Comprueba si el usuario actual es el que hizo el tema
  const correoTema = correo === usuarioCorreo;

  if (deleted) {
    return null; // Otra opción es mostrar un mensaje indicando que el tema ha sido eliminado
  }

  return (
    <div className="flex w-full space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 bg-tarjeta overflow-hidden">
      <Link href={`/Tema/${idT}`} className='w-full'>
        <div className="flex w-full space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 bg-tarjeta">
          <div className="flex flex-col w-1/3 justify-start space-y-4 items-center">
            <Image width={130} height={130} src={'/perfil.png'}></Image>
            <div className="border-primary-bg justify-center items-center"> {nombre}</div>
          </div>
          <div className="flex-col w-full justify-center items-center text-start text-xl"> {description}</div>
        </div>
      </Link>
      <div className='flex w-1/12 justify-end'>
        {correoTema ? (
          <div className="flex w-1/3 justify-end items-center mr-7">
            <Button type="button" size='md' onClick={onSubmit} className="p-2 rounded bg-red-500 hover:bg-red-700 text-white">
              <TrashIcon className="h-7 w-7" />
            </Button>
          </div>
        ) : (
          <div className="flex w-1/3 justify-center items-center mr-7"></div>
        )}
      </div>
    </div>
  );
};

export default Fotoforo;
