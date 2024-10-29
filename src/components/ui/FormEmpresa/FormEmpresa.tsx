import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import styles from './FormEmprese.module.css'

interface FormEmpresaProps {
    onClose: () => void; // Prop para cerrar el formulario
}

export const FormEmpresa: React.FC<FormEmpresaProps> = ({ onClose }) => {
    const [validated, setValidated] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null); // Estado para almacenar la imagen seleccionada
    const [imageUrl, setImageUrl] = useState<string | null>(null); // Estado para almacenar la URL de la imagen

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Obtiene el primer archivo
        if (file) {
            setImage(file); // Actualiza el estado con el archivo seleccionado
            const url = URL.createObjectURL(file); // Crea una URL de objeto para la miniatura
            setImageUrl(url); // Actualiza el estado con la URL de la imagen
        }
    };

    return (
        <div className={styles.formContainer}>
            <h3>Crear una empresa</h3>
            <Form className={styles.Formulario} noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="nombre"
                            defaultValue=""
                        />
                        <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label>Razón social</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Razon social"
                            defaultValue=""
                        />
                        <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label>CUIT</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="CUIT"
                            defaultValue=""
                        />
                        <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="imageUpload">
                        <Form.Label>Seleccionar Imagen</Form.Label>
                        <Form.Control
                            required
                            type="file"
                            accept="image/*" // Acepta solo imágenes
                            onChange={handleImageChange} // Maneja el cambio en el input
                        />
                        <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                {imageUrl && (
                    <Row className="mb-3">
                        <Col md="12">
                            <h5>Vista previa:</h5>
                            <img 
                                src={imageUrl} 
                                alt="Miniatura" 
                                style={{ maxWidth: '100%', height: 'auto' }} 
                            />
                        </Col>
                    </Row>
                )}
                <div className={styles.buttonContainer}>
                <Button variant="outline-success" type="submit">Crear</Button>
                <Button variant="outline-danger" onClick={onClose} className="ms-2">Cerrar</Button>
                </div>
            </Form>
        </div>
    );
};

export default FormEmpresa;
