import prisma from "@/libs/db"

export default {
  create: async ({Texto, Fecha, temaId, email_usuario}) => {
    return await prisma.$transaction( 
      async t=>{
        const usuario = await t.usuario.findUnique({
          where: {
            email: email_usuario
          },
        })
        return await t.Comentario.create({
          data:{
            Texto,
            Fecha,
            tema: { connect: { id: temaId } },
            usuario: { connect: { id: usuario.id } }
          }
        })
      }
    )
  },
  findByPk: async (id) => await prisma.Comentario.findMany({
    where: {
      temaId: id,
    },
    include: {
      usuario: true
    },
  }),
}