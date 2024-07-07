import Axios from "@/services/Axios"

const crearRespuesta = async ({content, comentarioId}) =>{
  const response = await Axios.post('/respuesta', { content, comentarioId } )
  return response
}

const getRespuestaByIdComentario = async ({id}) => {
  const response = await Axios.get(`/respuesta/${id}`)
  return response
}
export { crearRespuesta , getRespuestaByIdComentario}