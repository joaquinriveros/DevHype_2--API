import { Route, Routes } from "react-router-dom"
import { Empresa } from "../components/screens/Empresa/Empresa"
import { Alergenos } from "../components/screens/Alergenos/Alergenos"
import { Categorias } from "../components/screens/Categorias/Categorias"
import { Productos } from "../components/screens/Productos/Productos"
import { Home } from "../components/screens/Home/Home"
import { ErrorPage } from "../components/ui/ErrorPage/ErrorPage"
import { Suspense } from "react"


export const AppRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/empresa/:empresaId" element={<Empresa />} />
      
        <Route path="/empresa/:empresaId/sucursal/:sucursalId/alergenos" element={<Alergenos />} />
        <Route path="/empresa/:empresaId/sucursal/:sucursalId/categorias" element={<Categorias />} />
        <Route path="/empresa/:empresaId/sucursal/:sucursalId/productos" element={<Productos />} />
      
        <Route path="*" element={<ErrorPage mesaje="Pagina no encontrada!" />} />
      </Routes>
    </Suspense>
  )
}
