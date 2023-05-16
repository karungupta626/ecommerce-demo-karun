import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategoryData = createAsyncThunk(
  'category/fetchCategoryData',
  async (category) => {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    data: {},
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCategoryData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCategoryData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchCategoryData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed to fetch products';
    });
  },
});

export default categorySlice.reducer;
