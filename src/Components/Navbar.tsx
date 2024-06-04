import { NavLink } from 'react-router-dom';

interface LinksProps {
	path: string;
	label: string;
}
const Navbar = () => {
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
		<header className='fixed top-0 left-0 z-20 flex items-center justify-between w-full px-5 py-5 bg-white shadow-md'>
			<h1 className='font-bold text-[2rem] '>Foodie</h1>
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
			<div>
				<i>icons goes there</i>
			</div>
		</header>
	);
};
export default Navbar;
