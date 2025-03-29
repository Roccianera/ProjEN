
import { Card, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import styled from '@emotion/styled'
import { ProjectData } from '../../type'




const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  minWidth: 300, // Per evitare che sia troppo piccolo
  textAlign: 'center', // Per allineare il testo
}));







function ProjectCard({ name, taskLeft }:ProjectData) {

    const theme = useTheme();
  return (
   <StyledCard>
    <Typography variant="h4" gutterBottom color={theme.palette.text.primary}>
        {name}
    </Typography>
    <Typography variant="body1" color={theme.palette.text.secondary}>
        {taskLeft} tasks left
    </Typography>
    </StyledCard>
  )
}

export default ProjectCard
