import Image from 'next/image'

const FotoRe = ({className, nombre, content}) => { 
  return (

    <div className='w-full flex-col space-y-2 sm:py-4 sm:flex sm:items-start sm:space-y-0 sm:space-x-6 bg-violeta'>
        <div className=' flex flex-row w-1/3 mx-5 justify-start space-y-4 items-start'>
        <Image 
            width={50}
            height={50}
            src={'/perfil.png'}>
          </Image>
          <div className="border-primary-bg justify-center items-center ">{nombre}</div>
        </div>
        <div className="flex-col w-full justify-center items-center text-start text-xl"> {content}</div>
        
    </div>
    
  )
}

export default FotoRe