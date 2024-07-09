import Axios from "@/services/Axios"

const crearTema = async ({nombre, contenido}) =>{
  const response = await Axios.post('/foro', { nombre, contenido } )
  return response
}

const borrarTema = async ({idT}) =>{
  try {
    const response = await Axios.delete('/foro', { data: { idT } });
    return response; 
  } catch (error) {
    console.error("Error al intentar eliminar el tema:", error);
    throw error; 
  } 
}

const obtenerTemas = async () =>{
  const response = await Axios.get('/foro', {  } )
  return response
}
const buscaTemas = async () =>{
  const response = await Axios.get('/foro/busqueda?nombre=', { } )
  return response
}
export { crearTema , obtenerTemas, borrarTema, buscaTemas}