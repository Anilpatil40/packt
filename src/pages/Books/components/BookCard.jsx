import { Box, Stack, Typography } from "@mui/material";
import packtImage from "assets/images/packt.png";

export const BookCard = ({
    title,
    description,
    image,
    author,
    publishedDate,
}) => {
    return (
        <Box className="col-md-6 col-lg-4 px-3" sx={{ paddingTop: 10 }}>
            <Box className="h-100 border rounded p-3" role="button">
                <Stack
                    sx={{
                        zIndex: 100,
                        height: "100%",
                    }}
                >
                    <img
                        className="rounded"
                        src={image ?? packtImage}
                        alt="sample"
                        style={{
                            width: 100,
                            height: 130,
                            backgroundColor: "#6c757d",
                            objectFit: "contain",
                            marginTop: -80,
                        }}
                    />
                    <Typography className="text-primary mt-4">
                        {title.length > 50
                            ? title.substring(0, 50) + "..."
                            : title}
                    </Typography>
                    <Typography fontSize={12} flex={1}>
                        {description.length > 150
                            ? description.substring(0, 150) + "..."
                            : description}
                    </Typography>
                    <Typography fontSize={12} className="text-secondary mt-2">
                        {author}
                    </Typography>
                    <Box className="d-flex text-small">
                        <Typography fontSize={12}>{publishedDate}</Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};
