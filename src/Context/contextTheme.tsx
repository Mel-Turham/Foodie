// src/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextProps {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextProps => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

export const ThemeProvider= ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			return storedTheme as 'light' | 'dark';
		}
		const userPrefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
		return userPrefersDark ? 'dark' : 'light';
	});

	useEffect(() => {
		localStorage.setItem('theme', theme);
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
