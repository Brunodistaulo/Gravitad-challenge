import { useState } from 'react'
import { register } from '../../helpers/users'
import Swal from 'sweetalert2'

const RegisterView = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
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
      if (inputs.name === "" || inputs.email === "" || inputs.password === "") {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Todos los campos son obligatorios',
          confirmButtonColor: "#000000"
        })
        return
      }
      const data = await register(inputs.name, inputs.email, inputs.password)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado',
          text: 'Gracias por registrarte, inicia sesión',
          confirmButtonColor: "#000000",
          timer: 3000
        }).then(() => {
          window.location.href = "/login"
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex justify-center pt-20'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-1/2 mx-auto bg-white rounded-xl'>
        <h1 className='text-2xl uppercase text-center font-medium py-2'>Registrate</h1>
        <p className='w-[70%] mx-auto text-center text-gray-500 text-sm'>Ya tienes una cuenta? Inicia <a className='text-blue-600' href="/login">aquí</a></p>
        <div className='flex flex-col mx-auto w-[70%] gap-3'>
          <label className='text-left text-xl font-semibold'>Nombre:</label>
          <input type="text" name='name' className='border rounded h-9 placeholder:text-gray-400 placeholder:italic focus:outline-none placeholder:font-medium pl-2' onChange={handleChange} value={inputs.name} placeholder='John Doe' />
        </div>
        <div className='flex flex-col mx-auto w-[70%] gap-3'>
          <label className='text-left text-xl font-semibold'>Correo:</label>
          <input type="email" name='email' className='border rounded h-9 placeholder:text-gray-400 placeholder:italic focus:outline-none placeholder:font-medium pl-2' onChange={handleChange} value={inputs.email} placeholder='example@example.com' />
        </div>
        <div className='flex flex-col mx-auto w-[70%] gap-3'>
          <label className='text-left text-xl font-semibold'>Contraseña:</label>
          <input type="password" name='password' className='border rounded h-9 placeholder:text-gray-400 placeholder:italic focus:outline-none placeholder:font-medium pl-2' onChange={handleChange} value={inputs.password} placeholder='********' />
        </div>
        <button className='bg-black hover:scale-105 transition-all duration-300 ease-in-out text-white px-4 mx-auto my-4 py-2 rounded' type="submit">Registrarse</button>
      </form>
    </div>
  )
}

export default RegisterView