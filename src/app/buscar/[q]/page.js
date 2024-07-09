"use client"
import SearchBar from '@/components/SearchBar';
import PostCarousel from '@/components/PostCarousel';
import Link from 'next/link'; // Importa Link de Next.js
import { useState } from 'react';
import { set } from 'react-hook-form';
import { useQuery } from 'react-query';
import Axios from '@/services/Axios';
import PreviewPost from '@/components/PreviewPost';
import { Spinner } from '@nextui-org/react';

export default function Component({ params }) {
  const [q, setQ] = useState(params.q);
  const searching = useQuery('search', async () => await Axios.get(`/estudios/buscar`, {params:{q:decodeURIComponent(params.q)}}))
  return (
    <div className="bg-white p-8 w-full">
      {/* Primera columna con 3 divs en fila */}
      <div className='flex flex-col w-fulljustify-center space-y-4 items-center'>
        <h1 className='font-semibold text-3xl'>Buscar</h1>
        <SearchBar className='w-1/3' search={q} setSearch={setQ} />

      </div>
     {
      searching.isLoading ? 
      <div className='w-full h-52 flex justify-center items-center'>
        <Spinner/>
      </div> : (
        <div className='flex flex-col w-full justify-center space-y-4 items-center'>
        <div className='p-8 w-4/5 space-y-4 flex flex-col'>
          <h2 className='font-semibold text-3xl'>Resultados de {decodeURIComponent(params.q)}</h2>
          {!searching.isLoading && searching.data.data.map((post, index) => (
            <Link key={index} href={`/publicacion/${post.id}`}>
              <PreviewPost titulo={post.titulo} descripcion={post.descripcion} autor={post.usuario_creador.nombre +' '+post.usuario_creador.apellido} tags={post.tags}/>
            </Link>
          ))}
        </div>
      </div>
      )
     }
    </div>
  )
}