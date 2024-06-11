import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { Spinner } from '@nextui-org/react';
import toast from 'react-hot-toast';
const contactSchema = z.object({
	name: z.string().min(3, 'Ce champ ne doit pas etre inferieur a 3 caracteres'),
	subject: z.string().min(8, 'Ce champ obligatoire!'),
	message: z.string().min(20, 'au moin 20 caracteres'),
});

type IcontactForm = z.infer<typeof contactSchema>;

const Contact = () => {
	const [isLoading, setIslaoding] = useState<boolean>(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<IcontactForm>({
		resolver: zodResolver(contactSchema),
	});

	const onSubmit = (data: IcontactForm) => {
		setIslaoding(true);

		const templateParams = {
			name: data.name,
			subject: data.subject,
			message: data.message,
		};

		emailjs
			.send(
				'service_fblsnzn',
				'template_inh9m0a',
				templateParams,
				'ozNhRLh8J0MqEe7n1',
			)
			.then(
				(response) => {
					console.log('SUCCESS!', response.status, response.text);
					setIslaoding(false);
					toast.success('Message has been send Successfully!');
					reset();
				},
				(error) => {
					console.log('FAILED...', error);
					toast.error('Message not send');
					setIslaoding(false);
					reset();
				},
			);
	};
	return (
		<section className='grid grid-cols-2 gap-5 p-20 text-gray-900 lg:min-h-screen dark:bg-slate-800 10 mt-14 max-lg:px-5 place-items-center max-sm:grid-cols-1 max-md:px-2'>
			<div className='object-cover w-full h-full max-md:hidden'>
				<iframe
					className='w-full h-full'
					src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=ndongbon%20douala+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
				></iframe>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full p-6 space-y-6 shadow rounde bg-indigo-50 dark:bg-slate-900 dark:text-gray-100'
			>
				<h2 className='w-full text-3xl font-bold leading-tight'>Contact us</h2>
				<div>
					<label htmlFor='name' className='block mb-3 ml-1'>
						Name
					</label>
					<input
						id='name'
						type='text'
						placeholder='Your name'
						{...register('name')}
						className='block w-full p-2 border-2 border-gray-800 border-solid rounded focus:outline-none focus:ring focus:ring-violet-400 dark:bg-slate-950'
					/>
					<span className='block text-red-600'>{errors?.name?.message}</span>
				</div>
				<div>
					<label htmlFor='subject' className='block mb-3 ml-1'>
						Subject
					</label>
					<input
						id='subject'
						type='text'
						placeholder='Your subject'
						{...register('subject')}
						className='block w-full p-2 border-2 border-gray-800 border-solid rounded focus:outline-none focus:ring focus:ring-violet-400 dark:bg-slate-950'
					/>
					<span className='block text-red-600'>{errors?.subject?.message}</span>
				</div>
				<div>
					<label htmlFor='message' className='block mb-3 ml-1'>
						Message
					</label>
					<textarea
						id='message'
						placeholder='Message...'
						{...register('message')}
						className='block w-full p-2 border-2 border-gray-800 border-solid rounded resize-none autoexpand focus:outline-none focus:ring focus:ring-violet-400 dark:bg-slate-950'
					></textarea>
					<span className='block text-red-600'>{errors?.message?.message}</span>
				</div>
				<div>
					<button
						type='submit'
						className='block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600 dark:text-gray-100'
					>
						{isLoading ? <Spinner color='default' /> : 'Send'}
					</button>
				</div>
			</form>
		</section>
	);
};
export default Contact;
