import { ITypes } from '@/types/UserDetails';
import { UserService } from '@/types/UserService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface CardState {
  products: ITypes[];
  status: 'idle' | 'succeeded' | 'loading' | 'failed';
  error: string | null;
}

const initialState: CardState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('card/fetchProducts', async () => {
  const products = await UserService.getAllProducts(100);
  return products;
});

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch products';
      })
  },
});

export default cardSlice.reducer;
