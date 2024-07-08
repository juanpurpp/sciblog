import { NextResponse } from 'next/server';
import Foro from '@/services/Foro'
export async function POST(req) {
	try {
		const {nombre, contenido} = await req.json();
		const token = JSON.parse(req.cookies.get('auth').value)
		const tema = await Foro.create({
			email_usuario: token.email,
			nombre: nombre,
			contenido: contenido
		})
    return  NextResponse.json({message: 'Tema creado correctamente', data: tema,}, {status: 200})
	} catch (e) {
		console.error('SERVER ERROR CREANDO FORO', e)
		return NextResponse.json({ message: 'error creando tema de foro'}, { status: 500 });
	}
}

export async function DELETE(req) {
	try {
	  const { idT } = await req.json();
	  const etema = await Foro.delete({ idT });
	  return NextResponse.json({message: 'Tema eliminado correctamente',data: etema,},{ status: 200 });
	} catch (e) {
	  console.error('SERVER ERROR BORRANDO FORO', e);
	  return NextResponse.json({ message: 'Error eliminando tema de foro' },{ status: 500 });
	}
}

export async function GET(req){
	try {
		const token = JSON.parse(req.cookies.get('auth').value)
		console.log(token)
		const temas = await Foro.findAll()
    return  NextResponse.json({message: 'Tema creado correctamente', data: temas,}, {status: 200})
	} catch (e) {
		console.error('SERVER ERROR OBTENIENDO FORO', e)
		return NextResponse.json({ message: 'error creando tema de foro'}, { status: 500 });
	}
}