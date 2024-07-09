import prisma from "@/libs/db";
import { NextResponse } from "next/server";


export async function POST(req, {params}) {
  try{
    const id = params.id;
    const token = JSON.parse(req.cookies.get('auth').value) 
    const { respuesta } = await req.json();
    const respuestas = await prisma.RespuestaEstudio.create({
      data: {
        content: respuesta,
        comentarioId: parseInt(id),
        usuarioId: token.usuario.id
      }
    });
    return NextResponse.json({ message: 'respuesta de publicacion creado correctamente', data:respuestas},{status: 200});
  }
  catch(e){
    console.error('SERVER ERROR', e);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
export async function DELETE(req,{ params}){
  try {
    const id = params.id;
    const respuesta = await prisma.RespuestaEstudio.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!respuesta) {
      return NextResponse.json({ message: 'respuesta not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'respuesta deleted successfully' });
  } catch (e) {
    console.error('SERVER ERROR', e);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}