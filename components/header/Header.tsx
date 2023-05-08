import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";
import { Divider } from "antd";
// import { useRouter } from "next/router";

export default function Header() {
  // const router = useRouter();

  const handleSearch = (event:any) => {
    event.preventDefault();
    const keyword = event.target.search.value;
    // router.push(`/SearchPage?keyword=${keyword}`);
  };

  return (
    <>
      <div className={`container ${styles.Header_mainDiv}`}>
        <div className={styles.Header_frame1}>Exclusive</div>
        <div className={styles.Header_frame2}>
          <span className={styles.menuItem}>Home</span>
          <span className={styles.menuItem}>Contact</span>
          <span className={styles.menuItem}>About</span>
          <span className={styles.menuItem}>Sign Up</span>
        </div>
        <div className={styles.Header_frame3}>
          <form className={styles.searchBar} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="What are you looking for?"
              className={styles.searchInput}
              name="search"
            />
            <button type="submit" className={styles.searchButton}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <span className={styles.menuItem}>
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <span className={styles.menuItem}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </span>
        </div>
      </div>
      <Divider style={{ margin: 8 }} />
      {/* {router.query.keyword && (
        <h1 style={{ textAlign: "center" }}>
          Search Results for "{router.query.keyword}"
        </h1>
      )} */}
    </>
  );
}
