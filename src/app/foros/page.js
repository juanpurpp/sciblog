'use client'
import {Button} from '@nextui-org/button'; 
import ForoPost from '@/components/ForoPost';
import {useRouter} from 'next/navigation'
import SearchBar from '@/components/SearchBar';
import ThemeSwitch from "@/components/ThemeSwitch";

export default function Page() {
  const router =useRouter()

    return (
      <div className="flex w-full flex-col mx-0 overflow-y-scroll">

        <div className="flex flex-row w-full ">
          <div className='flex justify-start full my-6 mx-5 px-2'>
            <h1 className='font-semibold text-3xl'>FORO</h1>
          </div>
          <div className="flex justify-end w-full mr-6"> 
            <ThemeSwitch></ThemeSwitch>
          </div>
        </div>
        

        <div className="flex flex-row w-full space-y-0 my-0 mx-5 px-2 ">
          <div className='flex w-full justify-start items-start'>
            <h1 className='text-xl font-semibold'>Temas</h1>
          </div>
          <div className='flex w-full justify-center items-start'>
            <SearchBar className='w-full' placeholder="Buscar tema"/>
          </div>
          <div className="flex w-full justify-end items-center mr-7 ">
            <Button color="primary" onClick={() => router.push('foros/FormuForo')}>Agregar nuevo tema</Button>
          </div>
          
        </div>
        <div className='w-full justify-start items-start flex flex-col my-4 mx-2 px-2 space-y-0 '>
          <a className="w-full" onClick={() => router.push('/Tema')}><ForoPost className="w-full"/></a>
          
        </div>
      </div>
  )
}
  
  