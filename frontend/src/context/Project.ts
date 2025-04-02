
import { createContext } from 'react';

export interface useProjetId{

    projectId: number;
    setProjectId: (id: number) => void;
  }
  


export const ProjectContext = createContext<useProjetId | null>(null);
