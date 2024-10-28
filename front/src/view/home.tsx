import { useEffect, useState } from "react";
import { getMovies, deleteMovie, editMovie } from "../helpers/movies";
import { IMovies } from "../interfaces/movies";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMovieId, setEditingMovieId] = useState<string | null>(null);
  const [editedMovie, setEditedMovie] = useState<Partial<IMovies>>({});
  const [isAdmin, setIsAdmin] = useState(false);

  // console.log(isAdmin)


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { isAdmin }: any = jwtDecode(token);
      setIsAdmin(isAdmin);
    }
  }, []);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error al cargar películas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMovie({
      ...editedMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await editMovie(id, editedMovie);
      Swal.fire("Guardado", "Película actualizada correctamente", "success");
      setEditingMovieId(null);
      const updatedMovies = await getMovies();
      setMovies(updatedMovies);
    } catch (error) {
      console.error("Error al actualizar película", error);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta película se eliminará permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "gray",
      cancelButtonColor: "black",
    });

    if (result.isConfirmed) {
      try {
        await deleteMovie(id);
        Swal.fire({
          icon: "success",
          title: "Eliminada",
          text: "Película eliminada correctamente",
        });
        setMovies(movies.filter((movie) => movie._id !== id));
      } catch (error) {
        console.error("Error al eliminar película", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un problema al eliminar la película.",
        });
      }
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center text-2xl font-semibold h-screen">Cargando películas...</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className="flex justify-center items-center text-2xl font-semibold h-screen">No hay peliculas para mostrar</div>;
  }

  return (
    <div className="w-full rounded-lg py-10 px-20">
      <div className="flex flex-wrap justify-center gap-10">
        {movies.map((movie: IMovies) => (
          <div key={movie._id} className="w-64 h-96 bg-white rounded-lg shadow-md">
            {editingMovieId === movie._id ? (
              <div className="p-4">
                <label className="block mb-2 font-medium">Titulo:</label>
                <input
                  type="text"
                  name="title"
                  value={editedMovie.title || movie.title}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-1 border rounded"
                />
                <label className="block mb-2 font-medium">Año:</label>
                <input
                  type="text"
                  name="year"
                  value={editedMovie.year || movie.year}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-1 border rounded"
                />
                <label className="block mb-2 font-medium">Imagen Url:</label>
                <input
                  type="text"
                  name="poster"
                  value={editedMovie.poster}
                  onChange={handleEditChange}
                  className="w-full mb-2 p-1 border rounded"
                />
                <button
                  onClick={() => handleSaveEdit(movie._id!)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="flex flex-col justify-between p-4 h-48">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-base text-gray-500">{movie.year}</p>
                  {isAdmin && (
                    <div className="flex gap-5 mt-2">
                      <button onClick={() => setEditingMovieId(movie._id!)} className="bg-blue-400 rounded p-1">
                        <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 22H8M20 22H12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M13.8881 3.66293L14.6296 2.92142C15.8581 1.69286 17.85 1.69286 19.0786 2.92142C20.3071 4.14999 20.3071 6.14188 19.0786 7.37044L18.3371 8.11195M13.8881 3.66293C13.8881 3.66293 13.9807 5.23862 15.3711 6.62894C16.7614 8.01926 18.3371 8.11195 18.3371 8.11195M13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417M18.3371 8.11195L14.9286 11.5204M11.5201 14.9289C11.0584 15.3907 10.8275 15.6215 10.5729 15.8201C10.2727 16.0543 9.94775 16.2551 9.60398 16.4189C9.31256 16.5578 9.00282 16.6611 8.38334 16.8675L5.75834 17.7426M5.75834 17.7426L5.11667 17.9564C4.81182 18.0581 4.47573 17.9787 4.2485 17.7515C4.02128 17.5243 3.94194 17.1882 4.04356 16.8833L4.25745 16.2417M5.75834 17.7426L4.25745 16.2417" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                      </button>
                      <button onClick={() => handleDelete(movie._id!)} className="bg-red-500 p-1 rounded">
                        <svg width="26px" height="26px" viewBox="-1.44 -1.44 26.88 26.88" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.24000000000000005"></g><g id="SVGRepo_iconCarrier"> <path d="M20.5001 6H3.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M9.5 11L10 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M14.5 11L14 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#1C274C" strokeWidth="1.5"></path> <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
