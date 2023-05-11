import React from "react";
import Link from "next/link";
import styles from "./FlashCard.module.css";
import { ITypes } from "@/types/UserDetails";
import { faHeart, faEye } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { AppDispatch } from "@/store";
import { addToWishlist } from "@/reducers/WishlistSlice";
import { useDispatch } from "react-redux";

export interface FlashCardProps {
  product: ITypes;
  data?: any;
}

const FlashCard: React.FC<FlashCardProps> = ({ product }: FlashCardProps) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product.id));
    router.push("/WishlistPage");
  };
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.cardImageWrapper}>
          <Link href={`/DetailPage/${product.id}`}>
            <span className={styles.flash_discountPercentage}>
              -{product.discountPercentage}%
            </span>
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
        <button className={styles.button}>Add to Cart</button>
        <div className={styles.descriptionDiv}>
          <h2 className={styles.name}>{product.title}</h2>
          <div className={styles.priceContainer}>
            <p className={styles.price}>
              <span className={styles.discountPrice}>
                $
                {(
                  product.price /
                  ((100 - product.discountPercentage) / 100)
                ).toFixed(2)}
              </span>
              <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
            </p>
          </div>
          <div className={styles.rating}>
            {Array.from(Array(Math.round(product.rating)), (e, index) => (
              <span key={index} className={styles.star}>
                <FontAwesomeIcon icon={faStar} />
              </span>
            ))}
            {" "}
            <span className={styles.ratingDiv}>({product.rating})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;