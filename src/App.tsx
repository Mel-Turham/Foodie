import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import { Contact, ErrorPage, Home, Menu, PlatDetails } from './pages';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='menu' element={<Menu />} />
					<Route path='contact' element={<Contact />} />
					<Route path='plat/:id' element={<PlatDetails />} />
				</Route>
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Router>
	);
};
export default App;
