import { React, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import MyTextField from './forms/MyTextField';
import MySelectField from './forms/MySelectField';
import MyDatePickerField from './forms/MyDatePickerField';
import MyMultilineField from './forms/MyMultilineField';
import MyMultipleSelectChips from './forms/MyMultipleSelectChips'
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Create = () => {
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
    const [employees, setEmployees] = useState();
    const [loading, setLoading] = useState(true);

    const GetData = () => {
        AxiosInstance.get('employees/').then((res) => {
            setEmployees(res.data)
        })
        AxiosInstance.get('project_manager/').then((res) => {
            setProject_manager(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        GetData();
    }, []);
    const navigate = useNavigate();
    const width = '30%';

    const defaultValue = {
        name: '',
        comments: '',
        status: '',
        start_date: '',
        end_date: '',
        project_manager: '',
        employees: [],

    };

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        comments: yup.string(),
        status: yup.string().required("Status is required"),
        start_date: yup.date().required("Start date is required"),
        end_date: yup.date().required("End date is required").min(yup.ref('start_date'), "End date must be greater than start date"),
        project_manager: yup.string().required("Project manager is required"),
        employees: yup.array().min(1, 'Pick at least one employee'),
    });

    const { handleSubmit, control } = useForm({ defaultValues: defaultValue, resolver: yupResolver(schema) });

    const submission = (data) => {
        const StartDate = Dayjs(data.start_date).format('YYYY-MM-DD');
        const EndDate = Dayjs(data.end_date).format('YYYY-MM-DD');
        AxiosInstance.post('project/', {
            name: data.name,
            comments: data.comments,
            employees: data.employees,
            status: data.status,
            start_date: StartDate,
            end_date: EndDate,
            project_manager: data.project_manager,
            employees: data.employees
        }).then((res) => {
            navigate('/');
        });
    };

    return (
        <div>
            {loading ? (
                <h1>Loading</h1>
            ) : (
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
                            <MyTextField label="Name" placeholder="Provide a project name" name="name" control={control} width={width} />
                            <MyDatePickerField label="Start Date" name="start_date" control={control} width={width} />
                            <MyDatePickerField label="End Date" name="end_date" control={control} width={width} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            <MyMultilineField label="Comments" placeholder="Provide project comments" name="comments" control={control} width={width} />
                            <MySelectField label="Status" name="status" control={control} width={width} items={hardcoded_list_items} />
                            <MySelectField label="Project Manager" name="project_manager" control={control} width={width} items={project_manager} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
                            {employees && (
                                <MyMultipleSelectChips
                                    label="Employees"
                                    name="employees"
                                    control={control}
                                    width={width}
                                    items={employees}
                                />
                            )}
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '40px' }}>

                            <Button variant='contained' type='submit' sx={{ width: '30%' }}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </form>
            )}
        </div>
    );
};

export default Create;

