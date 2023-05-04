import { Button } from "@mui/material";
import styles from "./ErrorPage.module.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    // const navigate = useNavigate();
  return (
    <div className={styles.ErrorPage_mainDiv}>
      <h1 className={styles.ErrorPage_heading}>404 Not Found</h1>
      <p className={styles.ErrorPage_text}>
        Your visited Page not found. You may go home page.
      </p>
      <br/>
      <Button variant="contained" color="error">Back to home page</Button>
    </div>
  );
};

export default ErrorPage;
