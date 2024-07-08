import { NextResponse } from 'next/server';
import ComentarioTema from '@/services/ComentarioTema'

// Handler para solicitudes POST

export async function POST(req) {
	try {
		const {texto,temaId} = await req.json();
		const token = JSON.parse(req.cookies.get('auth').value);
		const comentario = await ComentarioTema.create({
			email_usuario: token.email,
			Texto: texto,
      		Fecha: new Date(),
			temaId: temaId,
		})
    return  NextResponse.json({message: 'comentario creado correctamente', data: comentario,}, {status: 200})
	} catch (e) {
		console.error('SERVER ERROR CREANDO COMENTARIO', e)
		return NextResponse.json({ message: 'error creando comentario'}, { status: 500 });
	}
}
