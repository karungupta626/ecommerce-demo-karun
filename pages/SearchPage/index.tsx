import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { ITypes } from "@/types/UserDetails";
import {
  selectProducts,
  selectStatus,
  setQuery,
  searchProductsAsync,
} from "@/reducers/SearchPageSlice";
import { AppDispatch } from "@/store";
import Card from "@/components/Cards/Card";
import styles from "./SearchPage.module.css";
import { Button } from "react-bootstrap";

export default function SearchPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectStatus);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);

  useEffect(() => {
    const queryKeyword = router.query.keyword;
    if (typeof queryKeyword === "string" && queryKeyword.trim().length > 0) {
      setKeyword(queryKeyword);
      dispatch(setQuery(queryKeyword));
      dispatch(searchProductsAsync(queryKeyword));
    } else {
      setKeyword("");
      dispatch(setQuery(""));
      router.push("/");
    }
  }, [dispatch, router.query.keyword]);

  const filteredProducts = products.filter((product: ITypes) => {
    const title = product.title.toLowerCase();
    const keywordLower = typeof keyword === "string" ? keyword.toLowerCase() : "";
    return title.includes(keywordLower);
  });

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredProducts.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);

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

  const goBackHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className={`container-fluid ${styles.searchResult}`}>
        <div className={styles.searchResultMainDiv}>
          <h2 className={styles.searchResultHeadDiv}>
            {`Search Results for "${keyword}"`}
          </h2>
          <div className={styles.pagination}>
            <button onClick={prevPage} disabled={currentPage === 1} aria-label="Previous Page">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            &nbsp;&nbsp;
            <button onClick={nextPage} disabled={currentPage === totalPages} aria-label="Next Page">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        {filteredProducts.length > 0 ? (
          <div className={`container ${styles.productGrid}`}>
            {currentCards.map((product: ITypes) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.noProducts}>
            {keyword && <h3>No products found.</h3>}
            {!keyword && (
              <div>
                <h3>Nothing is in the search bar.</h3>
                <Button onClick={goBackHome}>Go back Home</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
