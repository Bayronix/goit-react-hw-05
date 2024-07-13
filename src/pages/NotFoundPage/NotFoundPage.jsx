import { Link } from "react-router-dom";
import Styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <h3>404 Page Not Found</h3>
      <Link to="/">Home Page</Link>
    </div>
  );
};

export default NotFoundPage;
