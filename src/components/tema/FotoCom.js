import Image from 'next/image'
import PostRe from '@/components/Respuesta/PostRe';
const FotoCom = ({className, nombre, description,id}) => { 
  return (

    <div className='w-full flex-col space-y-2 sm:py-4 sm:flex sm:items-start sm:space-y-0 sm:space-x-6 bg-violeta'>
        <div className=' flex flex-row w-1/3 mx-5 justify-start space-y-4 items-start'>
        <Image 
            width={50}
            height={50}
            src={'/perfil.png'}>
          </Image>
          <div className="border-primary-bg justify-center items-center "> {nombre}</div>
        </div>
        <div className="flex-col w-full justify-center items-center text-start text-xl"> {description}</div>
        
        <details className="p-4 rounded w-11/12 bg-purpura" >
          <summary className="text-xl font-semibold cursor-pointer w-full ">ver comentarios</summary>
          <a className="w-full"><PostRe className="w-full " id={id}/></a>
        </details>
    </div>
    
  )
}

export default FotoCom