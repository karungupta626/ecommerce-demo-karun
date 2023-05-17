import styles from "./DetailPage.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchProductById } from "@/reducers/detailpageslice";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITypes } from "@/types/UserDetails";
import { useRouter } from "next/router";
import axios from "axios";
import BestSellingProduct from "@/components/BestSellingProduct/BestSellingProduct";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { fetchWishlist } from "@/reducers/WishlistSlice";
import Image from "next/image";
const DetailPage = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [product, setProduct] = useState<ITypes | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);


  useEffect(() => {
    const { id } = router.query;
    if (id) {
      axios
        .get<ITypes>(`https://dummyjson.com/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.log(error));
    }
  }, [router.query]);

  const moveToCart = () => {
    router.push("/ShoppingCartPage");
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`container ${styles.detailPageWrapper}`}>
      <div className={styles.detailPageHeaderDiv}>
        Details / {product?.category} /{" "}
        <span className={styles.HeaderTitle}>{product?.title}</span>
      </div>
      {product && (
        <div className={styles.detailPageMainDiv}>
          <div className={styles.detailPageSmallImagesDiv}>
            {product.images &&
              product.images.map((image, index) => (
                <div key={index} className={styles.detailPageSmallImages}>
                  <img src={image} alt={`Product ${index}`} />
                </div>
              ))}
          </div>
          <div className={styles.detailPageImageDiv}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.image}
            />
          </div>
          <div className={styles.detailPageDetailDiv}>
            <h1 className={styles.detailPagetitleDiv}>{product.title}</h1>
            <div className={styles.detailPageBrand}>By : {product.brand}</div>
            <div className={styles.detailPageSubHeadDiv}>
              {Array.from(Array(Math.round(product.rating)), (e, index) => (
                <span key={index} className={styles.star}>
                  <FontAwesomeIcon icon={faStar} />
                </span>
              ))}{" "}
              <span className={styles.detailPageRating}>
                ({product.rating})
              </span>{" "}
              |{" "}
              <span className={styles.detailPageStock}>
                {product.stock} stock
              </span>
            </div>
            <div className={styles.detailPagePriceDiv}>${product.price}</div>
            <div className={styles.detailPageDescription}>
              {product.description}
            </div>
            <div className={styles.detailPageBuynowDiv}>
              <div className={styles.detailPageQuantityDiv}>
                <input
                  className={styles.quantityInput}
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={10}
                />
              </div>
              <div className={styles.detailPageQuantityButton}>
                <button className={styles.buyNowButton}  onClick={moveToCart}>Buy Now</button>
              </div>
              <div className={styles.detailPageFavoriteButton}>
                <button className={styles.favoriteButton} onClick={()=>router.push("/WishlistPage")}>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
            <div className={styles.detailPageImage}>
              <Image
                src="/dispatch.png"
                alt="Dispatch"
                height="180"
                width="399"
                loading='lazy'
              />
            </div>
          </div>
        </div>
      )}
      <div className={styles.detailPageRealedDiv}>
        <div className={styles.detailPage_cardDiv}>
          <BestSellingProduct />
        </div>
      </div>
    </div>
  );
};
export default DetailPage;
