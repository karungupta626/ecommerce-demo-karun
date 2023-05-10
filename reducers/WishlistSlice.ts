import { AppDispatch } from '@/store';
import { ITypes } from '@/types/UserDetails';
import { WishlistService } from '@/types/WishlistService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IWishlistState {
  items: ITypes[];
  loading: boolean;
  error: string | null;
}

const initialState: IWishlistState = {
  items: [],
  loading: false,
  error: null,
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlistStart(state) {
      state.loading = true;
      state.error = null;
    },
    addToWishlistSuccess(state, action: PayloadAction<ITypes>) {
      state.items.push(action.payload);
      state.loading = false;
    },
    addToWishlistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromWishlistStart(state) {
      state.loading = true;
      state.error = null;
    },
    removeFromWishlistSuccess(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.loading = false;
    },
    removeFromWishlistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getWishlistStart(state) {
      state.loading = true;
      state.error = null;
    },
    getWishlistSuccess(state, action: PayloadAction<ITypes[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    getWishlistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      
    },
  },
});

export const {
  addToWishlistStart,
  addToWishlistSuccess,
  addToWishlistFailure,
  removeFromWishlistStart,
  removeFromWishlistSuccess,
  removeFromWishlistFailure,
  getWishlistStart,
  getWishlistSuccess,
  getWishlistFailure,
} = wishlistSlice.actions;

export const fetchWishlist = () => async (dispatch: AppDispatch) => {
  dispatch(getWishlistStart());
  try {
    const wishlistItems = await WishlistService.getWishlist();
    dispatch(getWishlistSuccess(wishlistItems));
  } catch (error) {
    dispatch(getWishlistFailure((error as Error).message));
  }
};

export const addToWishlist = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(addToWishlistStart());
  try {
    const product = await WishlistService.getProductById(id);
    dispatch(addToWishlistSuccess(product));
    await WishlistService.addToWishlist(id);
  } catch (error) {
    dispatch(addToWishlistFailure((error as Error).message));
  }
};

export const removeFromWishlist = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(removeFromWishlistStart());
  try {
    dispatch(removeFromWishlistSuccess(id));
    await WishlistService.removeFromWishlist(id);
  } catch (error) {
    dispatch(removeFromWishlistFailure((error as Error).message));
  }
};

export default wishlistSlice.reducer;
