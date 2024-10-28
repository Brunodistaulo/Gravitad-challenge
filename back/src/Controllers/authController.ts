import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../Services/userService";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        res.status(200).send(user);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await registerUser({ name, email, password });
        res.status(201).json(newUser);
    } catch (error: any) {
        next(error);
    }
}