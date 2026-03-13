import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./web-components/user-badge";

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);

if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("/service-worker.js");