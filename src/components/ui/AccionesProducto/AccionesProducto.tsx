import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AccionesProducto = () => {
  return (
    <div style={{display: 'flex', justifyContent: "center", alignItems: 'center', gap: '.5rem'}}>
      <button className="boxStyle__icon">
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button className="boxStyle__icon">
        <FontAwesomeIcon icon={faEye} />
      </button>
      <button className="boxStyle__iconRed">
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
};
