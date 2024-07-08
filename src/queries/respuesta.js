import Axios from "@/services/Axios"

const crearRespuesta = async ({content, comentarioId}) =>{
  const response = await Axios.post('/Respuesta', { content, comentarioId } )
  return response
}

const getRespuestaByIdComentario = async ({id}) => {
  const response = await Axios.get(`/Respuesta/${id}`)
  return response
}
export { crearRespuesta , getRespuestaByIdComentario}