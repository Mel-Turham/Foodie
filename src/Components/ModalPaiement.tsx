import {
	Button,
	Divider,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Spinner,
} from '@nextui-org/react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useUserStore from '../store/useUserStore';
import useCartStore from '../store/useCartStore';
import { useToggleContext } from '../Context/contextToggle';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { useState } from 'react';

type ModalPaiementProps = {
	onClose: () => void;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

// service_fblsnzn
// template_c27q3l6
// template_c27q3l6

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
	const [isLoading, setIsloading] = useState(false);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<IModalPaiement>({
		resolver: zodResolver(ModalPaiementSchema),
	});

	const onSubmit = (data: IModalPaiement) => {
		setIsloading(true);
		const templateParams = {
			name: data.name,
			numero: data.numero,
			address: data.address,
		};

		emailjs
			.send(
				'service_fblsnzn',
				'template_dscmcsh',
				templateParams,
				'ozNhRLh8J0MqEe7n1',
			)
			.then(
				(response) => {
					console.log('SUCCESS', response.status, response.text);
					setIsloading(false);
					toast.success('Your commends has been send Successfully');
					reset();
					clearCart();
					setToggle(false);
					onClose();
				},
				(error) => {
					console.log('FAILED', error);
					setIsloading(false);
					toast.error('Error! Try again please or verifie you network!!');
				},
			);
	};
	return (
		<section className=''>
			<Modal
				onClose={onClose}
				isOpen={isOpen}
				size='md'
				isDismissable={true}
				isKeyboardDismissDisabled={false}
				onOpenChange={onOpenChange}
				placement='center'
				radius='none'
				className='dark:bg-slate-900 dark:text-gray-100'
			>
				<ModalContent>
					<ModalHeader className='flex items-center'>
						<h2 className='text-2xl font-semibold '>Informations personnel</h2>
					</ModalHeader>
					<Divider className='w-[90%] mx-auto mb-5' />
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<div>
								<Input
									defaultValue={user?.name}
									radius='sm'
									type='text'
									placeholder='Your name...'
									{...register('name')}
									color='primary'
									variant='bordered'
								/>
							</div>
							<span className='text-sm font-semibold text-red-600'>
								{errors && errors?.name?.message}
							</span>
							<div>
								<Input
									radius='sm'
									type='text'
									placeholder='Votre numero...'
									{...register('numero')}
									autoFocus
									variant='bordered'
									color='primary'
								/>
								<span className='text-sm font-semibold text-red-600'>
									{errors && errors?.numero?.message}
								</span>
							</div>
							<div>
								<Input
									radius='sm'
									type='text'
									placeholder='Votre address...'
									{...register('address')}
									variant='bordered'
									color='primary'
								/>
								<span className='text-sm font-semibold text-red-600'>
									{errors && errors?.address?.message}
								</span>
							</div>
							<Button
								type='submit'
								radius='sm'
								className='font-semibold text-medium'
								color='primary'
								size='md'
								
							>
								{isLoading ? <Spinner color='white' size='sm' /> : 'Payer'}
							</Button>
						</ModalBody>
					</form>
				</ModalContent>
			</Modal>
		</section>
	);
};

export default ModalPaiement;
