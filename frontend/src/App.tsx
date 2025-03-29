
import './App.css'
import ProjectCard from './components/ProjectDashboard/ProjectCard'
import LoginPage from './pages/LoginPage'
import { Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'



function App() {

  return (
    <>

      <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>

      <ProjectCard name="Project 1" taskLeft={5} />  
      <ProjectCard name="Project 1" taskLeft={5} />     
      <ProjectCard name="Project 1" taskLeft={5} />
      <ProjectCard name="Project 1" taskLeft={5} />     
      <ProjectCard name="Project 1" taskLeft={5} />     
      <ProjectCard name="Project 1" taskLeft={5} />     
      <ProjectCard name="Project 1" taskLeft={5} />     
      <ProjectCard name="Project 1" taskLeft={5} />     
      <ProjectCard name="Project 1" taskLeft={5} />     
      <ProjectCard name="Project 1" taskLeft={5} />     
      <ProjectCard name="Project 1" taskLeft={5} />     
      <ProjectCard name="Project 1" taskLeft={5} />     
      <ProjectCard name="Project 1" taskLeft={5} />     

      </Stack>

    </>
  )
}

export default App
