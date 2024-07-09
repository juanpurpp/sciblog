import { useState } from "react"

const RespuestaBox = ({idRespuesta, onRespuesta = ()=>{}}) => {
  const [respuesta, setRespuesta] = useState('')
  return (
    <div className='flex flex-row space-x-1 p-0.5'>
      <input className='w-full bg-slate-50 rounded-md text-xs' value={respuesta} onChange={e=>setRespuesta(e.target.value)}></input>
      <button className='rounded-md bg-indigo-600 text-xs px-1 py-0.5 text-slate-200' onClick={()=>onRespuesta(idRespuesta, respuesta)}>Responder</button>
    </div>
  )
}
export default RespuestaBox