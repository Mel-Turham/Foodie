import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdStar, IoMdStarHalf } from 'react-icons/io';
import { Button } from '@nextui-org/react';
import useCartStore from '../../store/useCartStore';
import CommentForm from '../../Components/CommentForm';
import ProductComments from '../../Components/ProductComments';
import * as z from 'zod';

const schemaFood = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	price: z.number(),
	category: z.string(),
	image: z.string(),
	quantity: z.number(),
});

type IFood = z.infer<typeof schemaFood>;

const PlatDetails = () => {
	const { id } = useParams<{ id: string }>();
	const addToCart = useCartStore((state) => state.addToCart);
	const [plat, setPlat] = useState<IFood>();
	useEffect(() => {
		const fecthPlat = async () => {
			const request = await axios.get<IFood>(
				`http://localhost:8000/food_list/${id}`,
			);
			const response = request.data;
			setPlat(response);
		};
		fecthPlat();
	}, [id]);

	return (
		<main className=' min-h-[100vh] bg-gray-100 lg:pt-10 max-md:pt-16  flex items-center justify-center  dark:bg-slate-800 dark:text-gray-100'>
			<section className='flex flex-col w-full md:mt-20 lg:mt-10'>
				<div className='flex justify-between w-full gap-1 my-4 max-md:mt-5 max-md:items-center md:items-start lg:px-20 max-md:px-2 md:px-7 md:gap-4 max-md:flex-wrap'>
					<figure className='lg:w-[522px] lg:h-[250px] h-auto overflow-hidden max-md:w-full'>
						<img
							src={plat?.image}
							alt={plat?.name}
							loading='lazy'
							className='object-cover w-full h-full'
						/>
					</figure>
					<div className='flex flex-col lg:gap-3 lg:ml-6 me-auto md:gap-4'>
						<h2 className='font-semibold lg:text-3xl md:text-2xl'>{plat?.name}</h2>
						<div className='flex items-center justify-between w-[25%] text-default-500 text-[16.5px]'>
							<div className='flex text-orange-600'>
								<IoMdStar className='w-6 h-6' />
								<IoMdStar className='w-6 h-6' />
								<IoMdStarHalf className='w-6 h-6' />
							</div>
							<span>(122)</span>
						</div>
						<p className='flex items-center gap-4 font-semibold uppercase lg:text-2xl'>
							<span className='line-through'>2000fcfa</span>
							<span>{plat?.price}fcfa</span>
						</p>
						<p className='sm:text-[13px] lg:text-[18px]  max-md:mb-2 lg:max-w-[300px]'>
							{plat?.description}
						</p>
						<Button
							color='primary'
							radius='none'
							className='w-fit'
							variant='solid'
							onClick={() => addToCart({ ...(plat as IFood) })}
						>
							Add to cart
						</Button>
					</div>
				</div>





				
				{/* comments section */}
				<div className='flex flex-wrap justify-between w-full my-4 max-md:mt-1 max-md:items-center md:px-6 lg:px-20'>
					<CommentForm productId={parseInt(id as string, 10)} />
					<ProductComments productId={parseInt(id as string, 10)} />
				</div>
			</section>
		</main>
	);
};
export default PlatDetails;
