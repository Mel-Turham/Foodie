import { createContext, useState, useContext } from 'react';

type ContextType = {
	toggle: boolean;
	setToggle: (value: boolean) => void;
};

const contextToggle = createContext<ContextType | undefined>(undefined);

type contextProviderType = {
	children: React.ReactNode;
};

export const ContextProvider = ({ children }: contextProviderType) => {
	const [toggle, setToggle] = useState<boolean>(false);

	return (
		<contextToggle.Provider value={{ toggle, setToggle }}>
			{children}
		</contextToggle.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToggleContext = (): ContextType => {
	const context = useContext(contextToggle);
	if (context === undefined) {
		throw new Error('useToggleContext must be used within a ContextProvider');
	}
	return context;
};
