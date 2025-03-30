
import './App.css'
import ProjectCard from './components/ProjectDashboard/ProjectCard'
import LoginPage from './pages/LoginPage'
import { Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import NavBar from './Layout/NavBar'



function App() {

  return (
    <>
      <NavBar />
      <LoginPage />

    </>
  )
}

export default App
