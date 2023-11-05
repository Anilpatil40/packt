import { Add } from "@mui/icons-material";
import {
    Box,
    Container,
    Fab,
    MenuItem,
    Pagination,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import { SearchAutoComplete } from "components/inputs/SearchAutoComplete";
import { useAuthContext } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { BookCard } from "./components/BookCard";
import { DeleteBookDrawer } from "./components/DeleteBookDrawer";
import { EditBookDrawer } from "./components/EditBookDrawer";
import { FilterBar } from "./components/FilterBar";
import { NewBookDrawer } from "./components/NewBookDrawer";

const BooksPage = () => {
    const { user } = useAuthContext();
    const [response, setResponse] = useState({});
    const [options, setOptions] = useState({
        quantity: 12,
        orderBy: "date.asc",
        page: 1,
        search: "",
        filters: {},
    });
    const [filters, setFilters] = useState({});
    const [isNewBookDrawerOpen, setIsNewBookDrawerOpen] = useState(false);
    const [bookToEdit, setBookToEdit] = useState(null);
    const [bookToDelete, setBookToDelete] = useState(null);

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
            search: options.search,
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
                        <SearchAutoComplete
                            sx={{ width: "100%", maxWidth: 500 }}
                            onOptionSelect={(option) => {
                                setOptions((prev) => ({
                                    ...prev,
                                    search: option,
                                    page: 1,
                                }));
                            }}
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
                            <Stack direction={"row"}>
                                {user?.isAdmin ? (
                                    <Fab
                                        sx={{
                                            marginTop: -2.5,
                                        }}
                                        size="small"
                                        color="primary"
                                        className="ms-auto"
                                        onClick={() =>
                                            setIsNewBookDrawerOpen(true)
                                        }
                                    >
                                        <Add />
                                    </Fab>
                                ) : null}
                            </Stack>
                            {response?.data?.length === 0 && (
                                <Stack
                                    fontSize={24}
                                    alignItems={"center"}
                                    className="p-5"
                                >
                                    No Data Found
                                </Stack>
                            )}
                            {response?.data && (
                                <Box className="row p-2">
                                    {response?.data?.map((book, index) => {
                                        return (
                                            <BookCard
                                                key={index}
                                                book={book}
                                                onEditClick={(book) => {
                                                    setBookToEdit(book);
                                                }}
                                                onDeleteClick={(book) => {
                                                    setBookToDelete(book);
                                                }}
                                            />
                                        );
                                    })}
                                </Box>
                            )}
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
                            <NewBookDrawer
                                onClose={() => setIsNewBookDrawerOpen(false)}
                                open={isNewBookDrawerOpen}
                                onComplete={() =>
                                    setOptions((pre) => ({ ...pre }))
                                }
                            />
                            <EditBookDrawer
                                book={bookToEdit}
                                onClose={() => setBookToEdit(null)}
                                open={bookToEdit ? true : false}
                                onComplete={() =>
                                    setOptions((pre) => ({ ...pre }))
                                }
                            />
                            <DeleteBookDrawer
                                book={bookToDelete}
                                onClose={() => setBookToDelete(null)}
                                open={bookToDelete ? true : false}
                                onComplete={() =>
                                    setOptions((pre) => ({ ...pre }))
                                }
                            />
                        </Stack>
                    </Box>
                </Container>
            </Stack>
        </Stack>
    );
};

export default BooksPage;
