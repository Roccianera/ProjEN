export interface ProjectData {
  name: string;
  taskLeft: number;
}
export interface Task {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  endDate: string;
  startDate: string;
  categoryId?: number;
}

export interface ProjectDetails {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  taskCategories: Category[];
  tasks?: Task[];
  isCompleted: boolean;
}

export interface Category {
  id: number;
  name: string;
  tasks: Task[];
}

export interface TaskRequestDto {
  name: string;
  description: string;
  endDate: string;
  taskCategoryId: number;
}

export interface TaskCategoryRequestDto {
  name: string;
  projectId: number;
  tasks?: TaskRequestDto[];
}

export interface ProjectRequestDto {
  name: string;
  description: string;
  endDate: string;
  taskCategories?: TaskCategoryRequestDto[];
}
