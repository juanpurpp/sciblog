import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, useDisclosure, ModalContent, Pagination, Input } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery } from 'react-query';
import Axios from '@/services/Axios';

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
							<div key={comment.id} className="p-2 border-b rounded-md">
								<h3 className="font-bold">{comment.usuario.nombre}</h3>
								<p className='text-sm'>{comment.Texto}</p>
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