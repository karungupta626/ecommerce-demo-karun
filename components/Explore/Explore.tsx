import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Explore.module.css";
import { CardState, fetchProducts } from "@/reducers/CardSlice";
import { AppDispatch } from "@/store";
import Card from "../Cards/Card";
import { ITypes } from "@/types/UserDetails";

export default function Explore() {
  const dispatch: AppDispatch = useDispatch();
  const { products, status, error } = useSelector(
    (state: { card: CardState }) => state.card
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={styles.explore_mainDiv}>
        <div className={styles.explore_featuredDiv}>
          <img
            src="/categoryRectangle.png"
            alt="Rectangle"
            height="40"
            width="20"
          />
          &nbsp;&nbsp; Our Products
        </div>
        <div className={styles.explore_newArrivalDiv}>Explore Our Products</div>
        <div className={styles.card_Div}>
          <div className={styles.card_Div}>
          {Array.isArray(products) &&
              products.map((product: ITypes) => (
                <Card key={product.id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
