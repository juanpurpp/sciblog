import FotoTema from './FotoTema'
import { useSession } from 'next-auth/react'; 

const PostTema = ({id, className, nombre, contenido,usuario_tema}) => {
  const { data: session } = useSession();

    return (
      <div className={className}>
        <div className="flex flex-col w-full">
          
          <div className="relative w-full  ">
            <div className="flex flex-col w-full">
              <div className="w-full px-4 mt-4">
              <FotoTema nombre={<strong>{usuario_tema.nombre+ ' ' +usuario_tema.apellido}</strong>} titulo={<strong>{nombre}</strong>} description={contenido} correo={usuario_tema.email} usuarioCorreo={session?.user?.email} id={id}/>
              </div>  
            </div>  
          </div>
          
        </div>
      </div>
    ) 
  }
  
  export default PostTema;