import styles from "./FlashSales.module.css";

export default function FlashSales() {
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
          &nbsp;&nbsp; Today's
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
        </div>
        <div className={styles.card_Div}></div>
      </div>
    </>
  );
}
