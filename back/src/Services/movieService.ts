import { IMovie } from "../dto/movieDto";
import { Movies } from "../Models/Movies";

export const getMoviesService = async (): Promise<IMovie[]> => {
    const movies = await Movies.find();
    return movies;
}


export const createMovieService = async (data: IMovie) => {
    const movieCreated = await Movies.create(data);

    return movieCreated.save();
}

export const editMovieService = async (id: string, data: Partial<IMovie>): Promise<IMovie> => {
    const movieEdited = await Movies.findByIdAndUpdate(id, data, { new: true });
    if (!movieEdited) throw new Error("Pelicula no encontrada");
    return movieEdited;
}


export const deleteMovieService = async (id: string) => {
    const movieDeleted = await Movies.findByIdAndDelete(id);
    if (!movieDeleted) throw new Error("Pelicula no encontrada");
    return {message: "Pelicula eliminada", movieDeleted};
}