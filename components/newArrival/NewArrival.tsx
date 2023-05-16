import styles from "./NewArrival.module.css";
export default function NewArrival() {
  return (
    <>
      <div className={styles.newArrival_mainDiv}>
        <div className={styles.newArrival_featuredDiv}>
          <img src="/categoryRectangle.png" alt="Rectangle" height="40" width="20"/>
          &nbsp;&nbsp; Featured
        </div>
        <div className={styles.newArrival_newArrivalDiv}>New Arrival</div>
        <div className={styles.newArrival_imageDiv}>
            <div className={styles.newArrival_imageDiv1}>
            <img src="/ps5.png" alt="ps5" height="600" width="570"/>
            </div>
            <div className={styles.newArrival_imageDiv2}>
                <div className={styles.newArrival_imageDiv3}>
                <img src="/WomenCollection.png" alt="WomenCollection" height="284" width="570"/>
                </div>
                <div className={styles.newArrival_imageDiv4}>
                    <div className={styles.newArrival_imageDiv5}>
                    <img src="/Speaker.png" alt="Speaker" height="284" width="270"/>
                    </div>
                    <div className={styles.newArrival_imageDiv6}>
                    <img src="/perfume.png" alt="perfume" height="284" width="270"/>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
