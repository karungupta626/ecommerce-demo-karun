
import styles from "./CheckOutPage.module.css";
import BillingForm from "@/components/BillingForm/BillingForm";
export default function CheckOutPage() {

  return (
    <>
      <div className={`container ${styles.checkoutWrapper}`}>
        <div className={styles.checkoutHeaderDiv}>
          Account / My Account / Product / View Cart /{" "}
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
