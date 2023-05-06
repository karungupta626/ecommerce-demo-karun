import React from 'react';
import styles from './Card.module.css';

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  rating: number;
}

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div className={styles.container}>
      <div key={product.id} className={styles.card}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <button className={styles.button}>Add to Cart</button>
        <h2 className={styles.name}>{product.name}</h2>
        <div className={styles.priceContainer}>
          {product.discount > 0 && (
            <p className={styles.discountedPrice}>
              ${(product.price * (100 - product.discount) / 100).toFixed(2)}
            </p>
          )}
          <p className={styles.price}>
            ${product.price.toFixed(2)}
            {product.discount > 0 && (
              <span className={styles.discount}>{product.discount}% off</span>
            )}
          </p>
        </div>
        <div className={styles.rating}>
          {Array.from(Array(Math.round(product.rating)), (_, index) => (
            <span key={index} className={styles.star}>&#9733;</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
