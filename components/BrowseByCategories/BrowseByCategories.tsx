import { useRouter } from "next/router";
import styles from "./BrowseByCategories.module.css";
import Image from "next/image";
export default function BrowseByCategories() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/CategoryPage/${category}`);
  };

  return (
    <>
      <div className={styles.browseByCategories_mainDiv}>
        <div className={styles.browseByCategories_featuredDiv}>
          <Image
            src="/categoryRectangle.png"
            alt="Rectangle"
            height="40"
            width="20"
            loading='lazy'
          />
          &nbsp;&nbsp; Categories
        </div>
        <div className={styles.browseByCategories_browseDiv}>
          Browse By Category
        </div>
        <div className={styles.category_DivMain}>
          <div
            className={styles.category_Box}
            onClick={() => handleCategoryClick("smartphones")}
          >
            Smartphones
          </div>
          <div
            className={styles.category_Box}
            onClick={() => handleCategoryClick("fragnances")}
          >
            Fragnances
          </div>
          <div
            className={styles.category_Box}
            onClick={() => handleCategoryClick("mens-watches")}
          >
            Watches
          </div>
          <div
            className={styles.category_Box}
            onClick={() => handleCategoryClick("sunglasses")}
          >
            sunglasses
          </div>
          <div
            className={styles.category_Box}
            onClick={() => handleCategoryClick("furniture")}
          >
            furniture
          </div>
          <div
            className={styles.category_Box}
            onClick={() => handleCategoryClick("womens-jewellery")}
          >
            jewellery
          </div>
        </div>
      </div>
    </>
  );
}
