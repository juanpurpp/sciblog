import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export const POST = async (req) =>{
  try{
    const {estudio_id} = await req.json();
    const token = JSON.parse(req.cookies.get('auth').value) 

    if(!token) return NextResponse.json({message: 'Necesita tener sesión iniciada'}, {status: 401,})

    await prisma.guardados.create(
      {data:
      {
        userId: token.usuario.id,
        estudioId: parseInt(estudio_id)
      }
    })
    return NextResponse.json({message: 'Estudio guardado correctamente'}, {status: 200})
  }
  catch(e){
    console.error('SERVER ERROR', e)
    return NextResponse.json({message: 'Error en el servidor'}, {status:500})
  }
}

export const GET = async (req) =>{
  try{
    const token = JSON.parse(req.cookies.get('auth').value) 

    if(!token) return NextResponse.json({message: 'Necesita tener sesión iniciada'}, {status: 401,})

    const estudios = await prisma.guardados.findMany({
      include:{
        estudio:true
      },
      where:{
        userId: token.usuario.id
      }
    })

    return NextResponse.json(estudios)
  }
  catch(e){
    console.error('SERVER ERROR', e)
    return NextResponse.json({message: 'Error en el servidor'}, {status:500})
  }
}