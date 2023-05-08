import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { ITypes } from "@/types/UserDetails";
export interface CardProps {
  key: number;
  product: ITypes;
  data?: any;
}

const Card: React.FC<CardProps> = ({ product }: CardProps) => {
  return (
    <>
      <Link to={`/product/${product.id}`} className={styles.mainDiv}>
        <div className={styles.card}>
          <img
            src={product.images ? product.images[0] : "image"}
            alt={product.title}
            className={styles.image}
          />
          <button className={styles.button}>Add to Cart</button>
          <h2 className={styles.name}>{product.title}</h2>
          <div className={styles.priceContainer}>
            {product.discountPercentage > 0 && (
              <p className={styles.discountedPrice}>
                $
                {(
                  (product.price * (100 - product.discountPercentage)) /
                  100
                ).toFixed(2)}
              </p>
            )}
            <p className={styles.price}>
              ${product.price.toFixed(2)}
              {product.discountPercentage > 0 && (
                <span className={styles.discount}>
                  {product.discountPercentage}% off
                </span>
              )}
            </p>
          </div>
          <div className={styles.rating}>
            {Array.from(Array(Math.round(product.rating)), (e, index) => (
              <span key={index} className={styles.star}>
                &#9733;
              </span>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
