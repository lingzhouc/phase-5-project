import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
// import TextField from "@material-ui/core/Textfield";
// import Button from "@material-ui/core/Button";
// import Box from "@material-ui/core/Box";

function LogInForm() {
    const [showPassword, setShowPassword] = useState(false)

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = (values) => {
        // handle login logic
        console.log("Login form submitted with values:", values);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema}>
            <Form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <Field 
                        type={showPassword ? "text" : "password"}
                        id="password" 
                        name="password" 
                    />
                    <input
                        type="checkbox"
                        id="showPassword"
                        name="showPassword"
                        onChange={handleTogglePassword}
                    />
                    <label htmlFor="showPassword">Show Password</label>
                    <ErrorMessage name="password" component="div" />
                </div>

                <button type="submit">Login</button>
            </Form>
        </Formik>
    )
}

export default LogInForm