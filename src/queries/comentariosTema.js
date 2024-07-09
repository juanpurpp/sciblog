import Axios from "@/services/Axios"
 
const getComentarioByIdTema = async ({id}) => {
  //id de tema a comentar
  const response = await Axios.get(`/comentarTema/${id}`)
  return response
}
const crearComentario = async ({texto, temaId}) =>{
  const response = await Axios.post('/comentarTema', { texto, temaId } )
  return response
}
const borrarComentario = async ({id}) => {
  //id de comentario a borrar
  const response = await Axios.delete(`/comentarTema/${id}`)
  return response
}
export {getComentarioByIdTema, crearComentario, borrarComentario}