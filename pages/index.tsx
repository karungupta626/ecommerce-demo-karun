import NewArrival from "@/components/newArrival/NewArrival";
import styles from "./index.module.css";
import Explore from "@/components/Explore/Explore";
import BestSellingProduct from "@/components/BestSellingProduct/BestSellingProduct";
import BrowseByCategories from "@/components/BrowseByCategories/BrowseByCategories";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import FlashSales from "@/components/FlashSales/FlashSales";
import Categories from "@/components/Categories/Catergories";
import Image from "next/image";
export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className={`container ${styles.index_mainDiv}`}>
        <div className={styles.index_firstDiv}>
          <div className={styles.index_typesDiv}>
            <Categories />
          </div>
          <div className={styles.index_posterDiv}>
            <Image
              src="/poster.png"
              alt="I Phone Poster"
              height="344"
              width="892"
              priority
            />
          </div>
        </div>
        <div className={styles.index_flashSalesDiv}>
          <FlashSales />
        </div>
        <div className={styles.index_categoriesDiv}>
          <BrowseByCategories />
        </div>
        <div className={styles.index_bestSellingProductDiv}>
          <BestSellingProduct />
        </div>
        <div className={styles.index_speakerDiv}>
          <Image
            src="/bluetoothspeaker.png"
            alt="Bluetooth Speaker"
            height="500"
            width="1170"
            loading='lazy'
          />
        </div>
        <div className={styles.index_exploreDiv}>
          <Explore />
        </div>
        <div className={styles.index_newArrivalDiv}>
          <NewArrival />
        </div>
        <div className={styles.index_fullServicesDiv}>
          <Image
            src="/fullservice.png"
            alt="Full Services"
            height="161"
            width="1287"
            loading='lazy'
          />
        </div>
      </div>
      {showScrollButton && (
        <button className={styles.scrollButton} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </>
  );
}
