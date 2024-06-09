import {
	Button,
	Divider,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
} from '@nextui-org/react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useUserStore from '../store/useUserStore';
import useCartStore from '../store/useCartStore';
import { useToggleContext } from '../Context/contextToggle';
import toast from 'react-hot-toast';

type ModalPaiementProps = {
	onClose: () => void;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

const ModalPaiementSchema = z.object({
	name: z
		.string()
		.min(1, 'Ce champ est obligatoire')
		.max(20, 'Moin de 20 characters'),
	numero: z.string().min(1, 'Ce champ est obligatoire'),

	address: z
		.string()
		.min(1, 'Ce champ est obligatoire')
		.max(28, 'Max 28 caracters'),
});

type IModalPaiement = z.infer<typeof ModalPaiementSchema>;

const ModalPaiement = ({
	onClose,
	isOpen,
	onOpenChange,
}: ModalPaiementProps) => {
	const user = useUserStore((state) => state.user);
	const clearCart = useCartStore((state) => state.clearCart);
	const { setToggle } = useToggleContext();

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<IModalPaiement>({
		resolver: zodResolver(ModalPaiementSchema),
	});

	const onSubmit = (data: IModalPaiement) => {
		console.log(data);
		clearCart();
		onClose();
		reset();
		toast.success('Commande a ete envoyer avec success! ✨');
		setToggle(false);
	};
	return (
		<section className=''>
			<Modal
				onClose={onClose}
				isOpen={isOpen}
				size='lg'
				isDismissable={true}
				isKeyboardDismissDisabled={false}
				onOpenChange={onOpenChange}
				placement='center'
				radius='none'
			>
				<ModalContent>
					<ModalHeader className='flex items-center'>
						<h2 className='text-2xl font-semibold'>Informations personnel</h2>
					</ModalHeader>
					<Divider className='w-[90%] mx-auto mb-5' />
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<div>
								<Input
									defaultValue={user?.name}
									radius='none'
									type='text'
									placeholder='Your name...'
									{...register('name')}
									color='success'
									variant='bordered'
								/>
							</div>
							<span className='text-sm font-semibold text-red-600'>
								{errors && errors?.name?.message}
							</span>
							<div>
								<Input
									radius='none'
									type='text'
									placeholder='Votre numero...'
									{...register('numero')}
									autoFocus
									variant='bordered'
									color='success'
								/>
								<span className='text-sm font-semibold text-red-600'>
									{errors && errors?.numero?.message}
								</span>
							</div>
							<div>
								<Input
									radius='none'
									type='text'
									placeholder='Votre address...'
									{...register('address')}
									variant='bordered'
									color='success'
								/>
								<span className='text-sm font-semibold text-red-600'>
									{errors && errors?.address?.message}
								</span>
							</div>
							<Button
								type='submit'
								radius='none'
								className='font-semibold text-medium'
								color='success'
								size='md'
							>
								Payer
							</Button>
						</ModalBody>
					</form>
				</ModalContent>
			</Modal>
		</section>
	);
};

export default ModalPaiement;
