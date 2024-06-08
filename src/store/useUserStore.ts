import { create } from 'zustand';
import axios from 'axios';

type User = {
	id: number;
	name: string;
	email: string;
	password: string;
	avatar?: string;
};

type UserState = {
	user: User | null;
	createUser: (user: Omit<User, 'id'>) => Promise<void>;
	setUser: (user: User) => void;
	checkUserExists: (email: string) => Promise<boolean>;
	loginUser: (email: string, password: string) => Promise<void>;
	logoutUser: () => void;
	loadUser: () => void;
};

const useUserStore = create<UserState>((set) => ({
	user: null,
	createUser: async (newUser) => {
		const response = await axios.post('http://localhost:8000/users', newUser);
		const newUserData = response.data;
		set({ user: response.data });
		localStorage.setItem('user', JSON.stringify(newUserData));
	},

	setUser: (user) => set({ user }),

	checkUserExists: async (email: string) => {
		const response = await axios.get(
			`http://localhost:8000/users?email=${email}`,
		);
		return response.data.length > 0;
	},

	loginUser: async (email, password) => {
		const response = await axios.get(
			`http://localhost:8000/users?email=${email}`,
		);
		const user = response.data[0];
		if (user && user.password === password) {
			set({ user });
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			throw new Error('Email ou mot de passe incorrect');
		}
	},
	logoutUser: () => {
		set({ user: null });
		localStorage.removeItem('user');
	},

	loadUser: () => {
		const savedUser = localStorage.getItem('user');
		if (savedUser) {
			set({ user: JSON.parse(savedUser) });
		}
	},
}));

export default useUserStore;
