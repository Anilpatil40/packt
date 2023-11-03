import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";

export const AppLayout = ({ children }) => {
    return (
        <Stack className="vh-100">
            <AppBar position="sticky" color="default">
                <Container>
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            {"<packt>"}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </Stack>
    );
};
