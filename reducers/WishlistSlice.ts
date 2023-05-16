import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

import { ITypes } from "@/types/UserDetails";
import axios from "axios";

interface WishlistState {
  wishlist: WishlistItem[];
  loading: boolean;
  error: string | null;
}

 export interface WishlistItem {
  id: string;
  userId: string;
  name: string;
  image: string;
  price: number;
  product: ITypes;
}

const initialState: WishlistState = {
  wishlist: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
    wishlistLoading(state) {
      state.loading = true;
      state.error = null;
    },
    wishlistLoaded(state, action: PayloadAction<WishlistItem[]>) {
      state.wishlist = action.payload;
      state.loading = false;
    },
    wishlistError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  wishlistLoading,
  wishlistLoaded,
  wishlistError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const fetchWishlist = (): AppThunk => async (dispatch) => {
  dispatch(wishlistLoading());

  try {
    const response = await axios.get<WishlistItem[]>(
      "https://645dfaea12e0a87ac0e467db.mockapi.io/wishlist"
    );
    dispatch(wishlistLoaded(response.data));
  } catch (error) {
    dispatch(wishlistError((error as Error).message));
  }
};

export const addToWishlistAsync = (item: WishlistItem): AppThunk => async (
  dispatch
) => {
  try {
    const response = await axios.post<WishlistItem>(
      "https://645dfaea12e0a87ac0e467db.mockapi.io/wishlist",
      item
    );
    dispatch(addToWishlist(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromWishlistAsync = (
  itemId: string
): AppThunk => async (dispatch) => {
  try {
    await axios.delete(
      `https://645dfaea12e0a87ac0e467db.mockapi.io/wishlist/${itemId}`
    );
    dispatch(removeFromWishlist(itemId));
  } catch (error) {
    console.log(error);
  }
};
