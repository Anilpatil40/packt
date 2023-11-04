import { Box, Button, Stack, SwipeableDrawer, Typography } from "@mui/material";

export const DeleteBookDrawer = ({ book, open, onClose, onComplete }) => {
    async function onSubmit() {
        const response = await fetch(`/api/v1/books/${book.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        const body = await response.json();
        if (response.ok) {
            onComplete?.();
            closeDrawer();
        } else {
        }
    }

    function closeDrawer() {
        onClose?.();
    }

    return (
        <SwipeableDrawer anchor="right" open={open} onClose={closeDrawer}>
            <Stack
                width={300}
                justifyContent={"center"}
                alignItems={"center"}
                className="vh-100"
            >
                <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    textAlign={"center"}
                >
                    Are you sure you want to delete the book ?
                </Typography>
                <Box className="p-3 d-flex gap-2">
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
                        onClick={onSubmit}
                        className="col-6"
                    >
                        Delete
                    </Button>
                </Box>
            </Stack>
        </SwipeableDrawer>
    );
};
