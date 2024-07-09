import Axios from "@/services/Axios"

const crearRespuesta = async ({content, comentarioId}) =>{
  const response = await Axios.post('/respuestaComentario', { content, comentarioId } )
  return response
}
const getRespuestaByIdComentario = async ({id}) => {
  //id de comentario a responder
  const response = await Axios.get(`/respuestaComentario/${id}`)
  return response
}
const borrarRespuesta = async ({id}) => {
  //id de respuesta a borrar
  const response = await Axios.delete(`/respuestaComentario/${id}`)
  return response
}
export { crearRespuesta , getRespuestaByIdComentario, borrarRespuesta}