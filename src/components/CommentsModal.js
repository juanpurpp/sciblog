import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, useDisclosure, ModalContent, Pagination, Input } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery } from 'react-query';
import Axios from '@/services/Axios';
import { useSession } from 'next-auth/react';
import { MinusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import RespuestaBox from './RespuestaBox';

export default function CommentsModal({ publicacion_id }) {
	const { isOpen, onOpenChange } = useDisclosure();
	// Función para agregar un nuevo comentario (esto es solo un ejemplo)

	const [comentario, setComentario] = useState(''); // Inicializa el estado del comentario
	const comentarios = useQuery("comentarios-estudio", async () => await Axios.get('/comentarios-estudio/'+publicacion_id))
	const comentarMutation = useMutation(async (data) => await Axios.post('/comentarios-estudio/' + publicacion_id, data),
		{
			onSuccess: () => {
				comentarios.refetch()
			}
		})

	const addComment = () => {
		comentarMutation.mutate({contenido:comentario})
	};
	const borrar = useMutation(async ({comentario_id}) => await Axios.delete(`/comentarios-estudio/${comentario_id}`), {onSuccess: () => comentarios.refetch()})
	const {data, status} = useSession()
	const respuestaMutation = useMutation(async (data) => await Axios.post('/respuestas-comentario/'+data.comentario_id, data), {onSuccess: () => comentarios.refetch()})
	const eliminarRespuestaMutation = useMutation(async (data) => await Axios.delete('/respuestas-comentario/'+data.respuesta_id), {onSuccess: () => comentarios.refetch()})
	const handleRespuesta = (comentario_id, respuesta) =>{
		respuestaMutation.mutate({comentario_id,respuesta})
	} 
	const handleEliminarRespuesta = () => {
		eliminarRespuestaMutation.mutate({respuesta_id: 1})
	}
	return (
		<>
			<Button
				className="rounded-md text-white"
				color="success"
				onPress={() => onOpenChange(true)}
			>
				Ver Comentarios
			</Button>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent className='bg-azul'>
					<ModalHeader>Comentarios</ModalHeader>
					<ModalBody>
						{comentarios?.data?.data.data.map((comment, index) => (
							<div key={comment.id} className='flex flex-col'>
								<div className='w-full flex flex-row space-x-2 items-center justify-stretch'>
									<div  className="p-2 border-b rounded-md w-full">
										<h3 className="font-bold">{comment.usuario.nombre +' '+ comment.usuario.apellido}</h3>
										<p className='text-sm'>{comment.Texto}</p>
									</div>
									{data?.usuario?.id === comment.usuario.id && (
										<TrashIcon className="h-7 w-7 text-red-500 cursor-pointer hover:text-red-600 hover:bg-red-200 rounded-md p-0.5 active:text-red-800" onClick={() => borrar.mutate({comentario_id: comment.id})}/>
									)}
								</div>
								<RespuestaBox idRespuesta={comment.id} onRespuesta={handleRespuesta}/>
								<div className='px-2 py-1 flex flex-col'>
									{comment.respuestas.map((respuesta, index) => (
										<div key={index} className='flex flex-row space-x-2 items-center bg-slate-200 rounded-md group'>
											<h4 className='font-medium text-md'>{respuesta.usuario.nombre + ' ' +respuesta.usuario.apellido}:</h4>
											<p className='text-xs text-slate-700'>{respuesta.content}</p>
											<MinusCircleIcon onClick={handleEliminarRespuesta} className='cursor-pointer group-hover:block w-5 h-5 hidden text-red-900'></MinusCircleIcon>
										</div>
									))
									}
								</div>
							</div>
						))}


					</ModalBody>
					<ModalFooter>
						<Input size='sm' value={comentario} onValueChange={setComentario}/>
						<Button auto flat onPress={addComment} disabled={comentarMutation.isLoading} className='bg-indigo-700 text-slate-100 disabled:bg-gray-600'>
							Comentar
							<PlusIcon className="h-5 w-5" />
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}