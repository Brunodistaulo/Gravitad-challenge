import axios from "axios"

export const login = async (email: string, password: string) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/users/login`, {
            email,
            password
        })
        const data = await res.data
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}


export const register = async (name: string, email: string, password: string) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/users/register`, {
            name,
            email,
            password
        })
        const data = await res.data
        console.log(data)
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}