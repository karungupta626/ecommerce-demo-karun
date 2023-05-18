import Explore from "@/components/Explore/Explore";
import styles from "./WishlistPage.module.css";
import { fetchWishlist } from "@/reducers/WishlistSlice";
import { AppDispatch, RootState } from "@/store";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WishlistCard from "@/components/Cards/WishlistCard";
import { ITypes } from "@/types/UserDetails";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { CartItem, addToCart, setCartItems } from "@/reducers/ShoppingCartSlice";
import axios from "axios";
import { ToastContainer } from "react-toastify";

const WishlistPage = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { wishlist } = useSelector((state: RootState) => state.wishlist);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = wishlist?.slice(indexOfFirstCard, indexOfLastCard);
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

  const moveToCart = async () => {
    try {
      for (const item of wishlist) {
        const cartItem: CartItem = {
          id: item.id,
          product: item.product,
          quantity: 1,
        };

        await axios.post(
          "https://645dfaea12e0a87ac0e467db.mockapi.io/cart",
          cartItem
        );

        dispatch(addToCart(cartItem));
      }

      router.push("/ShoppingCartPage");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.headingWrapper}>
        <div className={styles.heading}>My Wishlist ({wishlist.length})</div>
        <div className={styles.headingButton}>
          <Button variant="outlined" color="inherit" onClick={moveToCart}>
            Move To Bag
          </Button>
        </div>
        <div className={styles.pagination}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          &nbsp;&nbsp;
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className={styles.card_Div}>
        {currentCards?.map((item) => (
          <WishlistCard key={item.id} product={item.product} />
        ))}
        <ToastContainer />
      </div>
      <div className={styles.Wishlist_cardDiv}>
        <Explore />
      </div>
    </div>
  );
};

export default WishlistPage;
