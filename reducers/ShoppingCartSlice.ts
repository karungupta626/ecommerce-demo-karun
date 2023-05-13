import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { ITypes } from "@/types/UserDetails";
import axios from "axios";

export interface CartItem {
  id: string;
  product: ITypes;
  quantity: number; 
}

interface ShoppingCartState {
  items: CartItem[];
}

const initialState: ShoppingCartState = {
  items: [],
};

const ShoppingCartSlice = createSlice({
  name: "ShoppingCart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++; 
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
    },
    deleteCartItem(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
    },
    updateCartItemQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteCartItem,
  updateCartItemQuantity,
  setCartItems, 
} = ShoppingCartSlice.actions;

export default ShoppingCartSlice.reducer;

export const fetchCartItems = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get("https://645dfaea12e0a87ac0e467db.mockapi.io/cart");
    const cartItems: CartItem[] = response.data;
    dispatch(setCartItems(cartItems));
  } catch (error) {
    console.error(error);
  }
};

export const addCartItem = (cartItem: CartItem) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(
      "https://645dfaea12e0a87ac0e467db.mockapi.io/cart",
      cartItem
    );
    const addedCartItem: CartItem = response.data;
    dispatch(addToCart(addedCartItem));
  } catch (error) {
    console.error(error);
  }
};

export const removeCartItem = (cartItemId: string) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`https://645dfaea12e0a87ac0e467db.mockapi.io/cart/${cartItemId}`);
    dispatch(deleteCartItem(cartItemId));
  } catch (error) {
    console.error(error);
  }
};
