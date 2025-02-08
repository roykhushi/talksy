import Navbar from './components/Navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";
import { useThemeStore } from './store/useThemeStore'

function App() {
  const {checkAuth, authUser , isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore();
  const location = useLocation();
  useEffect(() => {
    checkAuth();
  },[]);

  console.log(authUser);

  //loading state when the user is being authenticated or refreshing the page
  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  const noNavbarRoutes = ['/signup', '/login'];
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);
  return (
    <div data-theme={theme}>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />}/>
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
        <Route path='/settings' element={authUser ? <SettingsPage /> : <Navigate to="/login" />}/>
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />}/>
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
