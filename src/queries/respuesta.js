import Axios from "@/services/Axios"

const crearRespuesta = async ({content, comentarioId}) =>{
  const response = await Axios.post('/respuestaComentario', { content, comentarioId } )
  return response
}

const getRespuestaByIdComentario = async ({id}) => {
  const response = await Axios.get(`/respuestaComentario/${id}`)
  return response
}
export { crearRespuesta , getRespuestaByIdComentario}