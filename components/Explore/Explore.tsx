import styles from "./Explore.module.css";

export default function Explore() {
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
        <div className={styles.explore_newArrivalDiv}>Explore Our Products</div>
        <div className={styles.explore_Div}>Explore Our Products</div>
      </div>
    </>
  );
}
