import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from "react-hook-form";

export default function MyDatePickerField(props) {
    const { label, name, control, width } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <DatePicker
                        onChange={(newValue) => {
                            // Update the field value with Dayjs object or null
                            onChange(newValue ? newValue : null);
                        }}
                        value={value || null}  // Ensure null is set if no value
                        label={label}
                        sx={{ width: width }}
                        slotProps={{
                            textField: {
                                error: !!error,
                                helperText: error ? error.message : null,
                            },
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    );
}
