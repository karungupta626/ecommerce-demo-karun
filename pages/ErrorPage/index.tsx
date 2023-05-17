import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styles from "./ErrorPage.module.css";
import { useRouter } from "next/router";
const ErrorPage = () => {
  const router = useRouter()
  return (
    <div className={styles.ErrorPage_mainDiv}>
      <h1 className={styles.ErrorPage_heading}>404 Not Found</h1>
      <p className={styles.ErrorPage_text}>
        Your visited Page not found. You may go home page.
      </p>
      <br />
      <Button variant="contained" color="error" onClick={()=>router.push("/")}>
        Back to home page
      </Button>
    </div>
  );
};
export default ErrorPage;
