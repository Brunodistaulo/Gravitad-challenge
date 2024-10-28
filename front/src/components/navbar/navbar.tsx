import { jwtDecode } from "jwt-decode";
import BotonLink from "../buttonLink/button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const checkTokenChange = setInterval(() => {
      const newToken = localStorage.getItem("token");
      if (newToken !== token) {
        setToken(newToken || "");
      }
    }, 500);

    return () => clearInterval(checkTokenChange);
  }, [token]);

  useEffect(() => {
    const checkAdmin = async () => {
      if(token){
        const { isAdmin }: any = jwtDecode(token);
        setIsAdmin(isAdmin);
      }else setIsAdmin(false);
    }
    checkAdmin()
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    window.location.reload();
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-10">
      <nav className="flex sticky h-14 w-full justify-between px-24">
        <div className="h-full flex items-center justify-center">
          <a href="/">Logo</a>
        </div>
        <ul className="flex text-lg h-full items-center justify-center gap-16">
          <BotonLink link="/" text="Inicio" />
          {!token ? (
            <BotonLink link="/login" text="Ingresar" />
          ) : (
            <>
              {
                isAdmin === true ? (
                  <>
                    <BotonLink link="/create" text="Crear película" />
                    <BotonLink link="#" text="Cerrar sesión" callback={handleLogout} />
                  </>
                ) : (
                  <BotonLink link="#" text="Cerrar sesión" callback={handleLogout} />
                )
              }
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
