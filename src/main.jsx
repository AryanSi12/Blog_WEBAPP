import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import './index.css'

//Import pages
import AboutUs from './components/Aboutus.jsx'
import MyAcc from './components/MyAcc.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Addpost from './pages/Addpost.jsx'
import AllPost from './pages/AllPost.jsx'
import UserPost from './pages/UserPost.jsx'
import EditPages from './pages/EditPages.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children :[{
      path:"/",
      element:<HomePage/>
    },
    {
      path:"/Login",
      element:<LoginPage/>
    },
    {
      path:"/Signup",
      element:<SignupPage/>
    },
    {
      path:"/account",
      element:<MyAcc/>
    },
    {
      path:"/add-post",
      element:<Addpost/>
    },
    {
      path:"/About",
      element:<AboutUs/>
    },
    {
      path:"/all-posts",
      element:<AllPost/>
    },
    {
      path: "/post/:slug",
      element: <UserPost/>
    },
    {
      path: "/edit-post/:slug",
      element: <EditPages/>
    }
  ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>,
)
