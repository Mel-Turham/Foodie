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
				},
			);
	};
	return (
		<>
			<section className='grid grid-cols-2 gap-5 p-10 text-gray-100 mt-14 place-content-center '>
				<div className='object-cover w-full h-full'>
					<iframe
						className='w-full h-full'
						src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=ndongbon%20douala+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
					></iframe>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='p-6 space-y-6 bg-gray-900 shadow rounde d-md '
				>
					<h2 className='w-full text-3xl font-bold leading-tight'>
						Contact us
					</h2>
					<div>
						<label htmlFor='name' className='block mb-1 ml-1'>
							Name
						</label>
						<input
							id='name'
							type='text'
							placeholder='Your name'
							{...register('name')}
							className='block w-full p-2 bg-gray-800 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400'
						/>
						<span className='block text-red-600'>{errors?.name?.message}</span>
					</div>
					<div>
						<label htmlFor='subject' className='block mb-1 ml-1'>
							Subject
						</label>
						<input
							id='subject'
							type='text'
							placeholder='Your subject'
							{...register('subject')}
							className='block w-full p-2 bg-gray-800 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400'
						/>
						<span className='block text-red-600'>
							{errors?.subject?.message}
						</span>
					</div>
					<div>
						<label htmlFor='message' className='block mb-1 ml-1'>
							Message
						</label>
						<textarea
							id='message'
							placeholder='Message...'
							{...register('message')}
							className='block w-full p-2 bg-gray-800 rounded resize-none autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400'
						></textarea>
						<span className='block text-red-600'>
							{errors?.message?.message}
						</span>
					</div>
					<div>
						<button
							type='submit'
							className='w-full px-4 py-2 font-bold text-gray-900 rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-violet-400 focus:ring-violet-400 hover:ring-violet-400'
						>
							{isLoading ? <Spinner color='default' /> : 'Send'}
						</button>
					</div>
				</form>
			</section>
		</>
	);
};
export default Contact;
