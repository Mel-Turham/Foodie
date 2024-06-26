import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import {
	Contact,
	ErrorPage,
	Home,
	Login,
	Menu,
	PlatDetails,
	Register,
} from './pages';
import { useEffect } from 'react';
import { useToggleContext } from './Context/contextToggle';
import useCartStore from './store/useCartStore';
import useUserStore from './store/useUserStore';
const App = () => {
	const loadCart = useCartStore((state) => state.loadCart);
	const loadUser = useUserStore((state) => state.loadUser);

	const { toggle } = useToggleContext();
	useEffect(() => {
		loadUser();
	}, [loadUser]);
	useEffect(() => {
		loadCart();
	}, [loadCart]);
	useEffect(() => {
		const body = document.querySelector<HTMLBodyElement>('body')!;
		if (toggle) {
			body.classList.add('overflow-hidden');
		} else {
			body.classList.remove('overflow-hidden');
		}
	}, [toggle]);

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='menu' element={<Menu />} />
					<Route path='plat/:id' element={<PlatDetails />} />
					<Route path='contact' element={<Contact />} />
				</Route>
				<Route path='*' element={<ErrorPage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</Router>
	);
};
export default App;
