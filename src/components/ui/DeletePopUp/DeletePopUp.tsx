import { FC } from "react";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import styles from "./DeletePopUp.module.css";
import { ProductoService } from "../../../services/ProductoService";

interface IDeletePopUpProps {
  onClose: () => void; // Prop para cerrar el formulario
  producto: IProductos;
}

export const DeletePopUp: FC<IDeletePopUpProps> = ({ onClose, producto }) => {
  const productoService = new ProductoService();

  const handleSubmit = async () => {
    try {
      // Llamada al servicio para eliminar el producto
      await productoService.deleteProducto(producto.id);
      console.log(`Producto ${producto.denominacion} eliminado correctamente`);
      // Cierra el popup después de eliminar
      onClose();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className={styles.Sucursalview__container}>
      <h3 style={{textAlign: 'center'}}>¿Quieres eliminar este producto?</h3>
      <p style={{fontSize: '2rem'}}><b>{producto.denominacion}</b></p>
      <div className={styles.buttonGroup}>
        <button
          className='add__button'
          type="button"
          onClick={handleSubmit}
        >
          Eliminar
        </button>
        <button
          className='add__button-green'
          type="button"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
