/*
  Warnings:

  - You are about to drop the column `estudioId` on the `Comentario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_estudioId_fkey";

-- AlterTable
ALTER TABLE "Comentario" DROP COLUMN "estudioId";

-- CreateTable
CREATE TABLE "ComentarioEstudio" (
    "id" SERIAL NOT NULL,
    "Texto" TEXT NOT NULL,
    "estudioId" INTEGER,
    "usuarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComentarioEstudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RespuestaEstudio" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "comentarioId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RespuestaEstudio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ComentarioEstudio" ADD CONSTRAINT "ComentarioEstudio_estudioId_fkey" FOREIGN KEY ("estudioId") REFERENCES "Estudio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioEstudio" ADD CONSTRAINT "ComentarioEstudio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespuestaEstudio" ADD CONSTRAINT "RespuestaEstudio_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "ComentarioEstudio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespuestaEstudio" ADD CONSTRAINT "RespuestaEstudio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
