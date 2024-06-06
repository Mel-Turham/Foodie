import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
type CartItem = {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
	description?: string;
	category?: string;
};

type CardProps = {
	image: string;
	price: number;
	name: string;
	description?: string;
	category?: string;
	id: number;
	addToCart: (item: CartItem) => void;
};

const Cart = ({
	image,
	price,
	name,
	description,
	category,
	id,
	addToCart,
}: CardProps) => {
	return (
		<Card className='p-2 pb-4' radius='none' shadow='none'>
			<figure className='w-full overflow-hidden h-[200px] '>
				<Image
					isZoomed
					loading='lazy'
					src={image}
					width={300}
					height={200}
					radius='none'
					alt={name}
				/>
			</figure>
			<CardBody className='pb-0'>
				<div className='flex items-center justify-between'>
					<h4 className='text-[14px] font-semibold'>{name}</h4>
					<div className='flex items-center text-orange-600'>
						<IoMdStar className='w-6 h-6' />
						<IoMdStar className='w-6 h-6' />
						<IoMdStarOutline className='w-6 h-6' />
					</div>
				</div>
				<p className='mt-2 text-sm text-pretty'>{description}</p>
			</CardBody>
			<CardFooter className='flex justify-between'>
				<span className='text-orange-600'>{price} FCFA</span>
				<span className='font-bold text-default-500'>{category}</span>
			</CardFooter>
			<div className='flex items-center justify-between '>
				<Button
					onClick={() => addToCart({ image, name, price, quantity: 1, id })}
					color='warning'
					size='sm'
				>
					Add
				</Button>
				<Link to={`/plat/${id}`}>
					<Button color='primary' size='sm'>
						See detail
					</Button>
				</Link>
			</div>
		</Card>
	);
};
export default Cart;
