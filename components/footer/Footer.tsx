import { faCopyright, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Footer.module.css";
import { Divider } from "antd";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <div className={`container-fluid ${styles.Footer_mainDiv}`}>
        <div className={`container ${styles.Footer_content}`}>
          <div className={styles.Footer_frame1}>
            <div className={styles.menuItem1}>Exclusive</div>
            <div className={styles.menuItem2}>Subscribe</div>
            <div className={styles.menuItem3}>Get 10% off your first order</div>
            <div className={styles.menuEmail}>
              <input type="email" placeholder="Enter your email" />
              <span className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </span>
            </div>
          </div>
          <div className={styles.Footer_frame2}>
            <div className={styles.menuItem1}>Support</div>
            <div className={styles.menuItem2}>
              111 Bijoy sarani,Dhaka,DH 1515, Bangladesh
            </div>
            <div className={styles.menuItem3}>exclusive@gmail.com</div>
            <div className={styles.menuItem4}>+88015-88888-9999</div>
          </div>
          <div className={styles.Footer_frame3}>
            <div className={styles.menuItem1}>Account</div>
            <div className={styles.menuItem2}>My Account</div>
            <div className={styles.menuItem3} onClick={() => router.push("/LoginPage")} >Login/Register</div>
            <div className={styles.menuItem4} onClick={() => router.push("/ShoppingCartPage")}>Cart</div>
            <div className={styles.menuItem5} onClick={() => router.push("/WishlistPage")}>Wishlist</div>
            <div className={styles.menuItem6}>Shop</div>
          </div>
          <div className={styles.Footer_frame4}>
            <div className={styles.menuItem1}>Quick Link</div>
            <div className={styles.menuItem2}>Privacy Policy</div>
            <div className={styles.menuItem3}>Terms Of Use</div>
            <div className={styles.menuItem4}>FAQ</div>
            <div className={styles.menuItem5}>Contact</div>
          </div>
          <div className={styles.Footer_frame5}>
            <div className={styles.menuItem1}>Download App</div>
            <div className={styles.menuItem2}>
              <p className={styles.qrcode}>Save $3 with App New User Only</p>
              <div className={styles.scanLinks}>
                <div className={styles.qrCode}>
                  <img
                    src="/qrcodeimg.png"
                    alt="QR code"
                    width="80"
                    height="85"
                  />
                </div>
                <div className={styles.store}>
                  <img
                    src="/googleplay.svg"
                    alt="Google Play"
                    width="110"
                    height="40"
                  />
                  <img
                    src="/appstore.png"
                    alt="App Store"
                    width="110"
                    height="40"
                  />
                </div>
              </div>
            </div>
            <div className={styles.menuLinks}>
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ marginRight: "25px" }}
              />
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ marginRight: "25px" }}
              />
              <FontAwesomeIcon
                icon={faTwitter}
                style={{ marginRight: "25px" }}
              />
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
          </div>
        </div>
      </div>
      <Divider style={{ margin: 0, color: "grey" }} />
      <div className={`container-fluid ${styles.Footer_copyRight}`}>
        <FontAwesomeIcon icon={faCopyright} /> &nbsp; Copyright Rimel 2023. All
        rights reserved
      </div>
    </>
  );
}
