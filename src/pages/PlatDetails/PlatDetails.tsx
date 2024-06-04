import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

type CommentType = {
	username: string;
	commentUser: string;
};
type platTypes = {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	comments: CommentType[] | undefined;
};
const PlatDetails = () => {
	const { id } = useParams();

	const [plat, setPlat] = useState<platTypes | null>(null);
	// const numId = Number(id);
	useEffect(() => {
		const fecthPlat = async (): Promise<platTypes> => {
			const request = await axios.get(`http://localhost:8000/food_list/${id}`);
			const response = await request.data;
			setPlat(response);
			console.log(response);
			return response;
		};
		fecthPlat();
	}, [id]);
	return <div>PlatDetails</div>;
};
export default PlatDetails;
