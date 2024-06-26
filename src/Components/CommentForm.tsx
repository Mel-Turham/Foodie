import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useUserStore from '../store/useUserStore';
import toast from 'react-hot-toast';
import { Button } from '@nextui-org/react';
import { IoMdSend } from 'react-icons/io';

const CommentSchema = z.object({
	comment: z.string().min(1, 'Comment is required'),
});

type CommentFormValues = z.infer<typeof CommentSchema>;

type CommentFormProps = {
	productId: number;
};

const CommentForm = ({ productId }: CommentFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CommentFormValues>({
		resolver: zodResolver(CommentSchema),
	});
	const user = useUserStore((state) => state.user);
	const onSubmit = async (data: CommentFormValues) => {
		if (!user) {
			toast.error('You must be logged in to comment');
			return;
		}

		const commentData = {
			userId: user.id,
			userName: user.name,
			userAvatar: user.avatar,
			userEmail: user.email,
			comment: data.comment,
		};

		try {
			const response = await axios.get(
				`http://localhost:8000/food_list/${productId}`,
			);
			const product = response.data;
			product.comments.push(commentData);

			await axios.put(`http://localhost:8000/food_list/${productId}`, product);

			toast.success('Comment added successfully');
			reset();
		} catch (error) {
			toast.error('Error adding comment');
		}
	};
	return (
		<form
			className='lg:w-[522px]  max-md:w-full md:w-full  max-md:px-1.5'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex flex-col justify-center gap-2'>
				<h3 className='text-2xl font-bold '>Add a comments🧑‍💻</h3>
				<textarea
					{...register('comment')}
					id='comment'
					name='comment'
					className='h-[119px] w-full resize-none px-4 py-2 border-1 border-solid border-slate-200 shadow-md rounded-sm dark:bg-slate-900 md:h-[150px] md:mb-5 lg:mb-2 ring-3 ring-gray-200 outline-none focus:ring-1 '
				></textarea>
				{errors?.comment?.message && (
					<span className='font-medium text-red-600'>
						{' '}
						{errors?.comment?.message}
					</span>
				)}
			</div>
			<Button
				type='submit'
				variant='solid'
				color='primary'
				radius='none'
				className='mt-2'
				endContent={<IoMdSend className='w-5 h-5 -rotate-45' />}
			>
				Add comments
			</Button>
		</form>
	);
};
export default CommentForm;
