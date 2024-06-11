import {
	Link,
	NavLink,
	useNavigate,
	useLocation,
	useParams,
} from 'react-router-dom';
import { FaBagShopping } from 'react-icons/fa6';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	User,
} from '@nextui-org/react';
import { useToggleContext } from '../Context/contextToggle';
import useCartStore from '../store/useCartStore';
import useUserStore from '../store/useUserStore';
import toast from 'react-hot-toast';
import { LuLogOut } from 'react-icons/lu';
import { CgClose } from 'react-icons/cg';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useEffect, useState } from 'react';
interface LinksProps {
	path: string;
	label: string;
}

const Navbar = () => {
	const user = useUserStore((state) => state.user);
	const { setToggle } = useToggleContext();
	const cart = useCartStore((state) => state.cart);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { id } = useParams<{ id: string }>();

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

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<header className='fixed top-0 left-0 z-20 flex items-center justify-between w-full px-8 py-4 bg-white shadow-md dark:bg-gray-900 dark:text-white max-md:px-3.5'>
			<h1 className='font-bold text-[1.7rem] w-fit'>Foodie</h1>
			<nav className='lg:flex items-center justify-center gap-8 text-[16px] w-1/2 max-md:hidden'>
				{Links.map((link) => {
					return (
						<NavLink
							className={({ isActive }) =>
								isActive
									? ' border-b-3 border-solid border-orange-600 font-semibold text-black dark:text-white'
									: 'text-default-500 dark:text-white/50'
							}
							key={link.label}
							to={link.path}
						>
							{link.label}
						</NavLink>
					);
				})}
			</nav>

			{/* responsive */}
			<nav
				className={`fixed gap-6 px-4 pt-3 pb-8 flex flex-col top-0 right-0 z-20 w-full min-h-screen bg-white text-slate-700 max-sm:w-full max-md:w-[50%] max-md:flex lg:hidden dark:bg-slate-800 dark:text-gray-100 transition-all duration-300 ease-linear ${
					isOpen ? 'translate-x-0 ' : 'translate-x-[100%]'
				}`}
			>
				<div className='flex items-center justify-between'>
					<h2 className='text-2xl font-bold'>Foodie</h2>
					<Button
						isIconOnly={true}
						size='sm'
						radius='full'
						className='p-1'
						onClick={() => setIsOpen(false)}
					>
						<CgClose className='font-bold text-[29px] cursor-pointer text-slate-900' />
					</Button>
				</div>
				{Links.map((link) => {
					return (
						<NavLink
							key={link.label}
							to={link.path}
							className={({ isActive }) =>
								isActive
									? 'text-lg font-semibold hover:translate-x-2 transition-all duration-300 ease-in-out hover:border-b-2 border-solid border-orange-600 w-fit pb-1 border-b-2'
									: 'text-lg font-semibold hover:translate-x-2 transition-all duration-300 ease-in-out hover:border-b-2 border-solid border-orange-600 w-fit pb-1'
							}
						>
							{link.label}
						</NavLink>
					);
				})}

				{user ? (
					<div className='flex items-center mt-auto'>
						<Dropdown
							placement='bottom-start'
							size='sm'
							radius='none'
							shadow='sm'
							className='bg-[#f1f1f1] dark:bg-slate-900 focus:outline-none'
						>
							<DropdownTrigger>
								<User
									as='button'
									avatarProps={{
										isBordered: true,
										src: user.avatar,
										color: 'warning',
										size: 'sm',
									}}
									className='font-semibold transition-transform focus:outline-none'
									description={user.email}
									name={user.name}
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label='Profile Actions' variant='solid'>
								<DropdownItem textValue='logout' key='logout'>
									<Button
										className='w-full font-semibold uppercase shadow-sm'
										variant='solid'
										color='primary'
										radius='sm'
										endContent={<LuLogOut className='w-5 h-4' />}
										onClick={() => {
											logoutUser();
											toast.success(
												`Vous vous deconnectez avec success ${user.name}`,
											);
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
			</nav>
			<div className='flex items-center justify-center max-md:justify-between gap-5 max-md:max-w-[20%] max-md:gap-4'>
				<div
					className='relative flex items-center justify-center w-6 h-6 cursor-pointer'
					onClick={() => {
						setToggle(true);
						if (pathname === '/menu' || `/plat/${id}`) {
							navigate('/');
						}
					}}
				>
					<i className='grid w-full h-full place-content-center'>
						<FaBagShopping className='w-6 h-6' />
					</i>
					<span className='absolute flex items-center justify-center w-5 h-5 text-white bg-red-600 rounded-full -right-2 -top-2'>
						{cart.length}
					</span>
				</div>

				<Button
					isIconOnly={true}
					size='sm'
					radius='full'
					className='md:hidden'
					onClick={() => setIsOpen(true)}
				>
					<HiMenuAlt2 className='text-slate-900 text-[19px] font-bold cursor-pointer' />
				</Button>

				{user ? (
					<div className='flex items-center justify-center max-md:hidden'>
						<Dropdown
							placement='bottom-start'
							size='sm'
							radius='none'
							shadow='sm'
							className='bg-[#f1f1f1] dark:bg-slate-900 focus:outline-none'
						>
							<DropdownTrigger>
								<User
									as='button'
									avatarProps={{
										isBordered: true,
										src: user.avatar,
										color: 'warning',
										size: 'sm',
									}}
									className='font-semibold transition-transform focus:outline-none'
									description={user.email}
									name={user.name}
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label='Profile Actions' variant='solid'>
								<DropdownItem textValue='logout' key='logout'>
									<Button
										className='w-full font-semibold uppercase shadow-sm'
										variant='solid'
										color='primary'
										radius='sm'
										endContent={<LuLogOut className='w-5 h-4' />}
										onClick={() => {
											logoutUser();
											toast.success(
												`Vous vous deconnectez avec success ${user.name}`,
											);
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
