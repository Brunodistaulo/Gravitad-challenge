import { Request, Response } from "express";
import { Movies } from "../Models/Movies";
import { createMovieService, deleteMovieService, editMovieService, getMoviesService } from "../Services/movieService";


export const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await getMoviesService();
        res.status(200).send(movies);
    } catch (error: any) {
        throw new Error(error);
    }
};


export const createMovie = async (req: Request, res: Response) => {
    try {
        const { title, year, poster } = req.body;
        const movie = await createMovieService({title, year, poster});
        res.status(201).send(movie);
    } catch (error: any) {
        throw new Error(error);
    }
}


export const editMovie = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, year, poster } = req.body;
        const movie = await editMovieService(id, { title, year, poster });
        res.status(200).send(movie);
    } catch (error: any) {
        throw new Error(error);
    }
}


export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const movie = await deleteMovieService(id);
        res.status(200).send(movie);
    } catch (error: any) {
        throw new Error(error);
    }
}