export interface ProjectData {
    name: string;
    taskLeft: number;
  }
export  interface Task {
    id: number;
    title: string;
    description: string;
    isCompleted:boolean;
    endDate: string;
    startDate:string;
  }
  
export  interface ProjectDetails {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    categories: Category;
    tasks: Task[];
    isCompleted: boolean;
  }

export interface Category{
    id: number;
    name: string;
    tasks: Task[];

}
