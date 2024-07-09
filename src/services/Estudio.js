import prisma from "@/libs/db"

// use `prisma` in your application to read and write data in your DB
export default {
  create: async ({titulo, descripcion, tags, enlace, userId}) => {
    console.log('n',tags)
    await prisma.Estudio.create({
      data:{
        titulo,
        descripcion,
        tags,
        enlace,
        userId
      }
    })
  },
  findAll: async ({tags}) => {
    try{
      //console.log('n',tags)
      return await prisma.Estudio.findMany({
        where: {
          tags: {
            hasSome: tags,
          }
        }
      })
    }
    catch(e){
      return null
    }
  },
  getLatestThree: async () => {
    try {
      return await prisma.Estudio.findMany({
        take: 3,
        orderBy: {
          createdAt: 'desc'
        },
        include:{
          usuario_creador:true
        }
      });
    } catch (e) {
      return null;
    }
  },
  findByPk: async (id) => await prisma.Estudio.findUnique({
    where: {
      id
    },
    include: {
      usuario_creador: true
    },
  })
  
}
