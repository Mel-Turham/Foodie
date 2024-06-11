import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import ComponentItem from './MenuItem';
import { Button, Input } from '@nextui-org/react';
import Cart from '../../Components/Cart';
import useCartStore from '../../store/useCartStore';
import { BiSearch } from 'react-icons/bi';

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
	const [searhItem, setSearchItem] = useState<string | undefined>('');
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

	// const handleActiveItem = (name: string) => {
	// 	setActiveItem(name);
	// };

	const handleActiveItem = useCallback((name: string) => {
		setActiveItem(name);
	}, []);

	const filteredFoodList =
		activeItem && foodList.filter((food) => food.category === activeItem);
	const filteredFoodListSearch =
		searhItem &&
		foodList.filter((food) =>
			food.name?.toLowerCase().includes(searhItem.toLowerCase()),
		);

	const filtered = filteredFoodListSearch || filteredFoodList || foodList;

	return (
		<main className='flex flex-col w-full gap-5 pb-5 bg-gray-100 dark:bg-slate-800 dark:text-gray-100'>
			<section className='flex flex-col lg:justify-end lg:min-h-[70vh] lg:px-10 py-5 max-md:px-5'>
				<div className='max:md-px-5'>
					<h1 className='text-4xl font-semibold'>Explore our menu</h1>
					<p className='lg:w-[700px] mt-4 text-pretty'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
						esse, minus, necessitatibus ratione reprehenderit nisi minima ullam
						deleniti, facilis expedita tempore ea quo quos. Incidunt dolorem, ea
						quam in asperiores sed a sequi laborum nemo molestiae cumque nam
						beatae amet.
					</p>
				</div>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between py-5 max-md:hidden'>
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
				<div className='flex items-center justify-between max-md:mt-5 max-sm:gap-2 focus:outline-none'>
					{activeItem && (
						<Button
							className='w-fit'
							color='primary'
							variant='shadow'
							size='sm'
							onClick={() => setActiveItem(null)}
						>
							All menu
						</Button>
					)}

					<Input
						startContent={
							<BiSearch className='w-5 h-5 text-slate-500 dark:text-gray-100' />
						}
						autoFocus
						variant='bordered'
						color='primary'
						placeholder='search by name...'
						size='md'
						className='w-[300px] dark:text-gray-100 dark:placeholder:text-gray-100  ml-auto'
						value={searhItem}
						onChange={(e) => setSearchItem(e.target.value)}
					/>
				</div>
			</section>
			<section className=' max-md:px-2'>
				<div className='flex flex-wrap items-center justify-center gap-2'>
					{filtered.length > 0 ? (
						filtered.map((plat) => (
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
						))
					) : (
						<h3 className='text-3xl font-semibold text-center uppercase'>
							Item not found
						</h3>
					)}
				</div>
			</section>
		</main>
	);
};

export default Menu;
