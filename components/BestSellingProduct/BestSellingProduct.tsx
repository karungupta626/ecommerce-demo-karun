import { AppDispatch, RootState } from '@/store';
import { useEffect, useState } from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './BestSellingProduct.module.css';
import Card from '../Cards/Card';
import { ITypes } from '@/types/UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestSellingProducts } from '@/reducers/BestSellingProductSlice';
import Image from 'next/image';
export default function BestSellingProduct() {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.bestSellingProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
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
  useEffect(() => {
    dispatch(fetchBestSellingProducts(30));
  }, [dispatch]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className={styles.bestSellingProduct_mainDiv}>
        <div className={styles.bestSellingProduct_featuredDiv}>
          <Image src="/categoryRectangle.png" alt="Rectangle" height="40" width="20" loading='lazy'/>
          &nbsp;&nbsp;This Month
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
