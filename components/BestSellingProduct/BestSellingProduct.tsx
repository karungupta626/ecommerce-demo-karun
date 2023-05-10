import { CardState, fetchProductsByRating } from "@/reducers/CardSlice";
import { AppDispatch } from "@/store";
import { ITypes } from "@/types/UserDetails";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BestSellingProduct.module.css";
import Card from "../Cards/Card";

export default function BestSellingProduct() {
  const dispatch: AppDispatch = useDispatch();
  const { products, status, error } = useSelector(
    (state: { card: CardState }) => state.card
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);

  useEffect(() => {
    dispatch(fetchProductsByRating({ rating: 5, limit: 100 }));
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
      <div className={styles.bestSellingProduct_mainDiv}>
        <div className={styles.bestSellingProduct_featuredDiv}>
          <img
            src="/categoryRectangle.png"
            alt="Rectangle"
            height="40"
            width="20"
          />
          &nbsp;&nbsp; This Month
        </div>
        <div className={styles.bestSellingProduct_bestSellingDiv}>
        <div className={styles.bestSellingProduct_productDiv}>Best Selling Products</div>
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
