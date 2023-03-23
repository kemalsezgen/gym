import React from "react";
import "./App.css"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// pages
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import Trainers from "./pages/Trainers.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";

const Layout = () => {
  return (
    <div>
      <h1 class="text-3xl font-bold underline">Navbar</h1>
      <Outlet></Outlet>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/trainers", element: <Trainers /> },
      { path: "/login", element: <Login />},
      { path: "/signout", element: <Login />},
      { path: "/register", element: <Register />},
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
};

export default App;
