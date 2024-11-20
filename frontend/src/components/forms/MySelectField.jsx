import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from "react-hook-form";
export default function MySelectField(props) {
    const { label, name, control, width, items } = props;
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (

        <Controller
            name={name}
            control={control}

            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <FormControl variant="standard" sx={{ width: { width } }}>

                    <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                    <Select

                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={onChange}
                        value={value}
                        label="Age"
                        error={!!error}
                        helperText={error ? error.message : null}
                    >
                        {items.length > 0 ? (
                            items.map((item) => (
                                <MenuItem value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No items available</MenuItem>
                        )}

                    </Select>
                </FormControl>
            )}
        />

    );

}
