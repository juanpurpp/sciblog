import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
  try {
    const id = params.id;
    const comentarios = await prisma.ComentarioEstudio.findMany({ where: { estudioId: parseInt(id) }, include: { usuario: true }});
    return NextResponse.json({message: 'Comentario de publicacion obtenidos correctamente', data:comentarios},{status: 200});
  } catch (e) {
    console.error('SERVER ERROR', e);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}

export async function POST(req, {params}) {
  try{
    const id = params.id;
    const token = JSON.parse(req.cookies.get('auth').value) 
    const { contenido } = await req.json();
    const comentario = await prisma.ComentarioEstudio.create({
      data: {
        Texto: contenido,
        estudioId: parseInt(id),
        usuarioId: token.usuario.id
      }
    });
    return NextResponse.json({ message: 'Comentario de publicacion creado correctamente', data:comentario},{status: 200});
  }
  catch(e){
    console.error('SERVER ERROR', e);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
export async function DELETE(req,{ params}){
  try {
    const id = params.id;
    const comentario = await prisma.ComentarioEstudio.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!comentario) {
      return NextResponse.json({ message: 'comentario not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'comentario deleted successfully' });
  } catch (e) {
    console.error('SERVER ERROR', e);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}