import { Movies } from "../Models/Movies";
import axios from 'axios';

export const preLoadMovies = async () => {
    try {
        const existingMovies = await Movies.find();
        if (existingMovies.length > 0) {
            console.log("Ya existen películas en la base de datos. No se requiere precarga.");
            return;
        }

        const response = await axios.get("http://www.omdbapi.com/?s=movie&type=movie&apikey=226df747");
        const moviesData = response.data.Search;

        const movies = moviesData.map((movie: any) => ({
            title: movie.Title,
            year: parseInt(movie.Year),
            poster: movie.Poster,
        }));

        await Movies.insertMany(movies);
        console.log("Películas precargadas correctamente.");
    } catch (error: any) {
        throw new Error(`Error al precargar películas: ${error.message}`);
    }
};
