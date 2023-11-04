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

export const EditBookDrawer = ({ book, open, onClose, onComplete }) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setErrors,
        resetForm,
        setFieldValue,
    } = useFormik({
        initialValues: { ...book, image: "" } || {
            title: "",
            author: "",
            genre: "",
            description: "",
            isbn: "",
            published: "",
            publisher: "",
            image: "",
        },
        validationSchema: editBookSchema,
        onSubmit,
        enableReinitialize: true,
    });

    async function onSubmit(values) {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        formData.append("_method", "PUT");
        const response = await fetch(`/api/v1/books/${book.id}`, {
            method: "POST",
            body: formData,
        });
        const body = await response.json();
        if (response.ok) {
            onComplete?.();
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
        { name: "image", label: "Image", type: "file" },
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
                                    type={form.type ?? "text"}
                                    value={values?.[form.name]}
                                    onChange={
                                        form.type === "file"
                                            ? (event) => {
                                                  setFieldValue(
                                                      "file",
                                                      event.currentTarget
                                                          .files[0]
                                                  );
                                              }
                                            : handleChange
                                    }
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
