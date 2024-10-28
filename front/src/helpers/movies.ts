import axios from "axios";
import { IMovies } from "../interfaces/movies";

export const getMovies = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/movies`)
        const data = await res.data
        return data
    } catch (error: any) {
        throw new Error(error);
    }
}


export const editMovie = async (id: string, body: Partial<IMovies>) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/movies/edit/${id}`, body)
        const data = await res.data
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}


export const createMovie = async (body: IMovies) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/movies/create`, body)
        const data = await res.data
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteMovie = async (id: string) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/movies/delete/${id}`)
        const data = await res.data
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}