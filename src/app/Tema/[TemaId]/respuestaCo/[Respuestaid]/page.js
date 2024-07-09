"use client"// Importaciones necesarias
import { useRouter } from 'next/navigation'; // Asegúrate de importar desde 'next/router'
import { Input, Textarea, Button } from '@nextui-org/react';
import {crearRespuesta} from '@/queries/respuesta';
import { useMutation } from 'react-query'
import {useState} from "react";

export default function Component({params: {Respuestaid,TemaId}}) {
  const router = useRouter(); // Inicializa useRouter
  const [content, setContent] = useState('') 
  console.log("sasasasa",Respuestaid)
  const respMutation = useMutation(
    {
      mutationFn: (data) => crearRespuesta(data),
      onSuccess: () => {
        console.log('se creó el comentario')
        window.location.href = `/Tema/${TemaId}`;
      },
      onError: (error) => console.error('error api', error)
    }
    )
    const onSubmit = async () => {
      if (content.trim() === '') {
        alert('Por favor escribe un comentario antes de enviar.');
        return;
      }
  
      await respMutation.mutate({
        content,
        comentarioId: parseInt(Respuestaid, 10),
      });
    };
  return (
    <div className="flex h-full w-full items-center justify-center bg-background  px-4">
      <div className="w-full max-w-xl rounded-lg bg-azul p-8 shadow-lg border border-gray-300 ">
        <h2 className="mb-4 text-2xl font-bold text-primary ">Agregar respuesta</h2>
        <form>
          <div className="mb-4"> {/* Agregado mb-4 para espacio debajo del Textarea */}
            <label className="mb-2 block text-sm font-medium text-secondary " htmlFor="comentarioForo">
              Añadir respuesta
            </label>
            <Textarea
              bordered
              fullWidth
              color="secondary"
              placeholder="Escribe una respuesta aquí"
              id="comentarioForo"
              value={content} onValueChange={setContent}
              className="dark:text-gray-300 dark:placeholder-gray-500"
            />
          </div>
            <Button className="w-full mb-2 mt-4 rounded-md bg-primary  px-4 py-2 text-on-primary  hover:bg-[#2f2c44]  focus:outline-none focus:ring-2 focus:ring-primary  focus:ring-offset-2" onClick={onSubmit}>
              Enviar respuesta
            </Button>
        </form>
      </div>
    </div>
  );
}
