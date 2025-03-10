import React from 'react'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader } from 'lucide-react'
import Navbar from './components/Navbar'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import SettingPage from './Pages/SettingPage'
import HomePage from './Pages/HomePage'
import Profile from './Pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'
const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()

  // console.log({ onlineUsers });

  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // console.log(theme)
  // console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <Profile /> : <LoginPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App