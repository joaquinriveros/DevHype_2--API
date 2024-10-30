import { Route, Routes } from "react-router-dom"
import { Empresa } from "../components/screens/Empresa/Empresa"
import { Alergenos } from "../components/screens/Alergenos/Alergenos"
import { Categorias } from "../components/screens/Categorias/Categorias"
import { Productos } from "../components/screens/Productos/Productos"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Empresa />} />
      
      <Route path="/alergenos/:id" element={<Alergenos />} />
      <Route path="/categorias/:id" element={<Categorias />} />
      <Route path="/productos/:id" element={<Productos />} />
    </Routes>
  )
}
