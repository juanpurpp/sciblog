"use client";
import { useState } from 'react';
import Link from 'next/link'; // Importa Link de Next.js
import { Button } from '@nextui-org/react';
import { ArrowDownTrayIcon, ShareIcon, BookmarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from '@nextui-org/react';
import CommentsModal from '@/components/CommentsModal';

export default function Component() {
	const { isOpen: isModalOneOpen, onOpenChange: setModalOneOpen } = useDisclosure();
	const { isOpen: isModalTwoOpen, onOpenChange: setModalTwoOpen } = useDisclosure();
	const { isOpen: isModalThreeOpen, onOpenChange: setModalThreeOpen } = useDisclosure();

	const [copied, setCopied] = useState(false);
	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000); // El mensaje "Copiado" desaparecerá después de 2 segundos
		}, () => {
			console.error('No se pudo copiar el texto');
		});
	};
	return (
		<div className="bg-background dark:bg-gray-950 p-8 w-full">
			<div className="flex w-full">
				<div className="w-1/3">
					<div className="font-bold text-lg dark:text-white">José Luis S.</div>
					<div className="text-sm dark:text-gray-300">Doctor</div>
					<div className="text-sm dark:text-gray-300">Clínica Universitaria</div>
				</div>
				<div className="flex w-1/3 justify-center">
					<h2 className="mb-4 text-2xl font-bold dark:text-white">Nombre de la Publicación</h2>
				</div>
				<div className="w-1/3 flex justify-end items-start space-x-2">
					<Button
						className="rounded-md bg-[#3f3d56] text-white hover:bg-[#2f2c44] focus:outline-none focus:ring-2 focus:ring-[#3f3d56] focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
						onPress={() => setModalOneOpen(true)}
					>
						Descargar Dataset <ArrowDownTrayIcon className="h-5 w-5" />
					</Button>

					<Modal isOpen={isModalOneOpen} onOpenChange={setModalOneOpen}>
						<ModalContent className='bg-azul'>
							<ModalHeader>Descarga Realizada</ModalHeader>
						</ModalContent>
					</Modal>
					<CommentsModal />
				</div>
			</div>

			<div className="flex w-full justify-center h-2/4 mb-24">
				<img src="/pre2.png" className="rounded-md" style={{ width: '700px', height: '400px' }} />
			</div>
			<div className="flex w-full mb-4 space-x-4">
				<div className="flex-grow">
					<label htmlFor="description" className="text-md font-medium text-foreground dark:text-gray-300">Descripción</label>
				</div>

				<div className="flex space-x-2">
					<Button
						auto
						rounded
						className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white dark:bg-green-700 dark:hover:bg-green-800"
						onPress={() => setModalTwoOpen(true)}
					>
						Compartir Publicación
						<ShareIcon className="h-5 w-5 ml-2" />
					</Button>
					<Modal isOpen={isModalTwoOpen} onOpenChange={setModalTwoOpen}>
						<ModalContent>
							<ModalHeader className="flex flex-col bg-azul dark:text-white">Compartir Enlace</ModalHeader>
							<ModalBody className='bg-azul'>
								<label
									className="text-md text-gray-500  mb-4 cursor-pointer dark:text-gray-300"
									onClick={() => copyToClipboard('google.com')}
								>
									google.com
								</label>
								{copied && <div className="text-sm text-green-500 dark:text-green-400">Copiado</div>}
							</ModalBody>
						</ModalContent>
					</Modal>
					<Button
						auto
						rounded
						className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
						onPress={() => setModalThreeOpen(true)}
					>
						Guardar Publicación
						<BookmarkIcon className="h-5 w-5 ml-2" />
					</Button>
					<Modal isOpen={isModalThreeOpen} onOpenChange={setModalThreeOpen}>
						<ModalContent className='bg-azul'>
							<ModalHeader className="dark:text-white">Publicacion Guardada</ModalHeader>
						</ModalContent>
					</Modal>
				</div>
			</div>

			<div className="flex w-full mb-24">
				<label htmlFor="description" className="text-sm font-medium text-foreground dark:text-gray-300">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec
					egestas est. Maecenas turpis sem, fermentum ac rhoncus at, pretium ac est. Pellentesque
					habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin a nisl
					lobortis, tristique purus ut, aliquam leo. Sed vel mauris varius, mollis leo eu, venenatis dui.
					Nulla efficitur mi a maximus vulputate. Sed sem ante, sagittis vitae vestibulum sed, aliquam
					vitae lacus. Vestibulum ultrices pharetra massa quis ullamcorper. In semper vulputate orci id auctor.
					Nunc iaculis augue quis neque aliquet cursus. Vivamus fermentum aliquam massa at consequat.
				</label>
			</div>

		</div>
	);
}
