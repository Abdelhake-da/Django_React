import { React, useEffect, useMemo, useState } from 'react'
import AxiosInstance from './Axios'
import { MaterialReactTable } from 'material-react-table';
import DayJs from 'dayjs'
import { Box, IconButton } from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate();
    const [myData, setMyData] = useState([])
    const [loading, setLoading] = useState(true)
    const GetData = () => {
        AxiosInstance.get('project/').then((res) => {
            setMyData(res.data)
            setLoading(false)
        })
    }
    useEffect(() => {
        GetData();
    }, [])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Name',
                size: 150,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150,
            },
            {
                accessorKey: 'comments', //normal accessorKey
                header: 'Comments',
                size: 200,
            },
            {
                accessorFn: (row) => DayJs(row.start_date).format('DD/MM/YYYY'), //normal accessorKey
                header: 'Start Date',
                size: 150,
            },
            {
                accessorFn: (row) => DayJs(row.end_date).format('DD/MM/YYYY'), //normal accessorKey
                header: 'End Date',
                size: 150,
            },
        ],
        [],
    );


    return (
        <div>
            {loading ? <h1>Loading</h1> :
                <MaterialReactTable
                    columns={columns}
                    data={myData}
                    enableRowActions
                    muiTableBodyRowProps={(row) => ({
                        onClick: () => {
                            // Navigate to the edit page using the row's ID without page reload
                            navigate(`/edit/${row.row.original.id}`);
                        },
                        style: { cursor: 'pointer' },
                    })}
                    renderRowActions={({ row }) => (
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                            <IconButton color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )}
                />
            }

        </div>
    )
}

export default Home