import { Outlet } from "react-router-dom";

export default function MovieReviews() {
  return (
    <div>
      <ul></ul>
      <h1>Reviews</h1>
      <Outlet />
    </div>
  );
}
