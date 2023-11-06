import {
    Box,
    Container,
    Paper,
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import packtImage from "assets/images/packt.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookInfo = () => {
    const [book, setBook] = useState(null);
    const { bookId } = useParams();

    useEffect(() => {
        fetch(`/api/v1/books/${bookId}`)
            .then((resp) => resp.json())
            .then((resp) => {
                setBook(resp.data);
            })
            .catch((error) => console.log(error));

        return () => {};
    }, [bookId]);

    return (
        <Stack>
            <Container className="py-5">
                <Box className="row">
                    <Box className="col-md-5 mb-3">
                        <Stack
                            minHeight={400}
                            height={"100%"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            className="bg-body-secondary"
                        >
                            <img
                                className="rounded"
                                src={book?.image ?? packtImage}
                                onError={(e) => (e.target.src = packtImage)}
                                alt="sample"
                                style={{
                                    width: 200,
                                    height: 260,
                                    objectFit: "contain",
                                }}
                            />
                        </Stack>
                    </Box>
                    <Box className="col-md-7 mb-3">
                        <Stack minHeight={400} className="bg-body-secondary">
                            {book && (
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        {Object.keys(book)
                                            .filter(
                                                (key) =>
                                                    ![
                                                        "id",
                                                        "image",
                                                        "created_at",
                                                        "updated_at",
                                                    ].includes(key)
                                            )
                                            .map((key, index) => (
                                                <TableRow key={index}>
                                                    <TableCell
                                                        variant="head"
                                                        sx={{ minWidth: 200 }}
                                                        className="bg-secondary"
                                                    >
                                                        <Typography
                                                            fontWeight={"bold"}
                                                            fontSize={16}
                                                            className="text-light"
                                                        >
                                                            {key.toUpperCase()}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        {book[key]}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </Table>
                                </TableContainer>
                            )}
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Stack>
    );
};

export default BookInfo;
