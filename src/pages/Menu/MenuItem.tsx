/* eslint-disable react-refresh/only-export-components */
import { Image } from '@nextui-org/react';
import { memo } from 'react';

type MenuItemProps = {
	name: string;
	image: string;
	activeItem: string | null;
	setActiveItem: (activeItem: string | null) => void;
};

const MenuItem = ({
	image,
	name,
	setActiveItem,
	activeItem,
}: MenuItemProps) => {
	return (
		<figure
			onClick={() => setActiveItem(name)}
			className={` flex flex-col items-center pb-2 justify-center cursor-pointer  ${
				activeItem === name
					? 'border-b-4 border-orange-600 border-solid font-bold'
					: ''
			}`}
		>
			<Image
				radius='full'
				width={90}
				height={90}
				src={image}
				loading='lazy'
				alt={name}
			/>
			<figcaption>{name}</figcaption>
		</figure>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(MenuItem);
