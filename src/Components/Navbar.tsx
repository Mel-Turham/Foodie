import { NavLink } from 'react-router-dom';
import { FaBagShopping } from 'react-icons/fa6';
import { Button } from '@nextui-org/react';
import { useToggleContext } from '../Context/contextToggle';
import useCartStore from '../store/useCartStore';
interface LinksProps {
	path: string;
	label: string;
}

const Navbar = () => {
	const { setToggle } = useToggleContext();
	const cart = useCartStore((state) => state.cart);
	const Links: LinksProps[] = [
		{
			path: '/',
			label: 'Home',
		},

		{
			path: 'menu',
			label: 'Menu',
		},
		{
			path: 'contact',
			label: 'Contact',
		},
	];

	return (
		<header className='fixed top-0 left-0 z-20 flex items-center justify-between w-full px-8 py-4 bg-white shadow-md'>
			<h1 className='font-bold text-[1.7rem] '>Foodie</h1>
			<nav className='flex items-center justify-center gap-3 '>
				{Links.map((link) => {
					return (
						<NavLink
							className={({ isActive }) =>
								isActive
									? ' border-b-3 border-solid border-orange-600 font-semibold text-black'
									: 'text-default-500'
							}
							key={link.label}
							to={link.path}
						>
							{link.label}
						</NavLink>
					);
				})}
			</nav>
			<div className='flex items-center justify-center gap-3'>
				<div
					className='relative flex items-center justify-center w-6 h-6 cursor-pointer'
					onClick={() => setToggle(true)}
				>
					<i className='grid w-full h-full place-content-center'>
						<FaBagShopping className='w-6 h-6' />
					</i>
					<span className='absolute flex items-center justify-center w-5 h-5 text-white bg-red-600 rounded-full -right-2 -top-2'>
						{cart.length}
					</span>
				</div>
				<Button
					size='sm'
					variant='ghost'
					className='font-semibold'
					color='primary'
				>
					Login
				</Button>
			</div>
		</header>
	);
};
export default Navbar;
