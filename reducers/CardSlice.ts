import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  rating: number;
}

interface CardState {
  products: Product[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: CardState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('card/fetchProducts', async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data;
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
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch products';
      });
  },
});

export default cardSlice.reducer;
