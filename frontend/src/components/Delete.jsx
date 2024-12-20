import { React, useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import AxiosInstance from './Axios'
import { useNavigate, useParams } from 'react-router-dom'
function Delete() {
    const MyParam = useParams()
    const MyId = MyParam.id

    const [myData, setMyData] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetData = () => {
        AxiosInstance.get(`project/${MyId}`).then((res) => {
            setMyData(res.data);
            setLoading(false);
        });
    };
    useEffect(() => {
        GetData();
    }, [])
    const navigate = useNavigate()
    const width = '30%'

    const submission = (data) => {

        AxiosInstance.delete(`project/${MyId}/`).then((res) => {
            navigate('/')
        })
    }
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        backgroundColor: '#00003f',
                        marginBottom: '10px',
                    }}>
                        <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
                            Delete project :{myData.name}
                        </Typography>

                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: "column" }}>
                        <Box sx={{ display: 'flex', justifyContent: 'start', marginBottom: '40px' }}>
                            Are you sure you want to delete {myData.name} ?
                        </Box>
                        <Box sx={{ width: '30%' }}>
                            <Button variant='contained' onClick={submission} sx={{ width: '100%' }}>
                                Delete the project
                            </Button>
                        </Box>
                    </Box>
                </div >
            )}
        </div >
    )
}

export default Delete