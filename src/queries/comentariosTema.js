import Axios from "@/services/Axios"
 
const getComentarioByIdTema = async ({id}) => {
  
  const response = await Axios.get(`/comentarTema/${id}`)
  return response
}
const crearComentario = async ({texto, temaId}) =>{
  const response = await Axios.post('/comentarTema', { texto, temaId } )
  return response
}
export {getComentarioByIdTema, crearComentario}