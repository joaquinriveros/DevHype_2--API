import { FC, useState } from 'react';
import { IProductos } from '../../../types/dtos/productos/IProductos';
import styles from './ProductoView.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

interface IFormViewProductoProps {
  onClose: () => void; // Prop para cerrar el formulario
  producto: IProductos;
}
export const ProductoView:FC<IFormViewProductoProps> = ({
  onClose,
  producto,
}) => {
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const image:string = (producto.imagenes.length > 0 ? producto.imagenes[0].url:"");

  console.log(image)

  return (
    <div className={styles.Sucursalview__container}>
      <h3> {producto.denominacion}</h3>
      <div className={styles.Sucursalview__infoContainer}>
        <p className={styles.Sucursalview__txtCategory}>
          <b>Categoria:</b>
        </p>
        <p className={styles.Sucursalview__txtInfo}>{producto.categoria.denominacion}</p>
        <p className={styles.Sucursalview__txtCategory}>
          <b>Codigo:</b>
        </p>
        <p className={styles.Sucursalview__txtInfo}>{producto.codigo}</p>
        <p className={styles.Sucursalview__txtCategory}>
          <b>Habilitado</b>
        </p>
        <p className={styles.Sucursalview__txtInfo}>
          {producto.habilitado ? "Está habilitado": "No está habilitado"}
        </p>
        <p className={styles.Sucursalview__txtCategory}>
          <b>Descripcion: </b>
        </p>
        <p className={styles.Sucursalview__txtInfo}>
          {producto.descripcion}
        </p>
        <p className={styles.Sucursalview__txtCategory}>
          <b>Alergenos: </b>
        </p>
        <p className={styles.Sucursalview__txtInfo}>
          {producto.alergenos.length > 0 ?producto.alergenos.map((al)=>`${al.denominacion}, `): 'No contiene Alergenos '}
        </p>
        <div className={styles.Sucursalview__img}>
        {isImageError || !image ? (
        <FontAwesomeIcon icon={faImage} style={{ fontSize: "4rem" }} />
      ) : (
        <img
          src={image}
          style={{
            width: "100%",
            height: "8rem",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
          alt="Empresa img"
          onError={() => setIsImageError(true)} // Si hay un error, activa el estado
        />
      )}
        </div>
      </div>
      <button className="add__button" onClick={onClose}>
        Cerrar
      </button>
    </div>
    
  );
};





