import { ITypes } from '@/types/UserDetails';
import { UserService } from '@/types/UserService';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DetailPageState {
  products: ITypes | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DetailPageState = {
  products: null,
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
        state.products = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch products';
      })
  
  },
});
export const fetchProductById = createAsyncThunk(
  "detailPage/fetchProductById",
  async (id: string) => {
    const response = await UserService.getProductById(id);
    return response.data;
  }
);

export default detailPageSlice.reducer
