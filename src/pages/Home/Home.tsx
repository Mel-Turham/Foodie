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
			<main className='w-full pb-5 bg-gray-100'>
				<section className='relative flex w-full bg-center bg-cover min-h-[80vh] lg:pb-20 max-sm:items-center sm:pb-0 lg:items-end text-white md:px-8 lg:px-10 hero max-sm:px-2'>
					<div className='z-10'>
						<h2 className='font-semibold text-gray-100 lg:text-7xl max-md:text-[2rem]'>
							Commande ta nourriture <br /> favorite ici!
						</h2>
						<p className='lg:w-[600px] lg:my-6 max-md:my-2 text-pretty'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
							repellendus sequi optio praesentium voluptatem facilis deleniti
							laboriosam? Modi, veniam laudantium distinctio, esse aliquam quae
							possimus voluptas quam enim, minus neque.
						</p>
						<Link to='/menu'>
							<Button className='font-medium text-white bg-orange-600'>
								Voir les menus
							</Button>
						</Link>
					</div>
				</section>
				<section className='my-8 max-md:px-2'>
					<h3 className='pl-4 mb-4 text-3xl font-bold max-md:w-auto lg:w-fit'>
						<span className='text-orange-600'>Meilleurs </span> repas pres de
						chez vous!!
					</h3>
					<div className='flex flex-wrap items-center justify-center gap-2'>
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
