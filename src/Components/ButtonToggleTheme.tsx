import { Button } from '@nextui-org/react';
import { useTheme } from '../Context/contextTheme';
import { BiMoon, BiSun } from 'react-icons/bi';

export default function ButtonToggleTheme({
	className,
}: {
	className?: string;
}) {
	const { theme, toggleTheme } = useTheme();
	return (
		<Button
			onPress={toggleTheme}
			size='sm'
			radius='full'
			isIconOnly
			color={theme === 'light' ? 'primary' : 'default'}
			className={className}
		>
			{theme === 'light' ? (
				<BiMoon className='text-xl transition-transform duration-300 ease-in-out scale-100 rotate-0 animate-pulse' />
			) : (
				<BiSun className='text-xl transition-transform duration-300 ease-in-out scale-100 rotate-0 animate-pulse' />
			)}
		</Button>
	);
}
