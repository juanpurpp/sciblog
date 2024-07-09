import db from '@/libs/db';
import Foro from "@/services/Foro"
import { NextResponse } from "next/server" 

export async function GET(req){
  try{
    const url = new URL(req.url)
    const nombre = url.searchParams.get("nombre") //toma el nombre que se busca de la url
    const temas = await Foro.findByName({ nombre: nombre })
    const response = NextResponse.json({message: 'Foros encontrados correctamente', data: temas,}, {status: 200})
    return response
  }
  catch(e){
    console.error('SERVER ERROR', e)
    return NextResponse.json({message: 'Error en el servidor'}, {status:500})
  }
}