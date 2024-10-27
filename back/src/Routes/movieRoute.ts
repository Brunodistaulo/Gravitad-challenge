import { Router } from "express";
import { createMovie, deleteMovie, editMovie, getMovies } from "../Controllers/movieController";

const movieRouter = Router();

movieRouter.get("/", getMovies)
movieRouter.post("/create", createMovie)
movieRouter.put("/edit/:id", editMovie)
movieRouter.delete("/delete/:id", deleteMovie)

export default movieRouter