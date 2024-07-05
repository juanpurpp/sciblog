import prisma from "@/libs/db"

export default {
  create: async ({nombre, contenido, email_usuario}) => {
    return await prisma.$transaction( 
      async t=>{
        const usuario = await t.usuario.findUnique({
          where: {
            email: email_usuario
          },
        })
        return await t.Tema.create({
          data:{
            nombre,
            contenido,
            usuarioId: usuario.id
          }
        })
      }
    )
  },
  findAll: async () => {
    return await prisma.Tema.findMany({
      include:{
        usuario_tema: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  },
  delete: async ({idT}) => {
    console.log("aaaa", idT);
    return await prisma.Tema.delete({
      where: {
        id:idT,
      },
      
    });
  }
  
}