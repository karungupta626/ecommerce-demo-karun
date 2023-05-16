import Card from "@/components/Cards/Card";
import styles from "./SearchPage.module.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { ITypes } from "@/types/UserDetails";
import { RootState } from "@/store/rootReducer";
import { useEffect, useState } from "react";
import {
  selectProducts,
  selectStatus,
  setQuery,
  searchProductsAsync,
} from "@/reducers/SearchPageSlice";
import { AppDispatch } from "@/store";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function SearchPage() {
  const router = useRouter();
  const keyword = router.query.keyword;
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectStatus);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  useEffect(() => {
    if (typeof keyword === "string" && keyword.trim().length > 0) {
      dispatch(setQuery(keyword));
      dispatch(searchProductsAsync(keyword));
    }
  }, [dispatch, keyword]);
  const filteredProducts = products.filter((product: { title: string }) => {
    const title = product.title.toLowerCase();
    const keywordLower =
      typeof keyword === "string" ? keyword.toLowerCase() : "";
    return title.includes(keywordLower);
  });
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredProducts?.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredProducts?.length / cardsPerPage);
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
  return (
    <>
      <div className={`container-fluid ${styles.searchResult}`}>
        <div className={styles.searchResultMainDiv}>
          <h2 className={styles.searchResultHeadDiv}>
            {`Search Results for "${keyword}"`}
          </h2>
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
          {filteredProducts.length > 0 ? (
            <div className={`container ${styles.productGrid}`}>
              {currentCards.map((product: ITypes) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <h3>No products found.</h3>
          )}
      </div>
    </>
  );
}
