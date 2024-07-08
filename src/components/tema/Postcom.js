"use client";
import FotoCom from './FotoCom';
import { useQuery } from 'react-query';
import { getComentarioByIdTema } from '@/queries/comentariosTema';

const Postcom = ({ className, TemaId }) => {
  const { data, isLoading, isError } = useQuery(['get-comentario', TemaId], () => getComentarioByIdTema({ id: TemaId }));
  console.log('data', data)

  return (
    <div className={className}>
      <div className="flex flex-col w-full">
        <div className="relative w-full">
          <div className="flex flex-col w-full">
            {data?.data.data.map((item, index) => (
              <div className="w-full px-4 mt-4" key={index}>
                <FotoCom
                  nombre={<strong>{item.usuario.nombre}</strong>}
                  description={item.Texto}
                  id={item.id}                
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postcom;
