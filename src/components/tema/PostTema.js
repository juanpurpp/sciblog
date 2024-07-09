import FotoTema from './FotoTema'

const PostTema = ({className, nombre, contenido,usuario_tema}) => {
    return (
      <div className={className}>
        <div className="flex flex-col w-full">
          
          <div className="relative w-full  ">
            <div className="flex flex-col w-full">
              <div className="w-full px-4 mt-4">
              <FotoTema nombre={<strong>{usuario_tema.nombre+ ' ' +usuario_tema.apellido}</strong>} titulo={<strong>{nombre}</strong>} description={contenido}/>
              </div>  
            </div>  
          </div>
          
        </div>
      </div>
    ) 
  }
  
  export default PostTema;