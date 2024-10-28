import Home from "./view/home"
import {Login} from "./view/login"
import {Register} from "./view/register"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar/navbar"
import FormCreate from "./components/createMovie/createMovie"
import "./App.css"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<FormCreate />} />
      </Routes>
    </div>
  )
}

export default App