import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FlashSales.module.css';
import { AppDispatch, RootState } from '@/store';
import { fetchFlashCardData } from '@/reducers/FlashCardSlice';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITypes } from '@/types/UserDetails';
import FlashCard from '../Cards/FlashCard';

export default function FlashSales() {
  const dispatch: AppDispatch = useDispatch();
  const { products, status, error } = useSelector(
    (state: RootState) => state.flashcard
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(4);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products?.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil((products?.length || 0) / cardsPerPage);

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
    dispatch(fetchFlashCardData(10));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={styles.flashSales_mainDiv}>
        <div className={styles.flashSales_featuredDiv}>
          <img
            src="/categoryRectangle.png"
            alt="Rectangle"
            height="40"
            width="20"
          />
          &nbsp;&nbsp; {`Today's`}
        </div>
        <div className={styles.flashSales_flashSalesDiv}>
          <span>Flash Sales</span>
          <span className={styles.flashSales_timerDiv}>
            <img
              src="/flashsaletimer.png"
              alt="Timer"
              height="50"
              width="302"
            />
          </span>
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
            <FlashCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
