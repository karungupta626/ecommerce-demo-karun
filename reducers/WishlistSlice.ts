import { AppDispatch, RootState } from "@/store";
import { WishlistService } from "@/types/WishlistService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWishlistItem {
  id: number;
  productId: number;
}

interface IWishlistState {
  items: IWishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: IWishlistState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlistStart(state) {
      state.loading = true;
      state.error = null;
    },
    addToWishlistSuccess(state, action: PayloadAction<IWishlistItem>) {
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
      state.items = state.items.filter((item) => item.id !== action.payload);
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
    getWishlistSuccess(state, action: PayloadAction<IWishlistItem[]>) {
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

export const addToWishlist =
  (productId: number) => async (dispatch: AppDispatch) => {
    dispatch(addToWishlistStart());
    try {
      const newItem: IWishlistItem = await WishlistService.addToWishlist(
        productId
      );
      dispatch(addToWishlistSuccess(newItem));
    } catch (error) {
      dispatch(addToWishlistFailure((error as Error).message));
    }
  };

export const removeFromWishlist =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(removeFromWishlistStart());
    try {
      await WishlistService.removeFromWishlist(id);
      dispatch(removeFromWishlistSuccess(id));
    } catch (error) {
      dispatch(removeFromWishlistFailure((error as Error).message));
    }
  };
export const fetchWishlist = () => async (dispatch: AppDispatch) => {
  dispatch(getWishlistStart());
  try {
    const wishlistItems = await WishlistService.getWishlist();
    dispatch(getWishlistSuccess(wishlistItems));
  } catch (error) {
    dispatch(getWishlistFailure((error as Error).message));
  }
};
export const selectWishlist = (state: RootState) => state.wishlist;
export const selectIsInWishlist = (productId: number) => (state: RootState) =>
  state.wishlist.items.some((item) => item.productId === productId);
export default wishlistSlice.reducer;
