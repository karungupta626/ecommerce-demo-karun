import { Button } from "@mui/material";
import Image from "next/image";
import styles from "./ShoppingCartPage.module.css";
import { Divider } from "antd";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  CartItem,
  fetchCartItems,
  removeCartItem,
  removeFromCart,
  updateCartItemQuantity,
} from "@/reducers/ShoppingCartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function ShoppingCartPage({ item }: { item: CartItem }) {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.shoppingCart.items);

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    setSubtotal(
      cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      )
    );
    setTotal(subtotal);
  }, [cartItems]);

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  const handleUpdateCart = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.product.price * item.quantity;
    });
    setSubtotal(subtotal);
    setTotal(subtotal);
    alert("Cart updated!");
  };

  const handleDeleteItem = (id :string) => {
    dispatch(removeCartItem(id));
  };

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
          {cartItems.map((item) => (
            <div key={item.product.id} className={styles.cartMainQuantityDiv}>
              {item.product && (
                <>
                  <span>
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      height={50}
                      width={39}
                    />
                    <button className={styles.closebutton}
                    onClick={() => handleDeleteItem(item.id)}
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                    {item.product.title}
                  </span>

                  <span>${item.product.price}</span>
                  <input
                    type="number"
                    className={styles.quantitySpan}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                  />
                  <span>${item.product.price * item.quantity}</span>
                </>
              )}
            </div>
          ))}
          <div className={styles.cartMainButtonDiv}>
            <Button
              variant="outlined"
              color="inherit"
              className={styles.returnButtonDiv}
              onClick={() => router.push("/")}
            >
              Return To Shop
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              className={styles.updateButtonDiv}
              onClick={handleUpdateCart}
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
              <div>${subtotal.toFixed(2)}</div>
            </div>
            <div className={styles.cartFooterShipping}>
              <div>Shipping:</div>
              <div>Free</div>{" "}
            </div>
            <div className={styles.cartFooterTotal}>
              <div>Total:</div>
              <div>${total.toFixed(2)}</div>
            </div>
            <button
              className={styles.cartFooterButton}
              onClick={() => router.push("/CheckOutPage")}
            >
              Process to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
