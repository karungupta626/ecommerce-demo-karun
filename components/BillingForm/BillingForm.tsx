
import { useForm } from "react-hook-form";
import styles from "./BillingForm.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
export default function BillingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector((state: RootState) => state.auth.user);
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const cartItems = useSelector((state: RootState) => state.shoppingCart.items);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  return (
    <>
      <div className={styles.billingFormWrapper}>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              className={styles.formInputDiv}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <>
                <span className={styles.error}>Enter your first name</span>
                <br />
              </>
            )}
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={styles.formInputDiv}
              defaultValue={user?.email}
            />
            {errors.email && (
              <>
                <span className={styles.error}>Enter your Email</span>
                <br />
              </>
            )}
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              {...register("companyName", { required: true })}
              className={styles.formInputDiv}
            />
            {errors.lastName && (
              <>
                <span className={styles.error}>Company Name is Required</span>
                <br />
              </>
            )}
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: true })}
              className={styles.formInputDiv}
            />
            {errors.phone && (
              <>
                <span className={styles.error}>Enter your Number</span>
                <br />
              </>
            )}
            <label htmlFor="postalcode">Postal Code</label>
            <input
              type="text"
              {...register("postalcode", { required: true })}
              className={styles.formInputDiv}
            />
            {errors.phone && (
              <>
                <span className={styles.error}>Postal code is required</span>
                <br />
              </>
            )}
            <label htmlFor="address">Apartment, Floor , etc. (optional)</label>
            <input
              type="text"
              {...register("Address")}
              className={styles.formInputDiv}
            />
            <label htmlFor="city">Town / City</label>
            <input
              type="text"
              {...register("city", { required: true })}
              className={styles.formInputDiv}
            />
            {errors.address && (
              <>
                <span className={styles.error}>Enter your City</span>
                <br />
              </>
            )}
            <br />
            <button type="submit" className={styles.cartSubmitButton}>
            Place Order
          </button>
          </form>
        </div>
        <div className={styles.billWrapper}>
          {cartItems.map((item, index) => (
            <div className={styles.cartItemDiv} key={index}>
              <div className={styles.imageCartItem}>
                <img
                  src={item.product.thumbnail}
                  width={54}
                  height={54}
                  alt={item.product.title}
                />
              </div>
              <div className={styles.nameCartItem}>{item.product.title}</div>
              <div className={styles.totalCartItem}>
                ${item.product.price * item.quantity}
              </div>
            </div>
          ))}
          <div className={styles.grandTotal}>
            <div className={styles.subTotal}>
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className={styles.shipping}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className={styles.Total}>
              <span>Total:</span>
              <span>${subtotal}</span>
            </div>
          </div>
          <div className={styles.paymentDiv}>
            <div className={styles.flexibleDiv}>
              <div className={styles.option1}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Bank"
                  id="bank"
                  checked
                />
                &nbsp;&nbsp;
                <label htmlFor="Bank">Bank</label>
              </div>
              <div className={styles.bankImage}>
                <Image src="/bank1.png" width={42} height={28} alt="Bank1" loading='lazy'/>
                <Image src="/bank2.png" width={42} height={28} alt="Bank2" loading='lazy'/>
                <Image src="/bank3.png" width={42} height={28} alt="Bank3" loading='lazy'/>
                <Image src="/bank4.png" width={42} height={28} alt="Bank4" loading='lazy'/>
              </div>
            </div>
            <br />
            <div className={styles.option1}>
              <input type="radio" name="paymentMethod" value="Cash" id="cash" />
              &nbsp;&nbsp;
              <label htmlFor="Cash">Cash On Dilevery</label>
            </div>
          </div>
          <div className={styles.couponImageDiv}>
            <Image src="/coupon.png" width={527} height={56} alt="Coupon" loading='lazy'/>
          </div>
        </div>
      </div>
    </>
  );
}
