import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Button, TextField, FormControlLabel, Checkbox, Link, Typography } from "@mui/material";
import * as Yup from "yup";
import "../../styling/auth.css";

function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        name: "",
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        username: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (values) => {
        // handle signup logic
        console.log("Signup form submitted with values:", values);
    };

    return (
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        >
        {({ values, handleChange, handleBlur }) => (
            <Form className="signup-form">
            <Typography variant="h6" align="center">Sign Up</Typography>

            <TextField
                fullWidth
                label="Name"
                variant="outlined"
                id="name"
                name="name"
                margin="normal"
                autoComplete="off"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <ErrorMessage name="name">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>

            <TextField
                fullWidth
                label="Username"
                variant="outlined"
                id="username"
                name="username"
                margin="normal"
                autoComplete="off"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <ErrorMessage name="username">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>

            <TextField
                fullWidth
                label="Email"
                variant="outlined"
                id="email"
                name="email"
                margin="normal"
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <ErrorMessage name="email">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>

            <TextField
                fullWidth
                label="Password"
                variant="outlined"
                id="password"
                name="password"
                margin="normal"
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <FormControlLabel
                control={
                <Checkbox
                    id="showPassword"
                    name="showPassword"
                    onChange={handleTogglePassword}
                    color="primary"
                />
                }
                label="Show Password"
            />
            <ErrorMessage name="password">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
            </Button>

            <Typography variant="body2" align="center" style={{ marginTop: "10px" }}>
                Already have an account?{" "}
                <Link href="/login" underline="hover">
                    Log In
                </Link>
            </Typography>
            </Form>
        )}
        </Formik>
    );
}

export default SignUpForm;