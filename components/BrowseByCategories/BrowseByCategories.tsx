import { Box } from "@mui/material";
import styles from "./BrowseByCategories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile } from "@fortawesome/free-solid-svg-icons";

export default function BrowseByCategories() {
  return (
    <>
      <div className={styles.browseByCategories_mainDiv}>
        <div className={styles.browseByCategories_featuredDiv}>
          <img
            src="/categoryRectangle.png"
            alt="Rectangle"
            height="40"
            width="20"
          />
          &nbsp;&nbsp; Categories
        </div>
        <div className={styles.browseByCategories_browseDiv}>Browse By Category</div>
        <div className={styles.category_DivMain}>
          <div className={styles.category_Div}>
            <Box>
              <FontAwesomeIcon icon={faMobile}/>
            </Box>
          </div>
          <div className={styles.category_Div}>
          <Box>
          <FontAwesomeIcon icon={faMobile}/>
            </Box>
          </div>
          <div className={styles.category_Div}>
          <Box>
          <FontAwesomeIcon icon={faMobile}/>
            </Box>
          </div>
          <div className={styles.category_Div}>
          <Box>
          <FontAwesomeIcon icon={faMobile}/>
            </Box>
          </div>
          <div className={styles.category_Div}>
          <Box>
          <FontAwesomeIcon icon={faMobile}/>
            </Box>
          </div>
          <div className={styles.category_Div}>
          <Box>
          <FontAwesomeIcon icon={faMobile}/>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}