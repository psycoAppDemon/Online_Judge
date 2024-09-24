import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/error-page.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Home from "./routes/Home.jsx";
import User from "./routes/User.jsx";
import ProblemWindow from "./routes/ProblemWindow.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/problems/:id",
    element: <ProblemWindow />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/userprofile",
    element: <User/>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
