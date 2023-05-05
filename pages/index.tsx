import NewArrival from "@/components/newArrival/NewArrival";
import styles from "./index.module.css";
import Explore from "@/components/Explore/Explore";

export default function Home() {
  return (
    <>
      <div className={`container ${styles.index_mainDiv}`}>
        <div className={styles.index_speakerDiv}>
          <img src="/bluetoothspeaker.png" alt="Bluetooth Speaker" height="500" width="1170" />
        </div>
        <div className={styles.index_exploreDiv}>
          <Explore/>
        </div>
        <div className={styles.index_newArrivalDiv}>
          <NewArrival />
        </div>
        <div className={styles.index_fullServicesDiv}>
          <img src="/fullservice.svg" alt="Full Services" />
        </div>
      </div>
    </>
  );
}
