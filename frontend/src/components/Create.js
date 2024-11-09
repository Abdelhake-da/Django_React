import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MySelectField from './forms/MySelectField'
import MyDatePickerField from './forms/MyDatePickerField'
import MyMultilineField from './forms/MyMultilineField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
const Create = () => {
    const navigate = useNavigate()
    const width = '30%'
    const defaultValue = {
        name: '',
        comments: '',
        status: '',
        start_date: '',
        end_date: '',
    }
    const { handleSubmit, reset, setValue, control } = useForm({ defaultValues: defaultValue });
    const submission = (data) => {
        const StartDate = Dayjs(data.start_date["$d"]).format('YYYY-MM-DD')
        const EndDate = Dayjs(data.end_date["$d"]).format('YYYY-MM-DD')
        AxiosInstance.post('project/',
            {
                name: data.name,
                comments: data.comments,
                status: data.status,
                start_date: StartDate,
                end_date: EndDate,
            }
        ).then((res) => {
            navigate('/')
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submission)}>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    backgroundColor: '#00003f',
                    marginBottom: '10px',
                }}>
                    <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
                        Create records
                    </Typography>

                </Box>
                <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: "column" }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
                        <MyTextField label="Name" placeholder="provide a project Name" name="name" control={control} width={width} />
                        <MyDatePickerField label="Start Date" name="startDate" control={control} width={width} />
                        <MyDatePickerField label="End Date" name="endDate" control={control} width={width} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <MyMultilineField label="Comments" placeholder="provide a project comments" name="comments" control={control} width={width} />
                        <MySelectField label="Status" name="status" control={control} width={width} />
                        <Box sx={{ width: '30%' }}>
                            <Button variant='contained' type='submit' sx={{ width: '100%' }}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </div >
    )
}

export default Create