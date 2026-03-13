import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Products from './pages/Products.jsx'
import Register from './pages/Register.jsx'
import Add from './pages/Add.jsx'
import Edit from './pages/Edit.jsx'

const routes = createBrowserRouter([
  {
    path : '/' ,
    element : <Auth />,
    children : [
      {
        path : '' ,
        element : <Login />,
      },
      {
        path : 'register' ,
        element : <Register />,
      }
    ]
  },
  {
    path : "/dashboard",
    element : <Dashboard />,
    children : [
      {
        path : "products",
        element : <Products/>,
      },
      {
      path: "products/add",
      element: <Add />
      },
      {
      path: "products/edit/:id",
      element: <Edit />
      }
    ]
  }
],{
  basename : "/Dashboard-project"
}
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
