import { Outlet } from "react-router-dom";

export default function MovieCast() {
  return (
    <div>
      <ul></ul>
      <h1>Cast Information</h1>
      <Outlet />
    </div>
  );
}
