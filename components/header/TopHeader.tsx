import styles from "./TopHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown} from "@fortawesome/free-solid-svg-icons";

export default function TopHeader() {
  return (
    <>
      <div className={`container-fluid ${styles.topHeader_mainDiv}`}>
        <div className={styles.topHeader_frame}>
          <div className={styles.topHeader_frame1}>
            <p>
              Summer Sale For All Swim Suits And Free Express Dilevery - OFF
              50%!&nbsp;&nbsp;
            </p>
          </div>
          <span className={styles.topHeader_frame2}>ShopNow</span>
        </div>
        <div className={styles.topHeader_language}>
          English <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>
    </>
  );
}
