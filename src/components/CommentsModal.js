import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, useDisclosure, ModalContent, Pagination, Input } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery } from 'react-query';
import Axios from '@/services/Axios';
import { useSession } from 'next-auth/react';
import { TrashIcon } from '@heroicons/react/24/solid';

export default function CommentsModal({ publicacion_id }) {
	const { isOpen, onOpenChange } = useDisclosure();
	const [comments, setComments] = useState([]); // Aquí almacenarás los comentarios
	const [currentPage, setCurrentPage] = useState(1);

	// Función para agregar un nuevo comentario (esto es solo un ejemplo)

	const [comentario, setComentario] = useState(''); // Inicializa el estado del comentario
	// Función para obtener los comentarios de la página actual
	const currentComments = comments.slice((currentPage - 1) * 10, currentPage * 10);
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
							<div key={comment.id} className='flex flex-row space-x-2 items-center justify-stretch'>
								<div  className="p-2 border-b rounded-md w-full">
									<h3 className="font-bold">{comment.usuario.nombre}</h3>
									<p className='text-sm'>{comment.Texto}</p>
								</div>
								{data?.usuario?.id === comment.usuario.id && (
									<TrashIcon className="h-6 w-5 text-red-500 cursor-pointer hover:text-red-600 hover:bg-red-200 rounded-md p-0.5 active:text-red-800" onClick={() => borrar.mutate({comentario_id: comment.id})}/>
								)}
							</div>
						))}
						<Pagination
							total={Math.ceil(comments.length / 10)}
							initialPage={1}
							onChange={(page) => setCurrentPage(page)}
						/>
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