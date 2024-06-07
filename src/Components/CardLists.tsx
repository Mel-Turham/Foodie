import { Button, Image } from '@nextui-org/react';
import { IoCloseSharp } from 'react-icons/io5';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useToggleContext } from '../Context/contextToggle';
import useCartStore from '../store/useCartStore';
import { motion } from 'framer-motion';

const CardLists = () => {
	const { setToggle } = useToggleContext();
	const { cart, incrementQuantity, decrementQuantity, removeFromCart } =
		useCartStore();
	const total = useCartStore((state) => state.calculateTotal());

	const cartItem = cart.map((item) => {
		return (
			<div
				className='grid grid-cols-5 gap-2 pb-2 border-gray-500 solid border- border-b-1 place-content-center'
				key={item.id}
			>
				<Image width={55} radius='none' height={55} src={item.image} />
				<p className='flex items-center justify-center font-semibold text-center capitalize '>
					{item.name}
				</p>
				<p className='flex items-center justify-center font-semibold text-center text-medium'>
					{item.price}
				</p>
				<div className='flex items-center justify-between gap-1'>
					<Button
						isIconOnly
						radius='full'
						variant='bordered'
						color='primary'
						size='sm'
						onClick={() => decrementQuantity(item.id)}
					>
						<FaMinus className='h-2.5  w-2.5' />
					</Button>
					<span className='font-semibold text-[16px]'>{item.quantity}</span>
					<Button
						size='sm'
						isIconOnly
						radius='full'
						variant='bordered'
						color='primary'
						onClick={() => incrementQuantity(item.id)}
					>
						<FaPlus className='w-2.5 h-2.5' />
					</Button>
				</div>
				<div className='flex items-center justify-center'>
					<Button
						className=''
						variant='bordered'
						radius='full'
						isIconOnly
						color='danger'
						size='sm'
						onClick={() => removeFromCart(item.id)}
					>
						<IoCloseSharp />
					</Button>
				</div>
			</div>
		);
	});
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='fixed z-40 w-full h-screen bg-black/35 backdrop-blur-sm'
		>
			<motion.div
				initial={{ x: '-300%', opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: '-300%', opacity: 0 }}
				transition={{
					duration: 0.6,
					type: 'spring',
					ease: 'easeInOut',
				}}
				className='w-[35%] h-screen bg-white p-5 overflow-y-scroll'
			>
				<div className='flex items-start justify-between'>
					<h2 className='text-2xl font-semibold uppercase'>Foodie</h2>
					<Button
						isIconOnly
						radius='full'
						color='default'
						variant='solid'
						size='sm'
						onClick={() => setToggle(false)}
					>
						<IoCloseSharp className='w-6 h-6' />
					</Button>
				</div>

				{cart.length === 0 ? (
					<h1 className='mt-8 text-2xl font-semibold text-center'>
						Votre panier est vide
					</h1>
				) : (
					<>
						<div className='my-4'>
							<h3 className='mb-3 text-xl font-bold'>
								Total: <span className='uppercase'>{total} fcfa</span>
							</h3>
							<Button radius='none' size='md' variant='solid' color='primary'>
								Conectez vous!!
							</Button>
						</div>
						<div className='flex items-center justify-between py-2 font-semibold capitalize border-black border-solid border-b-1 '>
							<p>image</p>
							<p>Titre</p>
							<p>Prix(Fcfa)</p>
							<p>Qte</p>
							<p>Remove</p>
						</div>

						<div className='flex flex-col h-[550px] gap-4 mt-4'>{cartItem}</div>
					</>
				)}
			</motion.div>
		</motion.section>
	);
};
export default CardLists;
