import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Controller } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function MyMultipleSelectChips(props) {
    const { label, name, control, width, items } = props;
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
                <Controller
                    name={name}
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                        formState,
                    }) => (
                        <Select
                            labelId="demo-musetPersonNameltiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={value}
                            onChange={
                                (event) => {
                                    onChange(event.target.value);
                                    handleChange(event.target.value);
                                }
                            }
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={items.find((item) => item.id === value).name} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {items.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}
                                    style={getStyles(item.name, personName, theme)}
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />

            </FormControl>
        </div>
    );
}