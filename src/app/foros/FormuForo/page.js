'use client'
import { Button } from '@nextui-org/button';
import {useState} from "react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useMutation } from 'react-query'
import { crearTema} from '@/queries/foro'


export default function Page() {
	const [nombre, setNombre] = useState('')
	const [contenido, setContenido] = useState('')

	const foroMutation = useMutation(
	{
		mutationFn: (data) => crearTema(data),
		onSuccess: () => {
			console.log('se creó el tema')
		},
		onError: (error) => console.error('error api registro', error)
	}
	)
	const onSubmit = () =>{
		foroMutation.mutate({
			nombre, contenido
		})
	}
	return (
		<div class="flex w-full flex-col mx-0 overflow-y-scroll h-full">

			<div className="flex flex-row w-full ">
          		<div className='flex justify-start w-1/2 my-6 mx-6 px-2'>
            		<h1 className='font-semibold text-3xl'>NUEVO TEMA</h1>
          		</div>
          		
       	 	</div>
			<div className="flex flex-row w-full my-6 mx-5 px-2">
				<form class="w-full">
					<div className="flex flex-row w-full my-6 mx-5 px-2">
						<div className="bg-indigo-900 text-white flex flex-row justify-center items-center w-1/6">
							<p>Tema:</p>
						</div>
						<div className='flex flex-row w-full justify-start items-start '>
							<Input color="secondary" type='text' className='input' placeholder="Nombre del tema" value={nombre} onValueChange={setNombre}></Input>
						</div>
						<div className='flex flex-row w-1/12 justify-end items-end mr-4'>
						</div>
					</div>
					<div className="flex flex-row w-full my-6 mx-5 px-2">
						<div class="bg-indigo-900 text-white flex flex-row justify-center items-center w-1/6">
							<h1 >Descripcion: </h1>
						</div>
						<div className='flex flex-row w-full justify-start items-start '>
							<Textarea color="secondary" placeholder="Descripcion o pregunta del tema" value={contenido} onValueChange={setContenido}></Textarea>
						</div>
						<div className='flex flex-row w-1/12 justify-end items-end mr-4'>
						</div>
					</div>
					<div className="flex w-full justify-center items-center mr-7 ">
						<Button type="button" onClick={onSubmit} color="primary">Publicar</Button>
					</div>
				</form>
			</div>

		</div>
	)
}

