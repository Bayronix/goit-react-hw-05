import { NavLink, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Styles from "./App.module.css";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));

const App = () => {
  return (
    <div className={Styles.background}>
      <nav className={Styles.nav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? Styles.activeText : Styles.text
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? Styles.activeText : Styles.text
          }
          to="/movies"
        >
          Movies
        </NavLink>
      </nav>
      <Suspense fallback={<div className={Styles.suspense}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
