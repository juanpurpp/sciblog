import Image from 'next/image'
import { Button } from '@nextui-org/button';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { borrarRespuesta } from '@/queries/respuesta';
import { TrashIcon } from '@heroicons/react/24/outline';
const FotoRe = ({className, nombre, content,correo, usuarioCorreo,id}) => { 
  const [deleted, setDeleted] = useState(false);
  console.log("jajajajajja", id)
  const ReMutation = useMutation({
    mutationFn: (data) => borrarRespuesta(data),
    onSuccess: () => {
      console.log('respuesta eliminado correctamente');
      setDeleted(true); // Actualiza el estado local para reflejar que el tema ha sido eliminado
    },
    onError: (error) => {
      console.error('Error al eliminar el respuesta', error);
    },
  });

  const onSubmit = (event) => {
    event.stopPropagation(); // Evitar la propagación del evento
    ReMutation.mutate({
      id,
    });
  };

  // Comprueba si el usuario actual es el que hizo el tema
  const correoTema = correo === usuarioCorreo;

  if (deleted) {
    return null; // Otra opción es mostrar un mensaje indicando que el tema ha sido eliminado
  }
  
  
  
  return (
    <div className='w-full flex-row space-y-2 sm:py-4 sm:flex sm:items-start sm:space-y-0 sm:space-x-6 bg-tarjeta'>
      <div className='w-full flex-col space-y-2 sm:py-4 sm:flex sm:items-start sm:space-y-0 sm:space-x-6 bg-tarjeta'>
        <div className=' flex flex-row w-1/3 mx-5 justify-start space-y-4 items-start'>
        <Image 
            width={50}
            height={50}
            src={'/perfil.png'}>
          </Image>
          <div className="border-primary-bg justify-center items-center ">{nombre}</div>
        </div>
        <div className="flex-col w-full justify-center items-center text-start text-xl"> {content}</div>
        
      </div>
      <div className='flex flex-col w-1/12 justify-start items-center'>
        <div className='flex justify-start mx-10'>
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
        <div className='flex justify-end'> </div>
      </div>
    </div>
    
    
  )
}

export default FotoRe