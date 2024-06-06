import axios from 'axios';
import { useState, useEffect } from 'react';
import ComponentItem from './MenuItem';
import { Button } from '@nextui-org/react';
import Cart from '../../Components/Cart';
import useCartStore from '../../store/useCartStore';

type MenuListTypes = {
	menu_name: string;
	menu_image: string;
	id: string;
};

type FoodListType = {
	name: string;
	price: number;
	id: number;
	description: string;
	category: string;
	image: string;
};

const Menu = () => {
	const [menuList, setMenuList] = useState<MenuListTypes[]>([]);
	const [activeItem, setActiveItem] = useState<string | null>(null);
	const [foodList, setFoodList] = useState<FoodListType[]>([]);
	const addToCart = useCartStore((state) => state.addToCart);
  

  

	useEffect(() => {
		const FetchListMenu = async () => {
			const req = await axios.get('http://localhost:8000/menu_lists');
			const res = await req.data;
			setMenuList(res);
		};
		FetchListMenu();
	}, []);

	useEffect(() => {
		const fetchFood = async () => {
			const req = await axios.get('http://localhost:8000/food_list');
			const resp = await req.data;
			setFoodList(resp);
		};
		fetchFood();
	}, []);

	const handleActiveItem = (name: string) => {
		setActiveItem(name);
	};

	const filteredFoodList = activeItem
		? foodList.filter((food) => food.category === activeItem)
		: foodList;
	return (
		<main className='flex flex-col w-full gap-5 pb-5 bg-gray-100'>
			<section className='flex flex-col justify-end min-h-[70vh] px-24 py-5'>
				<div>
					<h1 className='text-4xl font-semibold'>Explore our menu</h1>
					<p className='w-[700px] mt-4 text-pretty'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
						esse, minus, necessitatibus ratione reprehenderit nisi minima ullam
						deleniti, facilis expedita tempore ea quo quos. Incidunt dolorem, ea
						quam in asperiores sed a sequi laborum nemo molestiae cumque nam
						beatae amet.
					</p>
				</div>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between py-5'>
						{menuList.map((itemList) => {
							const { id, menu_image, menu_name } = itemList;
							return (
								<ComponentItem
									setActiveItem={() => handleActiveItem(menu_name)}
									key={id}
									image={menu_image}
									name={menu_name}
									activeItem={activeItem}
								/>
							);
						})}
					</div>
				</div>
				<Button
					className='w-fit'
					color='primary'
					variant='shadow'
					size='sm'
					onClick={() => setActiveItem(null)}
				>
					All menu
				</Button>
			</section>
			<section className='px-8 mt-5'>
				<div className='grid gap-4 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4'>
					{filteredFoodList.map((plat) => {
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
	);
};

export default Menu;
