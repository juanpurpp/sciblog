import Image from 'next/image'
import PostRe from '@/components/Respuesta/PostRe';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { borrarComentario } from '@/queries/comentariosTema';
import { TrashIcon } from '@heroicons/react/24/outline';
const FotoCom = ({className, nombre, description,id,TemaId,correo, usuarioCorreo}) => { 
  const router = useRouter();
  const Respuestaid=id;
  const handleClick = () => {
    router.push(`/Tema/${TemaId}/respuestaCo/${Respuestaid}`);
  };

  const [deleted, setDeleted] = useState(false);
  console.log("LLLLLLLL", id)
  const CoMutation = useMutation({
    mutationFn: (data) => borrarComentario(data),
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
    CoMutation.mutate({
      id,
    });
  };

  const correoTema = correo === usuarioCorreo;

  if (deleted) {
    return null; 
  }

  return (
    <div className='w-full flex-col space-y-2 sm:py-4 sm:flex sm:items-start sm:space-y-0 sm:space-x-6 bg-violeta'>
      <div className='w-full justify-start flex-row space-y-2 sm:py-1 sm:flex sm:items-start sm:space-y-0 sm:space-x-6 bg-violeta'>
        <div  className=' flex flex-col w-1/3 mx-5 justify-start space-y-2 items-start'>
          <div className=' flex flex-row w-1/3 mx-1 justify-start space-y-2 items-start'>
          <Image 
              width={60}
              height={50}
              src={'/perfil.png'}>
            </Image>
            <div className="border-primary-bg mx-1 justify-center items-center "> {nombre}</div>
          </div>
          <div className="flex-col mx-1 w-full justify-center items-center text-start text-xl"> {description}</div>
          <div className='flex w-full justify-start '>
                  <Button type="button" size='md' className="p-1 text-xs text-white bg-fuchsia" onClick={handleClick}>
                    Responder
                  </Button>
              </div>
        </div>  
        <div className='flex w-full' ></div>
        <div className='flex flex-col w-1/6 justify-end'>
          <div className='flex flex-col w-full justify-start'></div>
          <div className='flex flex-col space-y-2'>
              
          <div className='flex w-full justify-center '>
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
            
        </div>
      </div>
      
      <details className="p-3 rounded w-11/12 bg-purpura" >
      
          <summary className="text-l font-semibold cursor-pointer w-full ">ver respuestas</summary>
          <a className="w-full"><PostRe className="w-full " id={id}/></a>
      </details>
    </div>
    
    
  )
}

export default FotoCom