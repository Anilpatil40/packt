import { Stack, Typography } from "@mui/material";

export const AuthLayout = ({ children }) => {
    return (
        <Stack className="vh-100 p-4 align-items-center">
            <Typography variant="h3" fontWeight={"bold"} color={"primary"}>
                {"<packt>"}
            </Typography>
            {children}
        </Stack>
    );
};
