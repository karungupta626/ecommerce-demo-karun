import React from "react";
import Link from "next/link";
import styles from "./Card.module.css";
import { ITypes } from "@/types/UserDetails";
import { faHeart, faEye } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { AppDispatch } from "@/store";
import { addToWishlist } from "@/reducers/WishlistSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { CartItem, addCartItem, addToCart } from "@/reducers/ShoppingCartSlice";

export interface CardProps {
  product: ITypes;
  data?: any;
}

const Card: React.FC<CardProps> = ({ product }: CardProps) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const handleAddToCart = async () => {
    try {
      const cartItem: CartItem = {
        product: product,
        quantity: 1,
        id: "",
      };
      await dispatch(addCartItem(cartItem));
      router.push("/ShoppingCartPage");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await axios.post(
        "https://645dfaea12e0a87ac0e467db.mockapi.io/wishlist",
        {
          userId: 1,
          product: product,
        }
      );
      const wishlistItem = response.data;
      dispatch(addToWishlist(wishlistItem));
      router.push("/WishlistPage");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.cardImageWrapper}>
          <Link href={`/DetailPage/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.image}
            />
          </Link>
          <div className={styles.buttonsContainer}>
            <FontAwesomeIcon
              className={styles.buttonFa}
              icon={faHeart}
              onClick={handleAddToWishlist}
            />
            <FontAwesomeIcon className={styles.buttonFa} icon={faEye} />
          </div>
        </div>
        <button className={styles.button} onClick={handleAddToCart}>Add to Cart</button>
        <div className={styles.descriptionDiv}>
          <h2 className={styles.name}>{product.title}</h2>
          <div className={styles.priceContainer}>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
            <div className={styles.rating}>
              {Array.from(Array(Math.round(product.rating)), (e, index) => (
                <span key={index} className={styles.star}>
                  <FontAwesomeIcon icon={faStar} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
