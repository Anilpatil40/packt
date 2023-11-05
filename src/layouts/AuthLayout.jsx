import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AuthLayout = ({ children }) => {
    const navigate = useNavigate();
    return (
        <Stack className="vh-100 p-4 align-items-center">
            <Typography
                variant="h3"
                fontWeight={"bold"}
                color={"primary"}
                onClick={() => navigate("/")}
                sx={{ cursor: "pointer" }}
            >
                {"<packt>"}
            </Typography>
            {children}
        </Stack>
    );
};
