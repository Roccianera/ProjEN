import axios from "axios";
import { getToken } from "./AuthService";


const API_URL = "http://localhost:8080/api/v1/projects/"; // TODO: move to env



export const getProjectById = async (projectId: number) => {
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





