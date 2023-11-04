import { AccountCircle, Email, Keyboard } from "@mui/icons-material";
import {
    Box,
    Button,
    FormControl,
    FormGroup,
    FormHelperText,
    FormLabel,
    InputAdornment,
    OutlinedInput,
    Stack,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerValidationSchema } from "./registerValidationSchema";

const RegisterPage = () => {
    const navigate = useNavigate();
    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setErrors,
    } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: registerValidationSchema,
        onSubmit,
    });

    async function onSubmit(values) {
        const response = await fetch(`/api/v1/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const body = await response.json();
        if (response.ok) {
            navigate("/login");
        } else {
            setErrors(body.errors);
        }
    }

    return (
        <Box
            width={"100%"}
            maxWidth={400}
            className="rounded-4 border p-4 mt-4"
        >
            <Stack alignItems={"center"} gap={4}>
                <Typography variant="h5">Register</Typography>
                <FormGroup sx={{ gap: 2 }} className="w-100">
                    <FormControl
                        error={touched.name && errors.name ? true : false}
                    >
                        <FormLabel>Name</FormLabel>
                        <OutlinedInput
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                            placeholder="Enter Name"
                        />
                        <FormHelperText>
                            {touched.name ? errors.name : ""}
                        </FormHelperText>
                    </FormControl>
                    <FormControl
                        error={touched.email && errors.email ? true : false}
                    >
                        <FormLabel>Email</FormLabel>
                        <OutlinedInput
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            }
                            placeholder="Enter Email"
                        />
                        <FormHelperText>
                            {touched.email ? errors.email : ""}
                        </FormHelperText>
                    </FormControl>
                    <FormControl
                        error={
                            touched.password && errors.password ? true : false
                        }
                    >
                        <FormLabel>Password</FormLabel>
                        <OutlinedInput
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                            placeholder="Enter Password"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Keyboard />
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>
                            {touched.password ? errors.password : ""}
                        </FormHelperText>
                    </FormControl>
                </FormGroup>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    className="px-5 py-2"
                >
                    Register
                </Button>

                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography>Already have account?</Typography>
                    <Button
                        color={"primary"}
                        onClick={() => navigate("/login")}
                    >
                        Log In
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default RegisterPage;
