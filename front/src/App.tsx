import Home from "./view/home"
import {Login} from "./view/login"
import {Register} from "./view/register"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar/navbar"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App