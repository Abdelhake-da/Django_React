import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
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
                    formState,
                }) => (
                    <DatePicker
                        onChange={onChange}
                        value={value}
                        label={label}
                        sx={{ width: { width } }} />
                )}
            />
        </LocalizationProvider>
    );
}