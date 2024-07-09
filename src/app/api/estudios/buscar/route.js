import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const url = new URL(req.url)

    const q = url.searchParams.get("q")
    const estudios = await prisma.estudio.findMany(
      {
        where:{
          OR:[
            {
              tags: {
                has: q
              },
            },
            {
              titulo: {
                contains: q,
                mode: 'insensitive'
              } 
            }
          ]
        },
        include:{
          usuario_creador:true
        }
      }
    );
    console.log('es',estudios)
    return NextResponse.json(estudios, {status:200});
  } catch (e) {
    console.error('SERVER ERROR', e);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
} 