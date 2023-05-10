import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";

import styles from "./WishlistPage.module.css";
import { ITypes } from "@/types/UserDetails";
import { fetchWishlist, removeFromWishlist } from "@/reducers/WishlistSlice";
import Card from "@/components/Cards/Card";
import Explore from "@/components/Explore/Explore";
import { Button } from "@mui/material";

const WishlistPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.wishlist
  );

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId: number) => {
    dispatch(removeFromWishlist(productId));
  };
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  
  return (
    <div className={`container ${styles.wrapper}`}>
        <div className={styles.headingWrapper}>
      <div className={styles.heading}>My Wishlist ({wishlist.length}) </div>
      <div className={styles.headingButton}>
        <Button variant="outlined" color="inherit">
            Move To Bag
        </Button>
      </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : items.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className={styles.cardsWrapper}>
          {items.map(
            (item: ITypes) =>
              item && item.id && <Card key={item.id} product={item} />
          )}
        </div>
      )}
        <div className={styles.Wishlist_cardDiv}>
          <Explore/>
        </div>
    </div>
  );
};

export default WishlistPage;
