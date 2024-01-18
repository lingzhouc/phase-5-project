import { useState } from "react";
import { Formik, Form, Field, ErrorMessage} from "formik";
import { Button, TextField, FormControlLabel, Checkbox, Link, Typography } from "@mui/material";
import * as Yup from "yup";
import "../../styling/auth.css"

function LogInForm() {
    const [showPassword, setShowPassword] = useState(false);
  
    const initialValues = {
        email: "",
        password: "",
    };
  
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
    });
  
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
  
    const onSubmit = (values) => {
        // handle login logic
        console.log("Login form submitted with values:", values);
    };
  
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, handleChange, handleBlur, setFieldValue, setFieldTouched }) => (
                <Form className="login-form">
                    <Typography variant="h6" align="center">Login</Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        id="email"
                        name="email"
                        margin="normal"
                        autoComplete="off"
                        value={values.email}
                        onChange={(e) => {
                            handleChange(e);
                            setFieldValue("email", e.target.value);
                            setFieldTouched("email", true, false);
                        }}
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
                        Login
                    </Button>
        
                    <Typography variant="body2" align="center" style={{ marginTop: "10px" }}>
                        Don't have an account?{" "}
                        <Link href="/signup" underline="hover">
                            Sign Up
                        </Link>
                    </Typography>
                </Form>
            )}
        </Formik>
    );
  }

  export default LogInForm;