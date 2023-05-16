import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/AuthSlice';
import cardReducer from '../reducers/CardSlice';
import detailPageReducer from '../reducers/detailpageslice';
import searchReducer from '../reducers/SearchPageSlice';
import wishlistReducer from '../reducers/WishlistSlice';
import bestSellingProductsReducer from '../reducers/BestSellingProductSlice';
import flashcardReducer from '../reducers/FlashCardSlice';
import shoppingCartReducer from '../reducers/ShoppingCartSlice';
import categoriesReducer from '../reducers/CategoriesSlice';


const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    categories: categoriesReducer,
    flashcard: flashcardReducer,
    bestSellingProducts: bestSellingProductsReducer,
    card: cardReducer,
    detailPage: detailPageReducer,
    wishlist: wishlistReducer,
    shoppingCart: shoppingCartReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
