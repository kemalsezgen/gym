import React from "react";
import "./App.css"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Profile from "./pages/Profile.js";
import About from "./pages/About.js";
import Trainers from "./pages/Trainers.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Post from "./components/Post.js";

//components
import Navbar from "./components/Navbar";
//import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="outlet">
        <Outlet />
      </div>
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
      { path: "/post/:id", element: <Post />},
      { path: "/trainers", element: <Trainers /> },
      { path: "/about", element: <About />},
      { path: "/login", element: <Login />},
      { path: "/signout", element: <Login />},
      { path: "/register", element: <Register />},
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
