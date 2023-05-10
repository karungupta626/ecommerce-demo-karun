import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ITypes } from '@/types/UserDetails';
import { UserService } from '@/types/UserService';

export const fetchBestSellingProducts = createAsyncThunk(
  'bestSellingProducts/fetch',
  async (limit: number) => {
    const products = await UserService.getAllProducts(limit);
    const sortedProducts = products.sort((a, b) => b.sold - a.sold);
    const bestSellingProducts = sortedProducts.slice(4, 15);
    return bestSellingProducts;
  }
);

interface BestSellingProductsState {
  loading: boolean;
  error: string | null;
  products: ITypes[];
}

const initialState: BestSellingProductsState = {
  loading: false,
  error: null,
  products: [],
};

export const bestSellingProductsSlice = createSlice({
  name: 'bestSellingProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBestSellingProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBestSellingProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchBestSellingProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong.';
    });
  },
});

export default bestSellingProductsSlice.reducer;
