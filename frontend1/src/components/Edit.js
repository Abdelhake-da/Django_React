import { React, useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MySelectField from './forms/MySelectField'
import MyDatePickerField from './forms/MyDatePickerField'
import MyMultilineField from './forms/MyMultilineField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'
function Edit() {
    const hardcoded_list_items = [
        {
            id: '',
            name: 'None',
        },
        {
            id: 'Open',
            name: 'Open',
        },
        {
            id: 'In progress',
            name: 'In Progress',
        },
        {
            id: 'Completed',
            name: 'Completed',
        },
    ];
    const [project_manager, setProject_manager] = useState();
    const [loading, setLoading] = useState(true);
    const MyParam = useParams()
    const MyId = MyParam.id
    const GetData = () => {
        AxiosInstance.get('project_manager/').then((res) => {
            setProject_manager(res.data);
            console.log(res.data);
        });
        AxiosInstance.get(`project/${MyId}`).then((res) => {
            setValue('name', res.data.name)
            setValue('comments', res.data.comments)
            setValue('status', res.data.status)
            setValue('startDate', Dayjs(res.data.start_date))
            setValue('endDate', Dayjs(res.data.end_date))
            setValue('project_manager', res.data.project_manager)
            setLoading(false);
        })
    }
    useEffect(() => {
        GetData();
    }, [])
    const navigate = useNavigate()
    const width = '30%'
    const defaultValue = {
        name: '',
        comments: '',
        status: '',
        start_date: '',
        end_date: '',
    }
    const { handleSubmit, control, setValue } = useForm({ defaultValues: defaultValue });
    const submission = (data) => {
        const StartDate = Dayjs(data.start_date["$d"]).format('YYYY-MM-DD')
        const EndDate = Dayjs(data.end_date["$d"]).format('YYYY-MM-DD')
        AxiosInstance.put(`project/${MyId}/`,
            {
                name: data.name,
                comments: data.comments,
                status: data.status,
                start_date: StartDate,
                end_date: EndDate,
                project_manager: data.project_manager
            }
        ).then((res) => {
            navigate('/')
        })
    }
    return (
        <div>
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <form form onSubmit={handleSubmit(submission)} >
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        backgroundColor: '#00003f',
                        marginBottom: '10px',
                    }}>
                        <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
                            Edit records
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
                            <MySelectField label="Status" name="status" control={control} width={width} items_list={hardcoded_list_items} />
                            <MySelectField label="Project Manager" name="project_manager" control={control} width={width} items_list={project_manager} />
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                            <Button variant='contained' type='submit' sx={{ width: '30%' }}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </form >
            )}
        </div >
    )
}

export default Edit
