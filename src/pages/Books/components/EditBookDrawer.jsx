import {
    Box,
    Button,
    FormControl,
    FormGroup,
    FormHelperText,
    FormLabel,
    OutlinedInput,
    Stack,
    SwipeableDrawer,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { editBookSchema } from "../schemas/editBookSchema";

export const EditBookDrawer = ({ book, open, onClose }) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setErrors,
        resetForm,
    } = useFormik({
        initialValues: book || {
            title: "",
            author: "",
            genre: "",
            description: "",
            isbn: "",
            published: "",
            publisher: "",
        },
        validationSchema: editBookSchema,
        onSubmit,
        enableReinitialize: true,
    });

    async function onSubmit(values) {
        const response = await fetch(`/api/v1/books/${book.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const body = await response.json();
        if (response.ok) {
            closeDrawer();
        } else {
            setErrors(body.errors);
        }
    }

    const formContent = [
        { name: "title", label: "Title" },
        { name: "author", label: "Author" },
        { name: "genre", label: "Genre" },
        { name: "description", label: "Description", multi: true },
        { name: "isbn", label: "ISBN" },
        { name: "publisher", label: "Publisher" },
        { name: "published", label: "Published Date" },
    ];

    function closeDrawer() {
        resetForm();
        onClose?.();
    }

    return (
        <SwipeableDrawer anchor="right" open={open} onClose={closeDrawer}>
            <Stack width={300} className="vh-100">
                <Stack className="p-3 border-bottom bg-body-secondary">
                    <Typography fontWeight={"bold"}>Edit Book</Typography>
                </Stack>
                <Stack className="h-100 p-3 overflow-auto">
                    <FormGroup className="gap-2">
                        {formContent.map((form, index) => (
                            <FormControl
                                key={index}
                                error={
                                    touched?.[form.name] && errors?.[form.name]
                                        ? true
                                        : false
                                }
                                size="small"
                            >
                                <FormLabel>{form.label}</FormLabel>
                                <OutlinedInput
                                    name={form.name}
                                    value={values?.[form.name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    multiline={form.multi}
                                    minRows={form.multi ? 4 : 1}
                                    placeholder={`Enter ${form.label}`}
                                />
                                <FormHelperText>
                                    {touched?.[form.name]
                                        ? errors?.[form.name]
                                        : ""}
                                </FormHelperText>
                            </FormControl>
                        ))}
                    </FormGroup>
                </Stack>
                <Box className="p-3 border-top d-flex gap-2">
                    <Button
                        variant="contained"
                        color="error"
                        className="col-6"
                        onClick={closeDrawer}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        className="col-6"
                    >
                        Save
                    </Button>
                </Box>
            </Stack>
        </SwipeableDrawer>
    );
};
