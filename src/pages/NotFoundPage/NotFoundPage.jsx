import { Link } from "react-router-dom";
import Styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <h3 className={Styles.h3}>404 Page Not Found</h3>
      <Link className={Styles.link} to="/">
        Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
