import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

function LogInForm() {

    const loginSchema = Yup.object({
        emailOrUser: Yup.string().required("Email or username required"),
        password: Yup.string().required("Password is required")
    });

    const formik = useFormik({
        initialValues: {
            emailOrUser: "",
            password: "",
        },
        // validation schema
        validationSchema: loginSchema,
        // form submission logic
        onSubmit: (values) => {
            // form submission logic
            console.log("form submitted with these values:", values)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="emailOrUser">Email or Username</label>
                <input 
                />
            </div>
        </form>
    )
}

export default LogInForm