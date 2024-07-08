import prisma from "@/libs/db"

export default {
  create: async ({content, comentarioId, email_usuario}) => {
    return await prisma.$transaction( 
      async t=>{
        const usuario = await t.usuario.findUnique({
          where: {
            email: email_usuario
          },
        })
        return await t.Respuesta.create({
          data:{
            content,
            comentario: { connect: { id: comentarioId } },
            usuario: { connect: { id: usuario.id } }
          }
        })
      }
    )
  },
  findByPk: async (id) => {
   console.log("paso por aqui aaaaaaaaaaaaaaaaaaaaaaaa", id );
    
    await prisma.Respuesta.findMany({
    
    where: {
      comentarioId: id,
    },
    include: {
      usuario: true
    },
  });
  }
}