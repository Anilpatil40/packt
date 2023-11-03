import { Search } from "@mui/icons-material";
import {
    Box,
    Container,
    IconButton,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Pagination,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { BookCard } from "./components/BookCard";
import { FilterBar } from "./components/FilterBar";

const BooksPage = () => {
    const [response, setResponse] = useState({});
    const [options, setOptions] = useState({
        quantity: 12,
        orderBy: "date.asc",
        page: 1,
    });

    useEffect(() => {
        fetch(
            `/api/v1/books?quantity=${options.quantity}&order=${options.orderBy}&page=${options.page}`
        )
            .then((resp) => resp.json())
            .then((resp) => {
                setResponse(resp);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [options]);

    return (
        <Stack>
            <Stack className="border-bottom py-4">
                <Container>
                    <Stack direction={"row"} alignItems={"center"} gap={2}>
                        <OutlinedInput
                            size="small"
                            placeholder="Search"
                            className="rounded-pill"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="search" edge="end">
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            }
                            sx={{ width: "100%", maxWidth: 500 }}
                        />
                        <Select
                            className="ms-auto rounded-pill"
                            size="small"
                            value={options.quantity}
                            onChange={(e) => {
                                setOptions((prev) => ({
                                    ...prev,
                                    quantity: e.target.value,
                                    page: 1,
                                }));
                            }}
                        >
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={24}>24</MenuItem>
                            <MenuItem value={48}>48</MenuItem>
                        </Select>
                        <Select
                            value={options.orderBy}
                            size="small"
                            className="rounded-pill"
                            sx={{ width: 180 }}
                            onChange={(e) => {
                                setOptions((prev) => ({
                                    ...prev,
                                    orderBy: e.target.value,
                                }));
                            }}
                        >
                            <MenuItem value={"most.pop"}>Most Popular</MenuItem>
                            <MenuItem value={"date.asc"}>
                                Date Ascending
                            </MenuItem>
                            <MenuItem value={"date.desc"}>
                                Date Descending
                            </MenuItem>
                        </Select>
                    </Stack>
                </Container>
            </Stack>
            <Stack>
                <Container>
                    <Box className="d-flex">
                        <Stack
                            sx={{ width: 250 }}
                            className="border-end p-2 gap-2"
                        >
                            <Stack direction={"row"}>
                                <Typography>
                                    Filter Results {`(${response?.count})`}
                                </Typography>
                            </Stack>
                            <FilterBar
                                filters={{
                                    Genre: ["genre 1", "genre 2"],
                                    "publication date": ["2022", "2023"],
                                }}
                            />
                        </Stack>
                        <Stack flex={1}>
                            <Box flex={1} className="row p-2">
                                {response?.data?.map((book) => {
                                    return (
                                        <BookCard
                                            title={book.title}
                                            description={book.description}
                                            image={book.image}
                                            author={book.author}
                                            publishedDate={moment(
                                                book.published
                                            ).format("MMM YYYY")}
                                        />
                                    );
                                })}
                            </Box>
                            <Stack className="my-3" alignItems={"center"}>
                                <Pagination
                                    page={options.page}
                                    count={Math.ceil(
                                        response?.count / options.quantity
                                    )}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={(e, page) => {
                                        setOptions((prev) => ({
                                            ...prev,
                                            page: page,
                                        }));
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </Box>
                </Container>
            </Stack>
        </Stack>
    );
};

export default BooksPage;
