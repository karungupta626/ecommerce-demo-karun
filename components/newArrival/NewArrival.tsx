import Image from "next/image";
import styles from "./NewArrival.module.css";
export default function NewArrival() {
  return (
    <>
      <div className={styles.newArrival_mainDiv}>
        <div className={styles.newArrival_featuredDiv}>
          <Image src="/categoryRectangle.png" alt="Rectangle" height="40" width="20" loading='lazy'/>
          &nbsp;&nbsp; Featured
        </div>
        <div className={styles.newArrival_newArrivalDiv}>New Arrival</div>
        <div className={styles.newArrival_imageDiv}>
            <div className={styles.newArrival_imageDiv1}>
            <Image src="/ps5.png" alt="ps5" height="600" width="570" loading='lazy'/>
            </div>
            <div className={styles.newArrival_imageDiv2}>
                <div className={styles.newArrival_imageDiv3}>
                <Image src="/WomenCollection.png" alt="WomenCollection" height="284" width="570" loading='lazy'/>
                </div>
                <div className={styles.newArrival_imageDiv4}>
                    <div className={styles.newArrival_imageDiv5}>
                    <Image src="/Speaker.png" alt="Speaker" height="284" width="270" loading='lazy'/>
                    </div>
                    <div className={styles.newArrival_imageDiv6}>
                    <Image src="/perfume.png" alt="perfume" height="284" width="270" loading='lazy'/>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
