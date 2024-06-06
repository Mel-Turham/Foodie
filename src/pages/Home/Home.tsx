import { Link } from 'react-router-dom';
import './Home.css';
import { Button } from '@nextui-org/react';
import Cart from '../../Components/Cart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardLists from '../../Components/CardLists';
import { useToggleContext } from '../../Context/contextToggle';
import useCartStore from '../../store/useCartStore';

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
			{toggle && <CardLists />}
			<main className='w-full pb-5 bg-gray-100'>
				<section className='relative flex w-full text-white bg-center bg-cover min-h-[80vh] lg:pb-20 sm:items-center sm:pb-0 lg:items-end texpxt-white md:px-8 lg:px-10 hero sm:px-2'>
					<div className='container z-10 '>
						<h2 className='font-semibold text-gray-100 text-7xl'>
							Commande ta nourriture <br /> favorite ici!
						</h2>
						<p className='w-[600px] my-6 text-pretty'>
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
				<section className='my-8 sm:px-5 lg:px-10'>
					<h3 className='text-3xl font-bold'>
						<span className='text-orange-600'>Meilleur </span> repas pres de
						chez vous!!
					</h3>

					<div className='grid gap-4 mt-6 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4'>
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
