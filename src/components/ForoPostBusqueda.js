"use client";
import { useQuery } from 'react-query';
import { obtenerTemas } from '@/queries/foro';
import { useSession } from 'next-auth/react'; // Importa useSession de Next.js
import FotoForo from './FotoForo'
import Link from 'next/link';
import Axios from '@/services/Axios';
import { Spinner } from '@nextui-org/react';
const ForoPostBusqueda = ({ className, busqueda }) => {
  const { data, isLoading } = useQuery(['get-foros'], () => Axios.get(`/foro/busqueda`, {params: {nombre:decodeURIComponent(busqueda)}}));
  const { data: session } = useSession(); // Obtener los datos de quien lo esta usando ahora

  console.log('data', data)
  return (
    <div className={className}>
      <div className="flex flex-col w-full">
        <div className="relative w-full">
          <div className="flex flex-col w-full">
            {
              isLoading ? (
                <Spinner/>
              
              ):(
                data?.data.data.map((item, index) => (
                  <div className="w-full px-4 mt-4" key={index}>
                    
                        <FotoForo
                          nombre={<strong>{item.usuario_tema.nombre + ' ' + item.usuario_tema.apellido}</strong>}
                          description={item.nombre}
                          idT={item.id}
                          correo={item.usuario_tema.email}
                          usuarioCorreo={session?.user?.email}
                        />
                
                  </div>
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForoPostBusqueda;
