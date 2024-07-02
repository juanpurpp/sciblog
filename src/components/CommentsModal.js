import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, useDisclosure, ModalContent, Pagination } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function CommentsModal() {
    const { isOpen, onOpenChange } = useDisclosure();
    const [comments, setComments] = useState([]); // Aquí almacenarás los comentarios
    const [currentPage, setCurrentPage] = useState(1);

    // Función para agregar un nuevo comentario (esto es solo un ejemplo)
    const addComment = (newComment) => {
        setComments([...comments, newComment]);
    };

    // Función para obtener los comentarios de la página actual
    const currentComments = comments.slice((currentPage - 1) * 10, currentPage * 10);

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
                        {currentComments.map((comment, index) => (
                            <div key={index} className="p-2 border-b">
                                {comment}
                            </div>
                        ))}
                        <Pagination
                            total={Math.ceil(comments.length / 10)}
                            initialPage={1}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button auto flat onPress={() => addComment('Nuevo Comentario')}>
                            Agregar Comentario
                            <PlusIcon className="h-5 w-5" />
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}