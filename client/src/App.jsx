import React, { Suspense } from "react";
import "./App.css"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { useStore, SERVER_URL } from "./store/store.js";

import Login from './pages/Login/Login';
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"))
// import Dashboard from './pages/Dashboard/Dashboard';
const AddNewClient = React.lazy(() => import("./pages/AddNewClient/AddNewClient"))
// import AddNewClient from "./pages/AddNewClient/AddNewClient";

const Clients = React.lazy(() => import("./pages/Clients/Clients"))
// import Clients from "./pages/Clients/Clients";

const Notification = React.lazy(() => import("./pages/Notification/Notification"))
// import Notification from "./pages/Notification/Notification";


const Due = React.lazy(() => import("./pages/Due/Due.jsx"))
// import Due from "./pages/Due/Due.jsx";

const App = () => {
  const { isLogin, setIsLogin } = useStore();



  // Check for login admin or not on page load
  useEffect(() => {
    if (isLogin === null) {
      const checkLogin = async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/auth/login-check`, { withCredentials: true })
          if (response.data.success === true) {
            setIsLogin(true)
          }
        } catch (error) {
          console.log(error)
          setIsLogin(false)
        }
      }
      checkLogin()
    } else {
      return
    }
  }, [setIsLogin, isLogin]);
  const router = createBrowserRouter([
    { path: "/", element: isLogin ? <Navigate to="/dashboard" /> : <Login /> },
    { path: "/dashboard", element: isLogin ? <Suspense fallback={<p>Loading...</p>}><Dashboard /></Suspense> : <Navigate to="/" /> },
    { path: "/dashboard/add-client", element: isLogin ? <Suspense fallback={<p>Loading...</p>}><AddNewClient /> </Suspense> : <Navigate to="/" /> },
    { path: "/dashboard/all-clients", element: isLogin ? <Suspense fallback={<p>Loading...</p>}><Clients /></Suspense> : <Navigate to="/" /> },
    {
      path: "/dashboard/notification", element: isLogin ? <Suspense fallback={<p>Loading...</p>}><Notification /> </Suspense> : <Navigate to="/" />
    },
    { path: "/dashboard/due", element: isLogin ? <Suspense fallback={<p>Loading...</p>}><Due /> </Suspense> : <Navigate to="/" /> },

  ])
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-center' />
    </>
  )
}

export default App