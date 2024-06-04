import { Image } from '@nextui-org/react';

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
			className={` flex flex-col items-center pb-2 justify-center  ${
				activeItem === name ? 'border-b-4 border-orange-600 border-solid font-bold' : ''
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

export default MenuItem;
