import Usuario from "@/services/Usuario"
import { NextResponse } from "next/server"

export async function GET(req,  {params}){
  try{
    const token = JSON.parse(req.cookies.get('auth').value) 
    if(!token) return NextResponse.json({message: 'Necesita tener sesión iniciada'}, {status: 401,})
    
    let result
    if(parseFloat(params.id) ){
      result = await Usuario.getPerfilById(parseFloat(params.id))
    }
    else{
      result = await Usuario.getPerfilByEmail(token.email)
    }
    const response = NextResponse.json({message: 'Perfil de usuario obtenido correctamente', data: result,}, {status: 200})
    return response
  }
  catch(e){
    console.error('SERVER ERROR GET USUARIO', e)
    return NextResponse.json({message: 'Error en el servidor'}, {status:500})
  }
}