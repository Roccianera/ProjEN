
import { Stack } from '@mui/material'
import React from 'react'
import ProjectCard from '../components/ProjectDashboard/ProjectCard'

function DashboardPage() {
  return (
    <Stack spacing={2} sx={{ padding: 2 }} justifyContent={"center"} alignItems={"center"}>
        <ProjectCard
          name="Project A"
          taskLeft={5}
          totalTasks={10}
          dueDate="2023-12-31"
          priority="high"
        />
        <ProjectCard
          name="Project B"
          taskLeft={2}
          totalTasks={10}
          dueDate="2023-11-30"
          priority="medium"
        />
        <ProjectCard
          name="Project C"
          taskLeft={0}
          totalTasks={10}
          dueDate="2023-10-31"
          priority="low"
        />
    </Stack>
  )
}

export default DashboardPage
