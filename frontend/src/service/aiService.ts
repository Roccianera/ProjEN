
import axios from "axios";
import { ProjectDetails } from "../type/type";

const api="http://localhost:8080/api/public/ai/";






export const generateProject = async (description: string):Promise<ProjectDetails> => {
    try {
        const response = await axios.post(api+"project", { description });
        return response.data;
    } catch (error) {
        console.error('Error generating project name:', error);
        throw error;
    }
}
