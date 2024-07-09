import prisma from '@/libs/db';
import { NextResponse } from 'next/server';
import ComentarioTema from '@/services/ComentarioTema'

// Handler para solicitudes GET
export async function GET(req, {params}) {
  try {
    console.log("aaaaaaaeeeeee")
    const id = params.id;
    const comentario = await ComentarioTema.findByPk(parseInt(id));
    console.log(comentario);
    if (!comentario) {
      return NextResponse.json({ message: 'Comentarios not found' }, { status: 404 });
    }
    return NextResponse.json({message: 'Comentario de tema creado correctamente',data:comentario},{status: 200});
  } catch (e) {
    console.error('SERVER ERROR', e);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    // eliminar las respuestas asociadas al comentario
    await prisma.respuesta.deleteMany({
      where: {
        comentarioId: parseInt(id),
      },
    });
    // eliminar el comentario
    const comentario = await prisma.comentario.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!comentario) {
      return NextResponse.json({ message: 'Comentario not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Comentario deleted successfully' });
  } catch (e) {
    console.error('SERVER ERROR', e);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}