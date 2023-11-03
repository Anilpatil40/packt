import { ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControlLabel,
    Stack,
    Typography,
} from "@mui/material";

export const FilterBar = ({ filters = {}, selected = {}, onSelect }) => {
    return (
        <Stack spacing={2}>
            {Object.keys(filters).map((key, index) => {
                return (
                    <Accordion
                        className="border rounded"
                        sx={{
                            boxShadow: "none",
                            backgroundColor: "#f1f1f1",
                        }}
                        key={index}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>{key}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack>
                                {filters[key].map((item, index) => (
                                    <Stack
                                        direction={"row"}
                                        alignItems={"center"}
                                        key={index}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        selected[key]?.find(
                                                            (obj) =>
                                                                obj.filter ===
                                                                item.filter
                                                        )
                                                            ? true
                                                            : false
                                                    }
                                                    onChange={(e, checked) => {
                                                        if (e.target.checked) {
                                                            if (!selected[key])
                                                                selected[key] =
                                                                    [];
                                                            selected[key].push(
                                                                item
                                                            );
                                                            onSelect?.(
                                                                selected
                                                            );
                                                        } else {
                                                            if (!selected[key])
                                                                return;
                                                            selected[key] =
                                                                selected[
                                                                    key
                                                                ].filter(
                                                                    (obj) =>
                                                                        obj.filter !==
                                                                        item.filter
                                                                );
                                                            onSelect?.(
                                                                selected
                                                            );
                                                        }
                                                    }}
                                                />
                                            }
                                            label={item.filter}
                                        />
                                        <Typography className="ms-auto">
                                            {item.count}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Stack>
    );
};
