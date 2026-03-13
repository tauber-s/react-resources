import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Routing | Pagination | Service Workers | Web Components</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/users">Users</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};