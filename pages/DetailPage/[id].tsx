import styles from "./DetailPage.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchProductById } from "@/reducers/detailpageslice";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITypes } from "@/types/UserDetails";
import { Divider } from "antd";
import { useRouter } from "next/router";
import { CardProps } from "@/components/Cards/Card";
import axios from "axios";
import BestSellingProduct from "@/components/BestSellingProduct/BestSellingProduct";
import { Button } from "@mui/material";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
const DetailPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState<ITypes>();
  useEffect(() => {
    const { id } = router.query;
    if (id) {
      axios
        .get<ITypes>(`https://dummyjson.com/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.log(error));
    }
  }, [router.query]);
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
            <Divider />
            <div className={styles.detailPageBuynowDiv}>
              <div className={styles.detailPageQuantityDiv}>
                {/* <button className={styles.quantityButton}>-</button> */}
                <input
                  className={styles.quantityInput}
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={10}
                />
                {/* <button className={styles.quantityButton}>+</button> */}
              </div>
              <div className={styles.detailPageQuantityButton}>
                <button className={styles.buyNowButton}>Buy Now</button>
              </div>
              <div className={styles.detailPageFavoriteButton}>
                <button className={styles.favoriteButton} onClick={()=>router.push("/WishlistPage")}>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
            <div className={styles.detailPageImage}>
              <img
                src="/dispatch.png"
                alt="Dispatch"
                height="180"
                width="399"
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
