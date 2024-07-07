import { NextResponse } from 'next/server';
import Respuesta from '@/services/Respuesta'

// Handler para solicitudes POST

export async function POST(req) {
	try {
		const {content,comentarioId} = await req.json();
		const token = JSON.parse(req.cookies.get('auth').value);
		const respuesta = await Respuesta.create({
			email_usuario: token.email,
			content: content,
			comentarioId: comentarioId,
		})
    return  NextResponse.json({message: 'respuesta creado correctamente', data: respuesta,}, {status: 200})
	} catch (e) {
		console.error('SERVER ERROR CREANDO RESPUESTA', e)
		return NextResponse.json({ message: 'error creando respuesta'}, { status: 500 });
	}
}
