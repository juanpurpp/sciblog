"use client"
import { useState, useEffect } from 'react'
import { Input, Button, Spinner } from '@nextui-org/react';
import Link from 'next/link'; // Importa Link de Next.js
import { Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useMutation, useQuery } from 'react-query';
import { updatePerfil } from '@/queries/perfil'
import { getPerfilByEmail } from '@/queries/usuarios';
import { useSession } from 'next-auth/react';

export default function EditProfileComponent() {
	const { isOpen, onOpenChange } = useDisclosure();
	const session = useSession()
	console.log(session.data)
	const { data, isLoading } = useQuery('get-perfil', () => getPerfilByEmail({ email: session.data.user.email }))

	console.log('getted data', data)
	const [nombre, setNombre] = useState('')
	const [apellido, setApellido] = useState('')
	const [organizacion, setOrganizacion] = useState('')
	const [area_especializacion, setAreaEspecializacion] = useState('')
	const [msg, setMsg] = useState(<></>)

	useEffect(() => {
		if (data?.data?.data) {
			setNombre(data?.data?.data.nombre)
			setApellido(data?.data?.data.apellido)
			setOrganizacion(data?.data?.data.organizacion)
			setAreaEspecializacion(data?.data?.data.area_especializacion)
		}
	}, [data])

	useEffect(() => {
		if (nombre === '') setMsg(<p className="text-red-700"> Nombre no puede ser vacío </p>)
		if (apellido === '') setMsg(<p className="text-red-700"> Apellido no puede ser vacío </p>)
		if (organizacion === '') setMsg(<p className="text-red-700"> Organización no puede ser vacío </p>)
		if (area_especializacion === '') setMsg(<p className="text-red-700"> Área de especialización no puede ser vacío </p>)
		if (nombre && apellido && organizacion && area_especializacion) setMsg(<></>)
	}, [nombre, apellido, organizacion, area_especializacion])

	const perfilMutation = useMutation({
		mutationFn: (data) => updatePerfil(data),
		onSuccess: (msg) => {
			console.log('editado correctamente')
			setMsg(<p className="text-green-700"> Se editó correctamente el perfil </p>)
		},
		onError: (error) => {
			console.error('error api edicion perfil', error)
			setMsg(<p className="text-red-700"> Error de servidor </p>)
		}
	})

	const validarCampo = (campo, nombreCampo) => {
		const regex = /^[a-zA-ZÀ-Öà-ö\s]+$/;

		if (campo.length < 2) {
			alert('Los campos de palabras deben tener al menos 2 caracteres');
			return false;
		} else if (campo.length > 100) {
			alert('Los campos de palabras no deben tener más de 50 caracteres');
			return false;
		} else if (!regex.test(campo)) {
			alert('Los campos de palabras no pueden contener caracteres especiales y numeros como %&4');
			return false;
		}		
		return true;
	}

	const onSubmit = () => {
		const esNombreValido = validarCampo(nombre, 'Nombre');
		const esApellidoValido = validarCampo(apellido, 'Apellido');
		const esOrganizacionValida = validarCampo(organizacion, 'Organización');
		const esAreaEspecializacionValida = validarCampo(area_especializacion, 'Área de especialización');

		if (!esNombreValido || !esApellidoValido || !esOrganizacionValida || !esAreaEspecializacionValida) {
			return;
		}

		const capitalizedNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
		const capitalizedApellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
		const capitalizedOrganizacion = organizacion.charAt(0).toUpperCase() + organizacion.slice(1);
		const capitalizedAreaEspecializacion = area_especializacion.charAt(0).toUpperCase() + area_especializacion.slice(1);

		perfilMutation.mutate({
			nombre: capitalizedNombre,
			apellido: capitalizedApellido,
			organizacion: capitalizedOrganizacion,
			area_especializacion: capitalizedAreaEspecializacion
		})
	}

	if (isLoading) return <Spinner size="large" color="primary" className="flex justify-center items-center h-screen w-full" />

	return (
		<div className="flex h-full w-full items-center justify-center bg-background px-4">
			<div className="w-full max-w-lg rounded-lg p-8 shadow-lg border border-gray-300 bg-azul">
				<h2 className="mb-4 text-2xl text-foreground font-bold">Editar perfil</h2>
				{msg}
				<form onSubmit={(e) => e.preventDefault()}>
					<div>
						<label className="mb-2 block text-sm font-medium text-foreground" htmlFor="nombre">
							Nombre
						</label>
						<Input
							clearable
							bordered
							fullWidth
							color="primary"
							size="lg"
							placeholder="Espacio para ingresar tu nombre"
							id="nombre"
							type="text"
							value={nombre}
							onValueChange={setNombre}
						/>
					</div>
					<div>
						<label className="mb-2 block text-sm font-medium text-foreground" htmlFor="apellido">
							Apellido
						</label>
						<Input
							clearable
							bordered
							fullWidth
							color="primary"
							size="lg"
							placeholder="Espacio para ingresar tu apellido"
							id="apellido"
							type="text"
							value={apellido}
							onValueChange={setApellido}
						/>
					</div>
					<div>
						<label className="mb-2 block text-sm font-medium text-foreground" htmlFor="areaTrabajo">
							Área de especialización
						</label>
						<Input
							clearable
							bordered
							fullWidth
							color="primary"
							size="lg"
							placeholder="Espacio para describir tu área de especialización"
							id="area_especializacion"
							type="text"
							value={area_especializacion}
							onValueChange={setAreaEspecializacion}
						/>
					</div>
					<div className="mb-4">
						<label className="mb-2 block text-sm font-medium text-foreground" htmlFor="organizacion">
							Organización
						</label>
						<Input
							clearable
							bordered
							fullWidth
							color="primary"
							size="lg"
							placeholder="Espacio para indicar tu organización"
							id="organizacion"
							type="text"
							value={organizacion}
							onValueChange={setOrganizacion}
						/>
					</div>
					<Button
						auto
						rounded
						className="text-white w-full mb-2 mt-4 bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
						type="submit"
						onPress={() => onOpenChange(true)}
						isDisabled={!(nombre && apellido && organizacion && area_especializacion)}
					>
						Editar
					</Button>

					<Link href="/perfil">
						<Button
							auto
							rounded
							className="text-white w-full bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
							type="button"
						>
							Volver al Perfil
						</Button>
					</Link>
					<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">¿Seguro quieres editar el correo?</ModalHeader>
									<ModalBody>
										<p>
											Si confirmas, tu correo será editado.
										</p>
									</ModalBody>
									<ModalFooter>
										<Link href="/perfil">
											<Button color="danger" variant="light" onPress={onClose}>
												No
											</Button>
										</Link>
										<Button type="button" color="primary" onPress={() => {
											onSubmit()
											onClose()
										}}>
											Sí
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</form>
			</div>
		</div>
	);
}
