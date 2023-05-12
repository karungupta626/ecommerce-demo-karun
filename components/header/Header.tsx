import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";
import { Divider } from "antd";
import { useRouter } from "next/router";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Header() {
  const router = useRouter();

  const handleSearch = (event: any) => {
    event.preventDefault();
    const keyword = event.target.search.value;
    router.push(`/SearchPage?keyword=${keyword}`);
  };

  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);

  return (
    <>
      <div className={`container ${styles.Header_mainDiv}`}>
        <div className={styles.Header_frame1}>Exclusive</div>
        <div className={styles.Header_frame2}>
          <span className={styles.menuItem} onClick={() => router.push("/")}>
            Home
          </span>
          <span className={styles.menuItem}>Contact</span>
          <span className={styles.menuItem}>About</span>
          <span
            className={styles.menuItem}
            onClick={() => router.push("/LoginPage")}
          >
            Log In
          </span>
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
          <Badge 
          badgeContent={wishlist.length} 
          color="secondary" className={styles.faHeartBadge}>
            
              <FontAwesomeIcon icon={faHeart}  onClick={() => router.push("/WishlistPage")}/>
          </Badge>
          <span className={styles.menuItem2}>
            <FontAwesomeIcon icon={faShoppingCart} onClick={() => router.push("/ShoppingCartPage")}/>
          </span>
        </div>
      </div>
      <Divider style={{ margin: 8 }} />
    </>
  );
}
