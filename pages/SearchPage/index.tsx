import Card from "@/components/Cards/Card";
import styles from "./SearchPage.module.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { ITypes } from "@/types/UserDetails";
import { RootState } from "@/store/rootReducer";
import { useEffect } from "react";
import {
  selectProducts,
  selectStatus,
  setQuery,
  searchProductsAsync,
} from "@/reducers/SearchPageSlice";
import { AppDispatch } from "@/store";

export default function SearchPage() {
  const router = useRouter();
  const keyword = router.query.keyword;

  const dispatch: AppDispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (keyword) {
      dispatch(setQuery(keyword as string));
      dispatch(searchProductsAsync(keyword as string));
    }
  }, [dispatch, keyword]);

  const filteredProducts = products.filter((product: { title: string }) => {
    const title = product.title.toLowerCase();
    const keywordLower =
      typeof keyword === "string" ? keyword.toLowerCase() : "";
    return title.includes(keywordLower);
  });

  return (
    <>
      <div className={styles.searchResult}>
        <h1>Search Results for "{keyword}"</h1>
        <>
          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map((product: ITypes) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products found.</p>
          )}
        </>
      </div>
    </>
  );
}
