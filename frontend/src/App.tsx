
import './App.css'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import NavBar from './Layout/NavBar'
import ProjectPage from './pages/ProjectPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import Footer from './Layout/Footer'
import Layout from './Layout/Layout'




function App() {

  return (
    <>
      <Layout>



      <Routes>
        <Route path="*" element={<NotFoundPage/>} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectDetailsPage />} />
      </Routes>


      </Layout>
    </>
  )
}

export default App
