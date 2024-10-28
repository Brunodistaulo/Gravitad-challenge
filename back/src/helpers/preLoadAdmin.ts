import { Users } from "../Models/Users";

export const preLoadAdmin = async () => {
    try {
        const existingAdmin = await Users.findOne({ isAdmin: true });
        if (existingAdmin) {
            console.log("Ya existe un administrador en la base de datos. No se requiere precarga.");
            return;
        }

        const adminData = {
            name: "Admin",
            email: "admin@example.com",
            password:"admin",
            isAdmin: true,
        };

        await Users.create(adminData);
        console.log("Administrador precargado correctamente.");
    } catch (error: any) {
        throw new Error(`Error al precargar administrador: ${error.message}`);
    }
};
