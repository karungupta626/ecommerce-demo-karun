import { ITypes } from '@/types/UserDetails';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DetailPageState {
  product: ITypes | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DetailPageState = {
  product: null,
  status: 'idle',
  error: null,
};

export const detailPageSlice = createSlice({
  name: 'detailPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch products';
      })
  
  },
});
export const fetchProductById = createAsyncThunk('detailPage/fetchProductById', async(id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await response.json();
  return data;
});


export default detailPageSlice.reducer
