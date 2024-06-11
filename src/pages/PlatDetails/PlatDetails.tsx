import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdStar, IoMdStarHalf } from 'react-icons/io';
import { Button } from '@nextui-org/react';
import useCartStore from '../../store/useCartStore';
import CommentForm from '../../Components/CommentForm';
import ProductComments from '../../Components/ProductComments';

type PlatType = {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	image: string;
};
const PlatDetails = () => {
	const { id } = useParams<{ id: string }>();
	const addToCart = useCartStore((state) => state.addToCart);
	const [plat, setPlat] = useState<PlatType>();
	useEffect(() => {
		const fecthPlat = async () => {
			const request = await axios.get(`http://localhost:8000/food_list/${id}`);
			const response = await request.data;
			setPlat(response);
		};
		fecthPlat();
	}, [id]);

	return (
		<main className=' min-h-[100vh] bg-gray-100 pt-10  flex items-center justify-center  dark:bg-slate-800 dark:text-gray-100'>
			<section className='flex flex-col justify-center w-full mt-10'>
				<div className='flex justify-center gap-3'>
					<figure className='w-[520px] h-[250px] overflow-hidden'>
						<img
							src={plat?.image}
							alt={plat?.name}
							loading='lazy'
							className='object-cover w-full h-full'
						/>
					</figure>
					<div className='flex flex-col gap-3 ml-5'>
						<h2 className='text-3xl font-semibold'>{plat?.name}</h2>
						<div className='flex items-center justify-between w-[25%] text-default-500 text-[16.5px]'>
							<div className='flex text-orange-600'>
								<IoMdStar className='w-6 h-6' />
								<IoMdStar className='w-6 h-6' />
								<IoMdStarHalf className='w-6 h-6' />
							</div>
							<span>(122)</span>
						</div>
						<p className='flex items-center gap-4 text-2xl font-semibold uppercase'>
							<span className='line-through'>2000fcfa</span>
							<span>{plat?.price}fcfa</span>
						</p>
						<p className='text-[18px]'>{plat?.description}</p>
						<Button
							color='primary'
							radius='none'
							className='w-fit'
							variant='solid'
							onClick={() => addToCart(plat)}
						>
							Add to cart
						</Button>
					</div>
				</div>
				{/* comments section */}
				<div className='flex justify-between w-full px-20 my-4'>
					<CommentForm productId={parseInt(id, 10)} />
					<ProductComments productId={parseInt(id, 10)} />
				</div>
			</section>
		</main>
	);
};
export default PlatDetails;
