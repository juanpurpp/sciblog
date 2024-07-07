import prisma from '@/libs/db';
import { NextResponse } from 'next/server';
import Respuesta from '@/services/Respuesta'

// Handler para solicitudes GET
export async function GET(req, {params}) {
  try {
    const id = params.id;
    const respuesta = await Respuesta.findByPk(parseInt(id));
    console.log(respuesta);
    if (!respuesta) {
      return NextResponse.json({ message: 'respuesta not found' }, { status: 404 });
    }
    return NextResponse.json({message: 'respuesta de tema creado correctamente',data:respuesta},{status: 200});
  } catch (e) {
    console.error('SERVER ERROR', e);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    const respuesta = await prisma.respuesta.delete({
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