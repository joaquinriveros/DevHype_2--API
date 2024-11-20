import { faPen, faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AccionesAlergenoProps {
    onEdit: () => void;
    onView: () => void;
    onDelete: () => void;
}

export const AccionesAlergeno = ({ onEdit, onView, onDelete }: AccionesAlergenoProps) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: ".5rem" }}>
            <button className="boxStyle__icon" onClick={onEdit}>
                <FontAwesomeIcon icon={faPen} />
            </button>
            <button className="boxStyle__icon" onClick={onView}>
                <FontAwesomeIcon icon={faEye} />
            </button>
            <button className="boxStyle__iconRed" onClick={onDelete}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        </div>
    );
};
