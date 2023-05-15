
import { useRouter } from "next/router";
import styles from "./CheckOutPage.module.css";
import BillingForm from "@/components/BillingForm/BillingForm";
export default function CheckOutPage() {

const router = useRouter();

  return (
    

    <>
      <div className={`container ${styles.checkoutWrapper}`}>
        <div className={styles.checkoutHeaderDiv}>
          Account / My Account / Product / <span onClick={() => router.push("/ShoppingCartPage")}>View Cart </span>/{" "}
          <span className={styles.HeaderTitle}>CheckOut</span>
        </div>
        <h1 className={styles.heading}>Billing Details</h1>
        <div className={styles.checkoutMainDiv}>
            <BillingForm/>
        </div>
      </div>
    </>
  );
}
