import React from "react";
import Link from "next/link";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITypes } from "@/types/UserDetails";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { deleteFromWishlistAsync } from "@/reducers/WishlistSlice";
import { useRouter } from "next/router";
import { CartItem, addCartItem } from "@/reducers/ShoppingCartSlice";
import styles from "./WishlistCard.module.css";
import { toast } from "react-toastify";
import axios from "axios";
export interface CardProps {
  product: ITypes;
}
const WishlistCard: React.FC<CardProps> = ({ product }: CardProps) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteFromWishlistAsync(product.id.toString()));
  };
  const handleAddToCart = async () => {
    try {
      const { data: cartItems } = await axios.get<CartItem[]>(
        "https://645dfaea12e0a87ac0e467db.mockapi.io/cart"
      );
  
      const isDuplicate = cartItems.some(
        (cartItem) => cartItem.product.id === product.id
      );
  
      if (isDuplicate) {
        toast.error('Item already exists in the cart.');
        return;
      }
  
      const cartItem: CartItem = {
        product: product,
        quantity: 1,
        id: "",
      };
  
      await dispatch(addCartItem(cartItem));
      toast.success('Successfully added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
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
              icon={faTrash}
              onClick={handleDelete}
            />
            <FontAwesomeIcon className={styles.buttonFa} icon={faEye} />
          </div>
        </div>
        <button className={styles.button} onClick={handleAddToCart}>
          Add to Cart
        </button>
        <div className={styles.descriptionDiv}>
          <h2 className={styles.name}>{product.title}</h2>
          <div className={styles.priceContainer}>
            <p className={styles.price}>${product.price}</p>
            <div className={styles.rating}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WishlistCard;
