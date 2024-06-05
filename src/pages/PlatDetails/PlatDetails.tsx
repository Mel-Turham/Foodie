import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdStar, IoMdStarHalf, IoMdSend } from 'react-icons/io';

import { Button } from '@nextui-org/react';

type CommentType = {
	username: string;
	commentUser: string;
};
type platTypes = {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	image: string;
	comments: CommentType[] | undefined;
};
const PlatDetails = () => {
	const { id } = useParams();

	const [plat, setPlat] = useState<platTypes | null>(null);
	// const numId = Number(id);
	useEffect(() => {
		const fecthPlat = async (): Promise<platTypes> => {
			const request = await axios.get(`http://localhost:8000/food_list/${id}`);
			const response = await request.data;
			setPlat(response);
			return response;
		};
		fecthPlat();
	}, [id]);

	const commentsList =
		plat &&
		plat?.comments &&
		plat?.comments.map((item) => {
			return (
				<div>
					<p>{item.username}</p>
					<p>{item.commentUser}</p>
				</div>
			);
		});
	return (
		<main className='bg-gray-100 min-h-[100vh] flex items-center justify-center'>
			<section className='flex flex-col justify-center h-screen mt-10'>
				<div className='flex items-start gap-3'>
					<figure className='w-[300px] h-[250px] overflow-hidden'>
						<img
							src={plat?.image}
							alt={plat?.name}
							loading='lazy'
							className='object-cover w-full h-full'
						/>
					</figure>
					<div className='flex flex-col gap-3'>
						<h2 className='text-3xl font-semibold'>{plat && plat.name}</h2>
						<div className='flex items-center justify-between w-[30%] text-default-500 text-[16.5px]'>
							<div className='flex text-orange-600'>
								<IoMdStar className='w-6 h-6' />
								<IoMdStar className='w-6 h-6' />
								<IoMdStarHalf className='w-6 h-6' />
							</div>
							<span>(122)</span>
						</div>
						<p className='flex items-center gap-4 text-2xl font-semibold uppercase'>
							<span className='line-through'>2000fcfa</span>
							<span>{plat && plat.price}fcfa</span>
						</p>
						<p className='text-[18px]'>{plat && plat.description}</p>
						<Button
							color='primary'
							radius='none'
							className='w-fit'
							variant='solid'
						>
							Add to cart
						</Button>
					</div>
				</div>
				<div className='flex gap-4 mt-6'>
					<form className='w-1/2'>
						<div className='flex flex-col gap-2 mb-5'>
							<h3 className='text-3xl font-semibold'>Add a comments🧑‍💻</h3>
							<textarea
								name='comments'
								id='comments'
								className='h-[90px] w-full resize-none px-4 py-2 border-1.5 border-solid border-slate-500 rounded-sm'
							></textarea>
						</div>
						<Button
							type='submit'
							variant='solid'
							color='primary'
							radius='none'
							endContent={<IoMdSend className='w-5 h-5' />}
						>
							Send a comment
						</Button>
					</form>
					<div className='w-1/2 '>
						{plat && plat.comments?.length === 0 ? (
							<p className='text-2xl'>Auccun commentaire sur cet article</p>
						) : (
							commentsList
						)}
					</div>
				</div>
			</section>
		</main>
	);
};
export default PlatDetails;
