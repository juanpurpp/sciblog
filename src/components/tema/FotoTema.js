import Image from 'next/image'
import Link from 'next/link'
const FotoTema = ({className,titulo, nombre,usuario_id, description}) => { 
  return (
    <div className='w-full flex-col space-y-2 sm:py-4 sm:flex sm:items-start sm:space-y-0 sm:space-x-6 bg-tarjeta'>
        <div className=' flex flex-col w-full justify-start space-y-4 mx-5 items-start'>
        <Image 
            width={100}
            height={100}
            src={'/perfil.png'}>
          </Image>
        </div>
        <Link href={"/perfil/"+usuario_id} className="border-primary-bg justify-start items-start hover:text-blue-600"> {nombre}</Link>
        <div className="border-primary-bg justify-start items-center text-3xl"> {titulo}</div>
        <div className="flex-col w-full justify-center items-center text-start text-2xl"> {description}</div>
        
    </div>
  )
}
 
export default FotoTema