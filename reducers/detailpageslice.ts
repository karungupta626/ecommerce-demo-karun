import { AppThunk } from '@/store';
import { ITypes } from '@/types/UserDetails';
import { UserService } from '@/types/UserService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


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
  reducers: {
    getProductStart: (state) => {
      state.status = 'loading';
    },
    getProductSuccess: (state, action: PayloadAction<ITypes>) => {
      state.status = 'succeeded';
      state.product = action.payload;
      state.error = null;
    },
    getProductFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { getProductStart, getProductSuccess, getProductFailure } = detailPageSlice.actions;

export const fetchProductById = (id: number): AppThunk => async (dispatch) => {
  try {
  dispatch(getProductStart());
  const product = await UserService.getProductById(id);
  // dispatch(getProductSuccess(product));
  } catch (error) {
  dispatch(getProductFailure('Failed to fetch product'));
  }
  };
export default detailPageSlice.reducer;
