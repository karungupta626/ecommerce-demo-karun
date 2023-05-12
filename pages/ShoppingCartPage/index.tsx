import { Button } from "@mui/material";
import Image from "next/image";
import styles from "./ShoppingCartPage.module.css";
import { Divider } from "antd";
import { useRouter } from "next/router";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";

export default function ShoppingCartPage() {
    const router = useRouter();
  return (
    <>
      <div className={`container ${styles.cartWrapper}`}>
        <div className={styles.cartHeaderDiv}>
          Home / <span className={styles.HeaderTitle}>Cart</span>
        </div>
        <div className={styles.cartMainDiv}>
          <div className={styles.cartMainHeadDiv}>
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          <div className={styles.cartMainQuantityDiv}>
            <span>iphone</span>
            <span>$228</span>
            <input type="number" className={styles.quantitySpan} />
            <span>$228</span>
          </div>
          <div className={styles.cartMainButtonDiv}>
            <Button
              variant="outlined"
              color="inherit"
              className={styles.returnButtonDiv}
            >
              Return To Shop
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              className={styles.updateButtonDiv}
            >
              Update Cart
            </Button>
          </div>
        </div>
        <div className={styles.cartFooterDiv}>
          <div className={styles.cartFooterImageDiv}>
            <Image src="/coupon.png" width={527} height={56} alt="Coupon" />
          </div>
          <div className={styles.cartFooterTotalDiv}>
            <div className={styles.cartFooterCartTotal}>Cart Total</div>
            <div className={styles.cartFooterSubTotal}>
              <div>Subtotal:</div>
              <div>$1750</div>
            </div>
            <div className={styles.cartFooterShipping}>
              <div>Shipping:</div>
              <div>Free</div>{" "}
            </div>
            <div className={styles.cartFooterTotal}>
              <div>Total:</div>
              <div>$1750</div>
            </div>
            <button className={styles.cartFooterButton} onClick={()=>router.push("/CheckOutPage")}>
              Process to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
