import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ITypes } from '@/types/UserDetails';
import { UserService } from '@/types/UserService';

export const fetchFlashCardData = createAsyncThunk(
  'flashCardData/fetch',
  async (limit: number) => {
    const products = await UserService.getAllProducts(limit);
    const sortedProducts = products.sort((a, b) => b.discountPercentage - a.discountPercentage);
    const flashCardData = sortedProducts;
    return flashCardData;
  }
);

interface FlashCardState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    products: ITypes[];
  }
  
  const initialState: FlashCardState = {
    status: 'idle',
    error: null,
    products: [],
  };


  export const flashCardSlice = createSlice({
    name: 'flashCardData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchFlashCardData.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchFlashCardData.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;
        })
        .addCase(fetchFlashCardData.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Something went wrong.';
        });
    },
  });

export default flashCardSlice.reducer;
