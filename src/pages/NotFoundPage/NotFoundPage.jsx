import styles from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Cat404 from "../../images/cat404.png";

export default function NotFoundPage() {
  return (
    <div className={styles.main}>
      <p className={styles.main__error}>page not found!</p>
      <div className={styles.main__image}>
        <img src={Cat404} alt="cat" />
      </div>
      <div className={styles.main__redirect}>
        <div className={styles.link}>
          <Link to="/">
            <Button text="go to main page" />
          </Link>
        </div>
      </div>
    </div>
  );
}
