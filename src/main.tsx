import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import { ContextProvider } from './Context/contextToggle.tsx';
import { ThemeProvider } from './Context/contextTheme.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ContextProvider>
			<ThemeProvider>
				<NextUIProvider>
					<App />
					<Toaster position='top-center' reverseOrder={false} />
				</NextUIProvider>
			</ThemeProvider>
		</ContextProvider>
	</React.StrictMode>,
);
