export interface ProjectData {
    name: string;
    taskLeft: number;
  }
export  interface Task {
    id: number;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "completed";
    assignee: string;
    category: string;
    dueDate: string;
  }
  
export  interface ProjectDetails {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    progress: number;
    team: Array<{
      id: number;
      name: string;
      avatar: string;
    }>;
    categories: string[];
    tasks: Task[];
  }
