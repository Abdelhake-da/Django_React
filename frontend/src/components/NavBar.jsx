import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
export default function Navbar(props) {
    const { drawerWidth, content } = props
    const location = useLocation();
    const path = location.pathname;
    const myDrawer = (
        <div>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/" selected={path === '/'}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/about" selected={path === '/about'}>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary={"About"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/create" selected={path === '/create'}>
                            <ListItemIcon>
                                <BorderColorIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Create"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </div>
    )
    const [open, setOpen] = React.useState(false);
    const changeOpenStatus = () => {
        setOpen(!open)
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        color='inheret'
                        onClick={changeOpenStatus}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Our application
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {myDrawer}
            </Drawer>

            <Drawer
                variant="temporary"
                open={open}
                onClose={changeOpenStatus}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {myDrawer}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {content}
            </Box>
        </Box>
    );
}
