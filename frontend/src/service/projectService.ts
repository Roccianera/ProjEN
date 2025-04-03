import axios from "axios";
import { getToken } from "./AuthService";
import { ProjectDetails } from "../type/type";


const API_URL = "http://localhost:8080/api/projects/"; // TODO: move to env



export const getProjectById = async (projectId: number):Promise<ProjectDetails> => {
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }

    try {
        const response = await axios.get(`${API_URL}${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
}





export const getProjectList = async () => {
    
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }


    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching project list:', error);
        throw error;
    }

}


export const createProject = async (projectData: any) => {
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }

    try {
        const response = await axios.post(API_URL, projectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}



export const updateProject = async (projectId: number, projectData: any) => {
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }

    try {
        const response = await axios.put(`${API_URL}${projectId}`, projectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
}


export const deleteProject = async (projectId: number) => {
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }

    try {
        const response = await axios.delete(`${API_URL}${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}

export const createTaskCategory = async (projectId: number, name: any) => {
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }

    try {
        const response = await axios.post(`${API_URL}${projectId}/categories`, name, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating task category:', error);
        throw error;
    }
}

export const updateTaskCategory = async (projectId: number, categoryId: number, name: string) => {
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }

    try {
        const response = await axios.put(`${API_URL}${projectId}/categories/${categoryId}`, name, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating task category:', error);
        throw error;
    }
}


export const deleteTaskCategory = async (projectId: number, categoryId: number) => {
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }

    try {
        const response = await axios.delete(`${API_URL}${projectId}/categories/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting task category:', error);
        throw error;
    }
}


export const createTask = async (projectId: number, categoryId: number, taskData: any) => {
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }

    try {
        const response = await axios.post(`${API_URL}${projectId}/categories/${categoryId}/tasks`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}



export const updateTask = async (projectId: number, categoryId: number, taskId: number, taskData: any) => {
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }

    try {
        const response = await axios.put(`${API_URL}${projectId}/categories/${categoryId}/tasks/${taskId}`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}



export const deleteTask = async (projectId: number, categoryId: number, taskId: number) => {
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }

    try {
        const response = await axios.delete(`${API_URL}${projectId}/categories/${categoryId}/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}


export const completeTask = async (projectId: number, categoryId: number, taskId: number) => {
    const token = getToken();
    if(!token){
        throw new Error("No token found");
    }

    try {
        const response = await axios.post(`${API_URL}${projectId}/categories/${categoryId}/tasks/${taskId}/complete`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error completing task:', error);
        throw error;
    }
}








