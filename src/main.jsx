import ReactDOM from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Error from './pages/Error'
import MainLayout, { mainAction, mainLoader } from './layouts/MainLayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Logout, { logoutAction } from './pages/Logout'
import Budget, { budgetAction, budgetLoader } from './pages/Budget'
import Expenses from './pages/Expenses'
import React from 'react';


let router = createBrowserRouter([
  {path:'/' , element: <MainLayout/> ,errorElement: <Error/> , action: mainAction , loader: mainLoader , children: 
    [
      {path:'logout' , element: <Logout/> , action: logoutAction },
      {path:':budget' , element: <Budget/> , loader: budgetLoader , action: budgetAction},
      {path:'expenses' , element: <Expenses/> },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer autoClose={3000} />
  </React.StrictMode>
)