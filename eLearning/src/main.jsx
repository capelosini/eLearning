import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import './App.css'
import IndexView from './views/Index'
import LoginView from './views/Login'
import RegisterView from './views/Register'
import HomeView from './views/Home'
import CourseDetailsView from './views/CourseDetails'
import CheckoutView from './views/Checkout'
import AccountView from './views/Account'
import WatchView from './views/Watch'
import CreateView from './views/Create'
import NotFoundView from './views/NotFound'

const router = createBrowserRouter([
  {path: "*", element: <NotFoundView />},
  {path: "/", element: <IndexView />},
  {path: "/login", element: <LoginView />},
  {path: "/register", element: <RegisterView />},
  {path: "/home", element: <HomeView />},
  {path: "/course/:courseId", element: <CourseDetailsView />},
  {path: "/checkout/:courseId", element: <CheckoutView />},
  {path: "/account", element: <AccountView />},
  {path: "/watch/:courseId", element: <WatchView />},
  {path: "/create", element: <CreateView />}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
