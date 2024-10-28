import { IRegister } from "../dto/registerDto";
import { Users } from "../Models/Users"
import jwt from 'jsonwebtoken';

export const loginUser = async (email: string, password: string) => {
    const userExists = await Users.findOne({ email })

    if (!userExists) throw new Error("Usuario no encontrado")
    if (userExists.password !== password) throw new Error("Contraseña incorrecta")

    const token = jwt.sign({ email: userExists.email, id: userExists._id, isAdmin: userExists.isAdmin }, 'test', { expiresIn: '1h' })

    return {message: "Login correcto", token}
}

export const registerUser = async (UserData: IRegister) => {
    const userExists = await Users.findOne({ email: UserData.email })
    if (userExists) throw new Error("El usuario ya existe")
    console.log(UserData)
    const newUser = await Users.create({ ...UserData })
    const saveUser = await newUser.save()

    return { message: "usuario creado", saveUser }
}

