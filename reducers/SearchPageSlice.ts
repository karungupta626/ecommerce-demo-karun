import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITypes } from "@/types/UserDetails";
import { RootState } from "@/store";
import { UserService } from "@/types/UserService";


interface SearchState {
  query: string;
  products: ITypes[];
  status: "idle" | "loading" | "failed";
}

const initialState: SearchState = {
  query: "",
  products: [],
  status: "idle",
};

export const searchProductsAsync = createAsyncThunk(
  "search/searchProductsAsync",
  async (query: string) => {
    const res = await UserService.getAllProducts(100);
    const filteredProducts = res.filter((product: { title: string; }) => {
        const title = product.title.toLowerCase();
        const keywordLower = typeof query === "string" ? query.toLowerCase() : "";
        return title.includes(keywordLower);
      });
    return filteredProducts;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const { setQuery } = searchSlice.actions;

export const selectProducts = (state: RootState) => state.search.products;
export const selectStatus = (state: RootState) => state.search.status;

export default searchSlice.reducer;
