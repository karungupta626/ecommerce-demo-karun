import styles from "./BrowseByCategories.module.css";

export default function BrowseByCategories() {
  return (
    <>
      <div className={styles.browseByCategories_mainDiv}>
        <div className={styles.browseByCategories_featuredDiv}>
          <img
            src="/categoryRectangle.png"
            alt="Rectangle"
            height="40"
            width="20"
          />
          &nbsp;&nbsp; Categories
        </div>
        <div className={styles.browseByCategories_browseDiv}>Browse By Category</div>
        <div className={styles.category_Div}></div>
      </div>
    </>
  );
}