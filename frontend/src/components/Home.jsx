import { React, useEffect, useMemo, useState } from 'react';
import AxiosInstance from './Axios';
import { MaterialReactTable } from 'material-react-table';
import DayJs from 'dayjs';
import { Box, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
const Home = () => {
    const navigate = useNavigate();
    const [myData, setMyData] = useState([]);
    const [employees, setEmployees] = useState();
    const [loading, setLoading] = useState(true);
    const [project_manager, setProject_manager] = useState();
    const GetData = async () => {
        try {
            const [employeesRes, projectManagerRes, projectRes] = await Promise.all([
                AxiosInstance.get('employees/'),
                AxiosInstance.get('project_manager/'),
                AxiosInstance.get('project/'),
            ]);

            setEmployees(employeesRes.data);
            setProject_manager(projectManagerRes.data);
            setMyData(projectRes.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
            setLoading(false);
        }

    };

    useEffect(() => {
        GetData();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 150,
            },
            {
                // accessorKey: 'project_manager',
                // accessorFn: (row) => project_manager.find(item => item.id === row.project_manager)?.name || '',
                accessorFn: (row) => project_manager?.find((pm) => pm.id === row.project_manager)?.name || '',
                header: 'Project Manager',
                size: 150,
            },
            {
                // accessorKey: 'employees',
                // accessorFn: (row) => project_manager.find(item => item.id === row.project_manager)?.name || '',
                accessorFn: (row) =>
                    row.employees
                        ?.map((empId) => employees?.find((emp) => emp.id === empId)?.name)
                        .filter(Boolean) // Remove undefined values if any employee ID doesn't match
                        .join(', ') || '',
                header: 'Employees',
                size: 150,
            },

            {
                accessorKey: 'status',
                header: 'Status',
                size: 150,
            },
            {
                accessorKey: 'comments',
                header: 'Comments',
                size: 200,
            },
            {
                accessorFn: (row) => DayJs(row.start_date).format('DD/MM/YYYY'),
                header: 'Start Date',
                size: 150,
            },
            {
                accessorFn: (row) => DayJs(row.end_date).format('DD/MM/YYYY'),
                header: 'End Date',
                size: 150,
            },
        ],
        [project_manager, employees]
    );

    return (
        <div>
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <MaterialReactTable
                    columns={columns}
                    data={myData}
                    enableRowActions
                    muiTableBodyRowProps={(row) => ({
                        onClick: () => {
                            navigate(`/edit/${row.row.original.id}`);
                        },
                        style: { cursor: 'pointer' },
                    })}
                    renderRowActions={({ row }) => (
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                            <IconButton
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#ff0000',
                                        color: '#000',
                                    },
                                }}
                                color="error"
                                component={Link}
                                to={`/delete/${row.original.id}`}
                                onClick={(event) => {
                                    // Prevent row click from triggering when clicking on the delete icon
                                    event.stopPropagation();
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )}
                />
            )}
        </div>
    );
};

export default Home;
