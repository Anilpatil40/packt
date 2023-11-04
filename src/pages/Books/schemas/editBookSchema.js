import * as Yup from "yup";

export const editBookSchema = Yup.object({
    title: Yup.string().min(5).required(),
    author: Yup.string().min(3).required(),
    publisher: Yup.string().min(3).required(),
    genre: Yup.string().min(3).required(),
    description: Yup.string().min(10).required(),
    isbn: Yup.string().min(13).max(13).required(),
    published: Yup.date().required(),
});
