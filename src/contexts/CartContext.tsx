import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '@/types';
import toast from 'react-hot-toast';

// --- Tipos ---
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartContextActions {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartPayload: () => { cart_items: any[]; total: number };
}

const CartContext = createContext<(CartState & CartContextActions) | undefined>(undefined);

// --- Reducer ---
type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_STATE'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newItems: CartItem[];

  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.product.id);
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload.product, quantity: action.payload.quantity }];
      }
      break;

    case 'REMOVE_FROM_CART':
      newItems = state.items.filter(item => item.id !== action.payload.productId);
      break;

    case 'UPDATE_QUANTITY':
      newItems = state.items.map(item =>
        item.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
      ).filter(item => item.quantity > 0);
      break;

    case 'CLEAR_CART':
      newItems = [];
      break;

    case 'SET_STATE':
      newItems = action.payload;
      break;

    default:
      return state;
  }

  const newTotal = newItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  return { items: newItems, total: newTotal };
};

// --- Provider ---
const getInitialState = (): CartState => {
  try {
    const savedCart = localStorage.getItem('shopping_cart');
    if (savedCart) {
      const parsedItems: CartItem[] = JSON.parse(savedCart);
      const total = parsedItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
      return { items: parsedItems, total };
    }
  } catch (error) {
    console.error('Falha ao carregar o carrinho do localStorage', error);
  }
  return { items: [], total: 0 };
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  useEffect(() => {
    try {
      localStorage.setItem('shopping_cart', JSON.stringify(state.items));
    } catch (error) {
      console.error('Falha ao salvar o carrinho no localStorage', error);
    }
  }, [state.items]);

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    toast.success(`${product.title} adicionado!`);
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    } else {
      removeFromCart(productId);
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartPayload = () => {
    const payload = {
      cart_items: state.items.map(item => ({
        product_id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      total: state.total,
    };
    return payload;
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart, getCartPayload }}>
      {children}
    </CartContext.Provider>
  );
};

// --- Hook Customizado ---
export const useCart = (): CartState & CartContextActions => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
