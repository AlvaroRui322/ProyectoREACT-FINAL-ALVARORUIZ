import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../config/firebase";
import Swal from "sweetalert2";
import "../styles/Form.css";

const RegisterForm = () => {
    const navigate = useNavigate();

    const initialValues = { email: "", password: "" };

    // Esquema de validación con Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Correo no válido")
            .required("El correo es obligatorio."),
        password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres.")
            .required("La contraseña es obligatoria."),
    });

    // Función para manejar el envío del formulario
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await register(values);
            Swal.fire("¡Registro exitoso!", "Bienvenido a Pokémon Team Builder", "success");
            resetForm();
            navigate("/profile");
        } catch (error) {
            Swal.fire("Error al registrar", error.message, "error");
        }
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="auth-form-container">
                    <h1>Regístrate</h1>

                    {/* Campo de correo electrónico */}
                    <Field name="email">
                        {({ field }) => (
                            <TextField
                                {...field}
                                label="Correo electrónico"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    </Field>
                    <ErrorMessage name="email" component="div" className="error" />

                    {/* Campo de contraseña */}
                    <Field name="password">
                        {({ field }) => (
                            <TextField
                                {...field}
                                type="password"
                                label="Contraseña"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    </Field>
                    <ErrorMessage name="password" component="div" className="error" />

                    {/* Botón de registro */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                    >
                        Registrarse
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;


