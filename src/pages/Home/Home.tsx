import { Link } from 'react-router-dom';
import './Home.css';
import { Button } from '@nextui-org/react';
import Cart from '../../Components/Cart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardLists from '../../Components/CardLists';
import { useToggleContext } from '../../Context/contextToggle';
import useCartStore from '../../store/useCartStore';
import { useDisclosure } from '@nextui-org/react';
import ModalPaiement from '../../Components/ModalPaiement';

type PlatTypes = {
	name: string;
	price: number;
	id: number;
	description: string;
	category: string;
	image: string;
};

const Home = () => {
	const { toggle } = useToggleContext();
	const [plats, setPlats] = useState<PlatTypes[]>([]);
	const addToCart = useCartStore((state) => state.addToCart);
	const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure();

	useEffect(() => {
		const FetchPlats = async () => {
			const req = await axios.get(`http://localhost:8000/food_list`);
			const res = await req.data;
			setPlats(res);
		};

		FetchPlats();
	}, []);

	return (
		<>
			<ModalPaiement
				onClose={onClose}
				onOpenChange={onOpenChange}
				isOpen={isOpen}
			/>
			{toggle && <CardLists onOpen={onOpen} isOpen={isOpen} />}
			<main className='w-full pb-1 bg-gray-100 dark:bg-slate-800 dark:text-gray-200'>
				<section className='relative flex w-full bg-center bg-cover min-h-[80svh] lg:pb-20 max-sm:items-center sm:pb-0 lg:items-end text-white md:px-8 lg:px-10 hero max-sm:px-2.5 md:items-center'>
					<div className='z-10'>
						<h2 className='font-semibold text-gray-100 lg:text-7xl max-md:text-[2.2rem] text-balance max-md:text-nowrap max-sm:text-[1.9rem] md:text-6xl'>
							Commande ta <span className='text-orange-500'>nourriture</span>{' '}
							<br /> favorite ici!
						</h2>
						<p className='lg:w-[600px]  max-md:my-4 text-pretty md:my-6 md:text-[1.6rem] md:text-gray-200 lg:text-medium'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
							repellendus sequi optio praesentium voluptatem facilis deleniti
							laboriosam? Modi, veniam laudantium distinctio, esse aliquam quae
							possimus voluptas quam enim, minus neque.
						</p>
						<Link to='/menu'>
							<Button className='font-medium text-white bg-orange-600 md:w-[200px] lg:w-auto'>
								Voir les menus
							</Button>
						</Link>
					</div>
				</section>
				<section className='my-8 max-md:px-2 '>
					<h3 className='mb-4 text-3xl font-bold md:pl-7 lg:pl-8 max-md:w-auto lg:w-fit'>
						<span className='text-orange-600'>Meilleurs </span> repas pres de
						chez vous!!
					</h3>
					<div className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center lg:px-8 sm:px-5'>
						{plats.map((plat) => {
							return (
								<Cart
									key={plat.id}
									id={plat.id}
									name={plat.name}
									price={plat.price}
									description={plat.description}
									category={plat.category}
									image={plat.image}
									addToCart={addToCart}
								/>
							);
						})}
					</div>
				</section>
			</main>
		</>
	);
};
export default Home;
