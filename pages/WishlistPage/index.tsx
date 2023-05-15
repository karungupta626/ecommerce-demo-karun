import Explore from "@/components/Explore/Explore";
import styles from "./WishlistPage.module.css";
import { fetchWishlist } from "@/reducers/WishlistSlice";
import { AppDispatch, RootState } from "@/store";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WishlistCard from "@/components/Cards/WishlistCard";
import { ITypes } from "@/types/UserDetails";
import Card from "@/components/Cards/Card";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart } from "@/reducers/ShoppingCartSlice";

const WishlistPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { wishlist, loading } = useSelector(
    (state: RootState) => state.wishlist
  );
  const sorted = wishlist.flatMap((item) => item.product);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sorted?.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(wishlist?.length / cardsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.headingWrapper}>
        <div className={styles.heading}>My Wishlist ({wishlist.length})</div>
        <div className={styles.headingButton}>
          <Button variant="outlined" color="inherit">
            Move To Bag
          </Button>
        </div>
        <div className={styles.pagination}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          &nbsp;&nbsp;
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className={styles.card_Div}>
        {currentCards?.map((product: ITypes) => (
          <WishlistCard key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.Wishlist_cardDiv}>
        <Explore />
      </div>
    </div>
  );
};

export default WishlistPage;
