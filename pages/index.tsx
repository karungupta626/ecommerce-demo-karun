import NewArrival from "@/components/newArrival/NewArrival";
import styles from "./index.module.css";
import Explore from "@/components/Explore/Explore";
import BestSellingProduct from "@/components/BestSellingProduct/BestSellingProduct";
import { Divider } from "antd";
import BrowseByCategories from "@/components/BrowseByCategories/BrowseByCategories";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import FlashSales from "@/components/FlashSales/FlashSales";

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }
  

  return (
    <>
      <div className={`container ${styles.index_mainDiv}`}>
      <div className={styles.index_firstDiv}>
        <div>

        </div>
        <div className={styles.index_posterDiv}>
        <img src="/poster.png" alt="I Phone Poster" height="344" width="892" />
        </div>
        </div>
      <div className={styles.index_flashSalesDiv}>
        <FlashSales/>
        </div>
      <div className={styles.index_categoriesDiv}>
        <BrowseByCategories/>
        </div>
        <Divider />
      <div className={styles.index_bestSellingProductDiv}>
          <BestSellingProduct/>
        </div>
        <div className={styles.index_speakerDiv}>
          <img src="/bluetoothspeaker.png" alt="Bluetooth Speaker" height="500" width="1170" />
        </div>
        <div className={styles.index_exploreDiv}>
          <Explore/>
        </div>
        <div className={styles.index_newArrivalDiv}>
          <NewArrival />
        </div>
        <div className={styles.index_fullServicesDiv}>
          <img src="/fullservice.svg" alt="Full Services" />
        </div>
      </div>
      {showScrollButton && (
        <button className={styles.scrollButton} onClick={scrollToTop}>
          <FontAwesomeIcon
                icon={faArrowUp}
              />
        </button>
      )}
    </>
  );
}
