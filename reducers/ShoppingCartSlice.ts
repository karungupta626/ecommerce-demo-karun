import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/store';
import axios from 'axios';
import { ITypes } from '@/types/UserDetails';

export interface ICartItem {
  product: ITypes;
  quantity: number;
}

export interface ICartState {
  cartItems: ICartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ICartState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ITypes>) => {
      const existingCartItem = state.cartItems.find(
        (item) => item.product.id === action.payload.id,
      );
      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        state.cartItems.push({ product: action.payload, quantity: 1 });
      }
    },
    // removeFromCart: (state, action: PayloadAction<string>) => {
    //   state.cartItems = state.cartItems.filter(
    //     (item) => item.product.id !== action.payload,
    //   );
    // },
    // updateCartItemQuantity: (
    //   state,
    //   action: PayloadAction<{ productId: string; quantity: number }>,
    // ) => {
    //   const existingCartItem = state.cartItems.find(
    //     (item) => item.product.id === action.payload.productId,
    //   );
    //   if (existingCartItem) {
    //     existingCartItem.quantity = action.payload.quantity;
    //   }
    // },
    clearCart: (state) => {
      state.cartItems = [];
    },
    fetchCartItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCartItemsSuccess: (state, action: PayloadAction<ICartItem[]>) => {
      state.cartItems = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCartItemsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addToCart,
//   removeFromCart,
//   updateCartItemQuantity,
  clearCart,
  fetchCartItemsStart,
  fetchCartItemsSuccess,
  fetchCartItemsFailure,
} = cartSlice.actions;

export const fetchCartItemsAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchCartItemsStart());
    const response = await axios.get<ICartItem[]>(
      'https://645dfaea12e0a87ac0e467db.mockapi.io/cart',
    );
    dispatch(fetchCartItemsSuccess(response.data));
  } catch (error) {
    dispatch(fetchCartItemsFailure((error as Error).message));
  }
};

export const saveCartItemsAsync = (cartItems: ICartItem[]): AppThunk => async () => {
  try {
    await axios.put('https://645dfaea12e0a87ac0e467db.mockapi.io/cart', cartItems);
  } catch (error) {
    console.error(error);
  }
};

export default cartSlice.reducer;
