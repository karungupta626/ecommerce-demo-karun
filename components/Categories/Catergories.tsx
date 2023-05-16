import { useRouter } from "next/router";
import  styles  from "./Categories.module.css";
function Categories() {
    const router = useRouter();
  
    const handleCategoryClick = (category: string) => {
      router.push(`/CategoryPage/${category}`);
    };
  
    return (
      <div className={styles.categoryWrapper}>
        <div
          className={styles.categoryList}
          onClick={() => handleCategoryClick('smartphones')}
        >
          smartphones
        </div>
        <div
          className={styles.categoryList}
          onClick={() => handleCategoryClick('laptops')}
        >
          laptops
        </div>
        <div
          className={styles.categoryList}
          onClick={() => handleCategoryClick('fragrances')}
        >
          fragrances
        </div>
        <div
          className={styles.categoryList}
          onClick={() => handleCategoryClick('skincare')}
        >
          skincare
        </div>
        <div
          className={styles.categoryList}
          onClick={() => handleCategoryClick('mens-watches')}
        >
          mens-watches
        </div>
        <div
          className={styles.categoryList}
          onClick={() => handleCategoryClick('womens-dresses')}
        >
          womens-dresses
        </div>
        <div
          className={styles.categoryList}
          onClick={() => handleCategoryClick('groceries')}
        >
          groceries
        </div>
        <div
          className={styles.categoryList}
          onClick={() => handleCategoryClick('home-decoration')}
        >
          home-decoration
        </div>
        <div
          className={styles.categoryList}
          onClick={() => handleCategoryClick('furniture')}
        >
          furniture
        </div>
      </div>
    );
  }
  
  export default Categories;
  