import { Email, Keyboard } from "@mui/icons-material";
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
import { useAuthContext } from "contexts/AuthContext";
import { useFormik } from "formik";
import { setCookie } from "pages/helper/browser";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "./loginValidationSchema";

const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser } = useAuthContext();
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
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit,
    });

    async function onSubmit(values) {
        const response = await fetch(`/api/v1/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const body = await response.json();
        if (response.ok) {
            setCookie("token", body.token, 30);
            setUser(body.user);
            navigate("/");
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
                <Typography variant="h5">Login</Typography>
                <FormGroup sx={{ gap: 2 }} className="w-100">
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
                    Login
                </Button>

                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography>Don't have account?</Typography>
                    <Button
                        color={"primary"}
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default LoginPage;
