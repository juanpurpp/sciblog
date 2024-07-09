import Image from 'next/image'
import PostRe from '@/components/Respuesta/PostRe';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
const FotoCom = ({className, nombre, description,id,TemaId}) => { 
  const router = useRouter();
  const Respuestaid=id;
  const handleClick = () => {
    router.push(`/Tema/${TemaId}/respuestaCo/${Respuestaid}`);
  };

  return (
    <div className='w-full flex-col space-y-2 sm:py-4 sm:flex sm:items-start sm:space-y-0 sm:space-x-6 bg-violeta'>
      <div className='w-full justify-start flex-row space-y-2 sm:py-4 sm:flex sm:items-start sm:space-y-0 sm:space-x-6 bg-violeta'>
        <div  className=' flex flex-col w-1/3 mx-5 justify-start space-y-4 items-start'>
          <div className=' flex flex-row w-1/3 mx-5 justify-start space-y-4 items-start'>
          <Image 
              width={60}
              height={50}
              src={'/perfil.png'}>
            </Image>
            <div className="border-primary-bg mx-1 justify-center items-center "> {nombre}</div>
          </div>
          <div className="flex-col w-full justify-center items-center text-start text-xl"> {description}</div>
        </div>  
        <div className='flex w-full' ></div>
        <div className='flex flex-col w-1/6 justify-end'>
          <div className='flex flex-col w-full justify-start'></div>
            <div className='flex w-full justify-center'>
              <Button type="button" size='md' className="p-2 text-white bg-fuchsia" onClick={handleClick}>
                Comentar
              </Button>
            </div>
        </div>
      </div>
        
      <details className="p-4 rounded w-11/12 bg-purpura" >
          <summary className="text-xl font-semibold cursor-pointer w-full ">ver comentarios</summary>
          <a className="w-full"><PostRe className="w-full " id={id}/></a>
        </details>
    </div>
    
    
  )
}

export default FotoCom