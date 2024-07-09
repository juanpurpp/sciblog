-- DropForeignKey
ALTER TABLE "Guardados" DROP CONSTRAINT "Guardados_estudioId_fkey";

-- AddForeignKey
ALTER TABLE "Guardados" ADD CONSTRAINT "Guardados_estudioId_fkey" FOREIGN KEY ("estudioId") REFERENCES "Estudio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
