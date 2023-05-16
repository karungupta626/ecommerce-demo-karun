import Card from "@/components/Cards/Card";
import styles from "./categorypage.module.css";
import { fetchCategoryData } from "@/reducers/CategoriesSlice";
import { AppDispatch, RootState } from "@/store";
import { ITypes } from "@/types/UserDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function CategoryPage() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { category } = router.query;
  const categoryData = useSelector(
    (state: RootState) => state.categories.data
  ) as { products: any[] } | undefined;
  const loading = useSelector((state: RootState) => state.categories.loading);
  const error = useSelector((state: RootState) => state.categories.error);
  useEffect(() => {
    if (category) {
      dispatch(fetchCategoryData(category));
    }
  }, [dispatch, category]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  const products = categoryData?.products || [];
  return (
    <div className={`container ${styles.mainWrapper}`}>
      <div className={styles.headDiv}>
        <span onClick={() => router.push("/")}>Home</span> /{" "}
        <span className={styles.HeaderTitle}>{category} Page</span>
      </div>
      <div className={styles.card_Div}>
        {products.map((product: ITypes) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default CategoryPage;
