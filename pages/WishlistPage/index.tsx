import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { ITypes } from "@/types/UserDetails";
import { fetchWishlist, removeFromWishlist } from "@/reducers/WishlistSlice";
import Card from "@/components/Cards/Card";
import Explore from "@/components/Explore/Explore";
import { Button } from "@mui/material";
import axios from "axios";

import styles from "./WishlistPage.module.css";

const WishlistPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.wishlist
  );
  const [products, setProducts] = useState<ITypes[]>([]);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await Promise.all(
        items.map((item) => {
          return axios
            .get<ITypes>(`https://dummyjson.com/products/${item.productId}`)
            .then((response) => response.data);
        })
      );
      setProducts(products);
    };

    fetchProducts();
  }, [items]);

  const handleRemove = (productId: number) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.headingWrapper}>
        <div className={styles.heading}>
          My Wishlist ({items.length}){" "}
        </div>
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
          {products.map((product: ITypes) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className={styles.Wishlist_cardDiv}>
        <Explore />
      </div>
    </div>
  );
};

export default WishlistPage;
