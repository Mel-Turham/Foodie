import { Link, NavLink } from 'react-router-dom';
import { FaBagShopping } from 'react-icons/fa6';
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react';
import { useToggleContext } from '../Context/contextToggle';
import useCartStore from '../store/useCartStore';
import useUserStore from '../store/useUserStore';
import toast from 'react-hot-toast';
interface LinksProps {
	path: string;
	label: string;
}

const Navbar = () => {
	const user = useUserStore((state) => state.user);
	const { setToggle } = useToggleContext();
	const cart = useCartStore((state) => state.cart);

	const logoutUser = useUserStore((state) => state.logoutUser);
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

				{user ? (
					<div>
						<Dropdown placement='bottom-end'>
							<DropdownTrigger>
								<Avatar
									isBordered
									as='button'
									className='transition-transform'
									color='secondary'
									name={user.name}
									size='sm'
									src={user.avatar}
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label='Profile Actions' variant='flat'>
								<DropdownItem key='profile' className='gap-2 h-14'>
									<p className='font-semibold'>{user.name}</p>
									<p className='font-semibold'>{user.email}</p>
								</DropdownItem>
								<DropdownItem key='logout' color='danger'>
									<Button
										variant='solid'
										color='danger'
										onClick={() => {
											logoutUser();
											toast.success(`Vous vous deconnectez avec success ${user.name}`)
										}}
										size='sm'
									>
										Log out
									</Button>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				) : (
					<Link to='/login'>
						<Button
							size='sm'
							variant='ghost'
							className='font-semibold'
							color='primary'
						>
							Login
						</Button>
					</Link>
				)}
			</div>
		</header>
	);
};
export default Navbar;
