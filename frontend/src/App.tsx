
import './App.css'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import NavBar from './Layout/NavBar'
import ProjectPage from './pages/ProjectPage'



function App() {

  return (
    <>

      <NavBar/>
      <Routes>
        <Route path="*" element={<NotFoundPage/>} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>


    </>
  )
}

export default App
