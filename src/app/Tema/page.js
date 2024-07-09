"use client"
import { Button } from '@nextui-org/button';
import PostTema from '@/components/tema/PostTema';
import Postcom from '@/components/tema/Postcom';
import Link from 'next/link';

export default function Page() {

	return (
		<div className='flex flex-col w-full'>
			<div className='flex flex-col justify-start items-center'>
				<PostTema className="w-full" />
				<div className="flex w-11/12 justify-start items-center mr-7 ">
				 <Link href="/Tema/comentario">
				 	<Button color="primary" className="text-2xl my-4">Comentar</Button>
				 </Link>
				</div>
			</div>
			<div className='w-full justify-start items-start flex flex-col px-1 space-y-0 '>
				<Postcom className="w-full" />
			</div>
		</div>
	)
}

