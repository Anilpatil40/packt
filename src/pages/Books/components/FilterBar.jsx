import { ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Stack,
    Typography,
} from "@mui/material";

export const FilterBar = ({ filters = {} }) => {
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
                                {filters[key].map((item) => (
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox defaultChecked />
                                            }
                                            label={item}
                                        />
                                    </FormGroup>
                                ))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Stack>
    );
};
