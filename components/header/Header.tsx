import {
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";
import { Divider } from "antd";
import { useRouter } from "next/router";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Dropdown from "react-bootstrap/Dropdown";
import { logoutUser } from "@/reducers/AuthSlice";

export default function Header() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = (event: any) => {
    event.preventDefault();
    const keyword = event.target.search.value;
    router.push(`/SearchPage?keyword=${keyword}`);
  };

  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const cartItems = useSelector((state: RootState) => state.shoppingCart.items);
  const userData = useSelector((state: RootState) => state.auth.user);

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
          <div className={styles.badgeDiv}>
            <div className={styles.subBadgeDiv1}>
              <Badge
                badgeContent={wishlist.length}
                color="secondary"
                className={styles.faHeartBadge}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => router.push("/WishlistPage")}
                  size="lg"
                />
              </Badge>
            </div>
            <div className={styles.subBadgeDiv2}>
              {" "}
              <Badge
                badgeContent={cartItems.length}
                color="secondary"
                className={styles.faHeartBadge}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  onClick={() => router.push("/ShoppingCartPage")}
                  size="lg"
                />
              </Badge>
            </div>
            <div className={styles.subBadgeDiv3}>
              <Dropdown>
                <Dropdown.Toggle variant="outlined" id="dropdown-basic">
                  {userData?.image ? (
                    <img
                      src={userData.image}
                      alt={userData?.username}
                      className={styles.header_Image}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} />
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdown_menu}>
                  <Dropdown.Item>My Order</Dropdown.Item>
                  <Dropdown.Item>My Cancellations</Dropdown.Item>
                  <Dropdown.Item>My Reviews</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      dispatch(logoutUser());
                      router.push("/LoginPage");
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <Divider style={{ margin: 8 }} />
    </>
  );
}
