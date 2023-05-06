import styles from "./BestSellingProduct.module.css";

export default function BestSellingProduct() {
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
        <div className={styles.bestSellingProduct_bestSellingDiv}>Best Selling Products</div>
        <div className={styles.card_Div}></div>
      </div>
    </>
  );
}
