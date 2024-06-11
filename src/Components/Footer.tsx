const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className='flex flex-wrap items-center justify-between px-5 py-5 font-light mtitems-center text-default-500 text-medium dark:bg-slate-900 dark:text-gray-100'>
			<p>&copy;{year} Company, Inc</p>
			<p>Made by Mel , With ❤️</p>
		</footer>
	);
};

export default Footer;
