import { useState } from "react"
import { createMovie } from "../../helpers/movies"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
const CreateMovie = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        title: "",
        year: 0,
        poster: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if(inputs.title === "" || inputs.year === 0 || inputs.poster === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Todos los campos son obligatorios',
                    confirmButtonColor: "#000000"
                })
                return
            }
            if(inputs.year < 1888) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El año debe ser mayor o igual a 1888',
                    confirmButtonColor: "#000000"
                })
                return
            }
            await createMovie(inputs)
            .then(() => {
                setInputs({
                    title: "",
                    year: 0,
                    poster: ""
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'Pelicula guardada correctamente',
                    confirmButtonColor: "#000000",
                    timer: 2000
                })
                navigate("/")
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg w-1/2 flex mx-auto mt-20">
            <form className="flex flex-col gap-4 p-4 w-full" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-medium text-center">Crea una nueva pelicula</h1>
                <div className="flex gap-2 flex-col w-2/3 mx-auto">
                    <label className="text-lg font-medium">Titulo:</label>
                    <input type="text" name="title" className="h-9 rounded-lg outline-none bg-gray-100 border placeholder:italic placeholder:text-gray-400 pl-2 text-sm" placeholder="Scary Movie" onChange={handleChange} value={inputs.title} />
                </div>
                <div className="flex gap-2 flex-col w-2/3 mx-auto">
                    <label className="text-lg font-medium">Año:</label>
                    <input type="number" name="year" className="h-9 rounded-lg outline-none bg-gray-100 border placeholder:italic placeholder:text-gray-400 pl-2 text-sm" placeholder="2000" onChange={handleChange} value={inputs.year} />
                </div>
                <div className="flex gap-2 flex-col w-2/3 mx-auto">
                    <label className="text-lg font-medium">Poster Url:</label>
                    <input type="text" name="poster" className="h-9 rounded-lg outline-none bg-gray-100 border placeholder:italic placeholder:text-gray-400 pl-2 text-sm" placeholder="res.cloudinary.com/..." onChange={handleChange} value={inputs.poster} />
                </div>
                <button type="submit" className="bg-black hover:scale-105 transition-all duration-300 ease-in-out text-white font-bold py-2 px-5 rounded mx-auto my-4">Crear</button>
            </form>
        </div>
    )
}

export default CreateMovie