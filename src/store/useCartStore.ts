import {create} from 'zustand';
import toast from 'react-hot-toast';

type CartItem = {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
	description?: string;
	category?: string;
};

type CartState = {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number) => void;
	incrementQuantity: (id: number) => void;
	decrementQuantity: (id: number) => void;
	clearCart: () => void;
	calculateTotal: () => number;
	loadCart: () => void;
};

const useCartStore = create<CartState>((set, get) => ({
	cart: [],
	addToCart: (item: CartItem) => {
		const cart = get().cart;
		const existingItem = cart.find((cartItem) => cartItem.id === item.id);
		if (existingItem) {
			toast.error('Produit déjà dans le panier');
			return;
		}
		const newCart = [...cart, { ...item, quantity: 1 }];
		set({ cart: newCart });
		localStorage.setItem('cart', JSON.stringify(newCart));
	},
	removeFromCart: (id: number) => {
		const newCart = get().cart.filter((item) => item.id !== id);
		set({ cart: newCart });
		localStorage.setItem('cart', JSON.stringify(newCart));
	},
	incrementQuantity: (id: number) => {
		const newCart = get().cart.map((item) =>
			item.id === id && item.quantity < 5
				? { ...item, quantity: item.quantity + 1 }
				: item,
		);
		set({ cart: newCart });
		localStorage.setItem('cart', JSON.stringify(newCart));
	},
	decrementQuantity: (id: number) => {
		const newCart = get().cart.map((item) =>
			item.id === id && item.quantity > 1
				? { ...item, quantity: item.quantity - 1 }
				: item,
		);
		set({ cart: newCart });
		localStorage.setItem('cart', JSON.stringify(newCart));
	},
	clearCart: () => {
		set({ cart: [] });
		localStorage.removeItem('cart');
	},
	calculateTotal: () => {
		return get().cart.reduce(
			(total, item) => total + item.price * item.quantity,
			0,
		);
	},
	loadCart: () => {
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			set({ cart: JSON.parse(savedCart) });
		}
	},
}));

export default useCartStore;
