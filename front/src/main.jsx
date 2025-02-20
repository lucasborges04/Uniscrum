import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App'
import Home from './routes/Home'
import CadastroUser from './routes/CadastroUser'
import ErrorPage from './routes/ErrorPage'
import AdminDashboard from './routes/AdminDashboard'
import UserDetails from './routes/UserDetails'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cadastroUser',
        element: <CadastroUser />,
      },
      {
        path: '/AdminDashboard',
        element: <AdminDashboard />,
      },
      {
        path: '/usuario/:id',
        element: <UserDetails />,
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
