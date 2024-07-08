import Image from 'next/image';
import { borrarTema } from '@/queries/foro';
import { useMutation } from 'react-query';
import { Button } from '@nextui-org/button';
import { TrashIcon } from '@heroicons/react/24/outline';

const Fotoforo = ({ className, nombre, description, idT, correo, usuarioCorreo }) => {
  const forMutation = useMutation({
    mutationFn: (data) => borrarTema(data),
    onSuccess: () => {
      console.log('Tema eliminado correctamente');
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error al eliminar el tema', error);
    },
  });
  const onSubmit = () => {
    forMutation.mutate({//envio el id en la varible idT del tema 
      idT,
    });
  };

  // Comprueba si el usuario actual es el que iso el tema
  const correoTema = correo === usuarioCorreo;

  return (
    <div className="w-full space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 bg-tarjeta">
      <div className="flex flex-col w-1/3 justify-start space-y-4 items-center">
        <Image width={130} height={130} src={'/perfil.png'}></Image>
        <div className="border-primary-bg justify-center items-center"> {nombre}</div>
      </div>
      <div className="flex-col w-full justify-center items-center text-start text-xl"> {description}</div>
      {correoTema ? ( // muestra el boton si el tema es del usuario que esta usando la pag
        <div className="flex w-1/3 justify-center items-center mr-7">
          <Button type="button" size='md' onClick={onSubmit} className="p-2 rounded bg-red-500 hover:bg-red-700 text-white">
            <TrashIcon className="h-7 w-7" />
          </Button>
        </div>
      ): (//si no es el usuario no se muestra nada
        <div className="flex w-1/3 justify-center items-center mr-7">
        </div>
      )}
    </div>
  );
};

export default Fotoforo;
