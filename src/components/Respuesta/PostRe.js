"use client";
import FotoRe from './FotoRe';
import { useQuery } from 'react-query';
import { getRespuestaByIdComentario } from '@/queries/respuesta';
import { useSession } from 'next-auth/react';

const PostRe = ({ className, id }) => {
  console.log("aaaasas", id)
  const { data, isLoading, isError } = useQuery(['get-respuesta', id], () => getRespuestaByIdComentario({ id }));
  console.log('data', data)
  const { data: session } = useSession();
  return (
    <div className={className}>
      <div className="flex flex-col w-full">
        <div className="relative w-full">
          <div className="flex flex-col w-full">
            {data?.data.data.map((item, index) => (
              <div className="w-full px-4 mt-4" key={index}>
                <FotoRe
                  nombre={<strong>{item.usuario.nombre + ' ' + item.usuario.apellido}</strong>}
                  content={item.content}
                  id={item.id}
                  correo={item.usuario.email} // Correo del creador de la respuesta
                  usuarioCorreo={session?.user?.email} // Correo del usuario actual
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostRe;
