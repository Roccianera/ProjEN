import { useParams } from 'react-router-dom'

function ProjectDetailsPage() {


  const project_id= useParams<{ id: string }>().id;
    


  console.log("Project ID:", project_id); 




  return (
    <div>ProjectDetails</div>
  )
}

export default ProjectDetailsPage
