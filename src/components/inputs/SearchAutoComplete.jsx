import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const SearchAutoComplete = ({ url, onOptionSelect, ...props }) => {
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        if (!value) {
            setOptions([]);
            return;
        }
        fetch(
            `/api/v1/books/search?${new URLSearchParams({
                search: value,
            }).toString()}`
        )
            .then((resp) => resp.json())
            .then((resp) => {
                setOptions(resp.data.map((book) => book.title));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [value]);

    return (
        <Autocomplete
            {...props}
            disablePortal
            options={options}
            open={options.length > 0}
            onClose={() => {
                setValue("");
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                    sx={{
                        ".MuiInputBase-root": {
                            borderRadius: 50,
                            paddingX: "10px !important",
                        },
                    }}
                />
            )}
            onChange={(_, value) => {
                onOptionSelect?.(value ?? "");
            }}
        />
    );
};
