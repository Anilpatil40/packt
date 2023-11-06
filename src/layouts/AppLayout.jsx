import { AccountCircle } from "@mui/icons-material";
import {
    AppBar,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@mui/material";
import { useAuthContext } from "contexts/AuthContext";
import { cloneElement, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppLayout = ({ children }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuthContext();
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <Stack className="min-vh-100">
            <ElevationScroll>
                <AppBar position="sticky" color="default">
                    <Container>
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                color={"primary"}
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                }}
                                onClick={() => navigate("/")}
                                role="button"
                            >
                                {"<packt>"}
                            </Typography>
                            {!user ? (
                                <>
                                    <Button
                                        className="ms-auto rounded-pill"
                                        color="primary"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        className="ms-2 rounded-pill"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </Button>
                                </>
                            ) : (
                                <Stack className="ms-auto">
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={(e) =>
                                            setAnchorEl(e.currentTarget)
                                        }
                                        color="primary"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                    >
                                        <MenuItem onClick={() => logout()}>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </Stack>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
            {children}
        </Stack>
    );
};

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}
