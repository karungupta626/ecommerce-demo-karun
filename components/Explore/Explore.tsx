import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Explore.module.css";
import { CardState, fetchProducts } from "@/reducers/CardSlice";
import { AppDispatch } from "@/store";
import Card from "../Cards/Card";
import { ITypes } from "@/types/UserDetails";
import { faArrowLeft , faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Explore() {
  const dispatch: AppDispatch = useDispatch();
  const { products, status, error } = useSelector(
    (state: { card: CardState }) => state.card
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8); 

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products?.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(products?.length / cardsPerPage);

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
        <div className={styles.explore_newArrivalDiv}>
          <div className={styles.explore_productDiv}>Explore Our Products</div>
          
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
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
