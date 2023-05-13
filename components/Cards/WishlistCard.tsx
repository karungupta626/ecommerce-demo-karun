import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./WishlistCard.module.css";
import { ITypes } from "@/types/UserDetails";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { deleteFromWishlistAsync } from "@/reducers/WishlistSlice";
import { useRouter } from "next/router";
import { CartItem, addCartItem } from "@/reducers/ShoppingCartSlice";
export interface CardProps {
  product: ITypes;
}

export default function WishlistCard({ product }: CardProps) {
    const router = useRouter()
  const dispatch: AppDispatch = useDispatch();
    const handleDelete = () => {
      dispatch(deleteFromWishlistAsync(product.id.toString()));
    };

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
        <button className={styles.button} onClick={handleAddToCart}>Add to Cart</button>
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
}
