'use client'
import {Button} from '@nextui-org/button'; 
import ForoPost from '@/components/ForoPost';
import {useRouter} from 'next/navigation'
import BusquedaForo from '@/components/BusquedaForo';
import ForoPostBusqueda from '@/components/ForoPostBusqueda';


export default function Page({params}) {
    return (
      <div className="flex w-full flex-col mx-0 overflow-y-auto">

        <div className="flex flex-row w-full ">
          <div className='flex justify-start full my-6 mx-5 px-2'>
            <h1 className='font-semibold text-3xl'>FORO</h1>
          </div>
          
        </div>
        
        
        <div className="flex flex-row w-full space-y-0 my-0 mx-5 px-2 ">
          <div className='flex w-full justify-start items-start'>
            <h1 className='text-xl font-semibold'>Resultados de <span className='italic'>{params.q}</span></h1>
          </div> 
          <div className="flex w-full justify-end items-center mr-7 px-8">
            <Button color="primary" onClick={() => router.push('foros/FormuForo')}>Agregar nuevo tema</Button>
          </div>
          
        </div>
        <div className='w-full justify-start items-start flex flex-col my-4 px-6 space-y-0 '>
          <a className="w-full"><ForoPostBusqueda busqueda={params.q}/></a>
          
        </div>
      </div>
  )
}
  
  