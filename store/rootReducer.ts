import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/AuthSlice';
import cardReducer from '../reducers/CardSlice';
import detailPageReducer from '../reducers/detailpageslice';
import searchReducer from '../reducers/SearchPageSlice';
import wishlistReducer from '../reducers/WishlistSlice';
import bestSellingProductsReducer from '../reducers/BestSellingProductSlice';
import flashcardReducer from '../reducers/FlashCardSlice';


const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    flashcard: flashcardReducer,
    bestSellingProducts: bestSellingProductsReducer,
    card: cardReducer,
    detailPage: detailPageReducer,
    wishlist: wishlistReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
