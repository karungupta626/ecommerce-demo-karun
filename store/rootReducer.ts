import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/AuthSlice';
import cardReducer from '../reducers/CardSlice';
import detailPageReducer from '../reducers/detailpageslice';
import searchReducer from '../reducers/SearchPageSlice';
import wishlistReducer from '../reducers/WishlistSlice';
import bestSellingProductsReducer from '../reducers/BestSellingProductSlice';
import flashcardReducer from '../reducers/FlashCardSlice';
import shoppingCartReducer from '../reducers/ShoppingCartSlice';


const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    flashcard: flashcardReducer,
    bestSellingProducts: bestSellingProductsReducer,
    card: cardReducer,
    detailPage: detailPageReducer,
    wishlist: wishlistReducer,
    shoppingCart: shoppingCartReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
