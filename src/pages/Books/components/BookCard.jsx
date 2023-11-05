import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import packtImage from "assets/images/packt.png";
import { useAuthContext } from "contexts/AuthContext";
import moment from "moment/moment";

export const BookCard = ({ book, onEditClick, onDeleteClick }) => {
    const { user } = useAuthContext();

    return (
        <Box className="col-md-6 col-lg-4 px-3" sx={{ paddingTop: 10 }}>
            <Box className="h-100 border rounded p-3" role="button">
                <Stack
                    sx={{
                        zIndex: 100,
                        height: "100%",
                    }}
                >
                    <Stack direction={"row"}>
                        <img
                            className="rounded"
                            src={book.image ?? packtImage}
                            onError={(e) => (e.target.src = packtImage)}
                            alt="sample"
                            style={{
                                width: 100,
                                height: 130,
                                backgroundColor: "#6c757d",
                                objectFit: "contain",
                                marginTop: -80,
                            }}
                        />
                        {user?.isAdmin ? (
                            <Stack direction={"row"} className="ms-auto">
                                <IconButton onClick={() => onEditClick?.(book)}>
                                    <Edit color="primary" />
                                </IconButton>
                                <IconButton
                                    onClick={() => onDeleteClick?.(book)}
                                >
                                    <Delete color="primary" />
                                </IconButton>
                            </Stack>
                        ) : null}
                    </Stack>
                    <Typography className="text-primary mt-4">
                        {book.title.length > 50
                            ? book.title.substring(0, 50) + "..."
                            : book.title}
                    </Typography>
                    <Typography fontSize={12} flex={1}>
                        {book.description.length > 150
                            ? book.description.substring(0, 150) + "..."
                            : book.description}
                    </Typography>
                    <Typography fontSize={12} className="text-secondary mt-2">
                        {book.author}
                    </Typography>
                    <Box className="d-flex text-small">
                        <Typography fontSize={12}>
                            {moment(book.published).format("MMM YYYY")}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};
