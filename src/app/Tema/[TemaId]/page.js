"use client"
import { Button } from '@nextui-org/button';
import PostTema from '@/components/tema/PostTema';
import Postcom from '@/components/tema/Postcom';
import Link from 'next/link';
import useTemas from '../../../hooks/useTemas';

export default function Page({ params: { TemaId } }) {
  const { tema, isLoading } = useTemas(TemaId);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!tema) {
    return <div>El tema no existe</div>;
  }

  const { nombre, contenido, usuario_tema } = tema;

  return (
    <div className='flex flex-col w-full mx-0 overflow-y-scroll'>
      <div className='flex flex-col justify-start items-center'>
        <PostTema className="w-full" id={TemaId} nombre={nombre} contenido={contenido} usuario_tema={usuario_tema} />
        <div className="flex w-11/12 justify-start items-center mr-7">
          <Link href={`/Tema/${TemaId}/comentario`}>
            <Button color="primary" className="text-2xl my-4">Comentar</Button>
          </Link>
        </div>
      </div>
      <div className='w-full justify-start items-start flex flex-col px-1 space-y-0'>
        <Postcom className="w-full" TemaId={TemaId} />
      </div>
    </div>
  );
}
