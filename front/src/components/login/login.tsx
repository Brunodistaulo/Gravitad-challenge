import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../helpers/users'
import Swal from 'sweetalert2'

const LoginView = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Ya iniciaste sesión',
        confirmButtonColor: "#000000",
        timer: 2000
      }).then(() => {
        navigate("/")
      })
    }
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await login(inputs.email, inputs.password)
      const { token } = await res
      localStorage.setItem("token", token)
      if (res) {
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: 'Sesión iniciada',
          confirmButtonColor: "#000000",
          timer: 2000
        }).then(() => {
          navigate("/")
          setInputs({
            email: "",
            password: "",
          })
        })
      }

    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Credenciales incorrectas',
        confirmButtonColor: "#000000"
      }).then(() => {
        setInputs({
          email: "",
          password: "",
        })
      })
    }
  }

  return (
    <div className='flex justify-center pt-20'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-1/2 mx-auto bg-white rounded-xl'>
        <h1 className='text-2xl uppercase text-center font-medium py-2'>Inicia sesión</h1>
        <p className='w-[70%] mx-auto text-center text-gray-500 text-sm'>No tienes cuenta? Crea una <a className='text-blue-600' href="/register">aquí.</a></p>
        <div className='flex flex-col mx-auto w-[70%] gap-3'>
          <label className='text-left text-xl font-semibold'>Correo:</label>
          <input type="email" name="email" id="email" className='border rounded h-9 placeholder:text-gray-400 placeholder:italic focus:outline-none placeholder:font-medium pl-2' placeholder='Example@example.com' onChange={handleChange} value={inputs.email} />
        </div>
        <div className='flex flex-col mx-auto w-[70%] gap-3'>
          <label className='text-left text-xl font-semibold'>Contraseña:</label>
          <input type="password" name="password" id="password" className='border h-9 rounded focus:outline-none pl-2 placeholder:text-gray-400 placeholder:italic placeholder:font-medium' placeholder='********' onChange={handleChange} value={inputs.password} />
        </div>
        <button className='bg-black hover:scale-105 transition-all duration-300 ease-in-out text-white px-4 mx-auto my-4 py-2 rounded' type="submit">Iniciar sesión</button>
      </form>
    </div>
  )
}

export default LoginView