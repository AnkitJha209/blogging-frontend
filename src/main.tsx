import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import {Provider} from 'react-redux'
import { store } from './redux/store.ts' 
import { SignUp } from './pages/Signup.tsx'
import { Login } from './pages/Login.tsx'
import { Toaster } from './components/ui/sonner'
import { CreateBlog } from './pages/CreateBlog.tsx'
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route path='' element={<Home/>}/>
    <Route path='signup' element={<SignUp/>}/>
    <Route path='signin' element={<Login/>}/>
    <Route path='blogs' element={<Home/>}/>
    <Route path='blog/myBlogs' element={<Home/>}/>
    <Route path='blog/:id' element={<Home/>}/>
    <Route path='blog/create-blog' element={<CreateBlog/>}/>

  </Route>
))
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
    <Toaster/>
  </Provider>
)
