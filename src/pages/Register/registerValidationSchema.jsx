import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
    name: Yup.string().min(3).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
});
