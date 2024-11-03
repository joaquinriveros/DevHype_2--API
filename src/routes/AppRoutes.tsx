import { Route, Routes } from "react-router-dom"
import { Empresa } from "../components/screens/Empresa/Empresa"
import { Alergenos } from "../components/screens/Alergenos/Alergenos"
import { Categorias } from "../components/screens/Categorias/Categorias"
import { Productos } from "../components/screens/Productos/Productos"
import { Home } from "../components/screens/Home/Home"
import { ErrorPage } from "../components/ui/ErrorPage/ErrorPage"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/empresa/:cuit" element={<Empresa />} />
      
      <Route path="/alergenos/:id" element={<Alergenos />} />
      <Route path="/categorias/:id" element={<Categorias />} />
      <Route path="/productos/:id" element={<Productos />} />
      
      <Route path="*" element={<ErrorPage mesaje="Pagina no encontrada!" />} />
    </Routes>
  )
}
