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
        filters: {},
    });
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const filters = {};
        Object.keys(options.filters).map((key) => {
            filters[key] = options.filters[key]
                .map((item) => item.filter)
                .join("~");
            return null;
        });
        const urlParams = {
            quantity: options.quantity,
            order: options.orderBy,
            page: options.page,
            ...filters,
        };
        fetch(`/api/v1/books?${new URLSearchParams(urlParams).toString()}`)
            .then((resp) => resp.json())
            .then((resp) => {
                setResponse(resp);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [options]);

    useEffect(() => {
        fetch(`/api/v1/books/filters`)
            .then((resp) => resp.json())
            .then((resp) => {
                setFilters(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                                <Typography
                                    className="ms-auto"
                                    color={"primary"}
                                    onClick={() =>
                                        setOptions((prev) => ({
                                            ...prev,
                                            filters: {},
                                        }))
                                    }
                                >
                                    Clear
                                </Typography>
                            </Stack>
                            <FilterBar
                                filters={filters}
                                selected={options.filters}
                                onSelect={(value) => {
                                    setOptions((prev) => ({
                                        ...prev,
                                        filters: value,
                                        page: 1,
                                    }));
                                }}
                            />
                        </Stack>
                        <Stack flex={1}>
                            <Box className="row p-2">
                                {response?.data?.map((book, index) => {
                                    return (
                                        <BookCard
                                            key={index}
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
                                    count={
                                        response?.count
                                            ? Math.ceil(
                                                  response?.count /
                                                      options.quantity
                                              )
                                            : 0
                                    }
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
