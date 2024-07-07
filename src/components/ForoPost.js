"use client";
import { useQuery, useQueryClient } from 'react-query';
import { obtenerTemas } from '@/queries/foro';
import { useSession } from 'next-auth/react';
import FotoForo from './FotoForo'
import Link from 'next/link';

const ForoPost = ({ className }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(['get-foros'], obtenerTemas);
  const { data: session } = useSession();

  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries(['get-foros']);
  };

  return (
    <div className={className}>
      <div className="flex flex-col w-full">
        <div className="relative w-full">
          <div className="flex flex-col w-full">
            {data?.data.data.map((item, index) => (
              <div className="w-full px-4 mt-4" key={index}>            
                  <FotoForo
                    nombre={<strong>{item.usuario_tema.nombre + ' ' + item.usuario_tema.apellido}</strong>}
                    description={item.nombre}
                    idT={item.id}
                    correo={item.usuario_tema.email}
                    usuarioCorreo={session?.user?.email}
                    onDeleteSuccess={handleDeleteSuccess}
                  />             
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForoPost;
