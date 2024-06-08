import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Card, CardBody, CardHeader } from '@nextui-org/react';

type Comment = {
	userId: number;
	userName: string;
	userAvatar: string;
	userEmail: string;
	comment: string;
};

type ProductCommentsProps = {
	productId: number;
};

const ProductComments = ({ productId }: ProductCommentsProps) => {
	const [comments, setComments] = useState<Comment[]>([]);
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/food_list/${productId}`,
				);
				setComments(response.data.comments);
			} catch (error) {
				console.error('Error fetching comments', error);
			}
		};

		fetchComments();
	}, [productId]);
	return (
		<div className='w-[60%]'>
			{comments.length === 0 ? (
				<h1 className='text-2xl font-semibold text-center'>Aucun commentaire sur ce produit!!</h1>
			) : (
				<>
					{comments.map((comment, index) => (
						<Card
							key={index}
							className='h-[120px] mb-4'
							shadow='sm'
							radius='none'
						>
							<CardHeader>
								<div className='flex gap-5'>
									<Avatar
										isBordered
										radius='full'
										size='md'
										color='danger'
										src={comment.userAvatar}
									/>
									<div className='flex flex-col items-start justify-center gap-1'>
										<h4 className='font-semibold leading-none text-small text-default-600'>
											{comment.userName}
										</h4>
										<h5 className='tracking-tight text-small text-default-400'>
											{comment.userEmail}
										</h5>
									</div>
								</div>
							</CardHeader>
							<CardBody className='px-3 pb-4 text-small'>
								<p className='text-[18px]'>{comment.comment}</p>
							</CardBody>
						</Card>
					))}
				</>
			)}
		</div>
	);
};
export default ProductComments;
