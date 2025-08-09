import React, {useState} from 'react';
import { AppBar,Toolbar,Typography, IconButton, Drawer,List, ListItem, ListItemIcon,ListItemText,
    Menu, MenuItem, Box, Divider
 } from '@mui/material';
import {Menu as MenuIcon, AccountCircle,PersonAdd,ListAlt} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom';

export default function MainLayout ({children}){
    const drawerWidth = 240;
     const MenuItems =[
        {text:'OnboardEmployee',icon:<PersonAdd />, path:'/'},
        {text:'View Employees', icon:<ListAlt />, path:'/employees'}
     ];

     const [anchorEl, setAnchorEl] = useState(null);
     const open = Boolean(anchorEl);
     const navigate = useNavigate();

     const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
     const handleMenuClose = () => setAnchorEl(null);

     const handleLogout = () =>{
        handleMenuClose();
        alert("Logged out");
     }

     return(
        <Box sx={{ display: 'flex'}}>
            <AppBar position='fixed' sx={{zIndex: (theme) => theme.zIndex.drawer +1}}>
                <Toolbar>
                    <IconButton
                    color='inherit'
                    edge="start"
                    sx={{mr:2, display:{sm:'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant='h6' sx={{flexGrow: 1}}>
                        Employee Onboarding
                    </Typography>
                    <IconButton color='inherit' onClick={handleMenuClick}>
                        <AccountCircle/>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                        <MenuItem onClick={()=>{handleMenuClose(); alert("My profile")}}>My Profile</MenuItem>
                            
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
            variant='permanent'
            sx={{
                width: drawerWidth,
                [`& .MuiDrawer-paper`]:{
                    width: drawerWidth,
                    boxSizing: 'border-box'
                },
                display:{xs:'none', sm:'block'}
            }}
            open
            >
            <Toolbar/>
            <Divider/>
            <List>
                {MenuItems.map((item)=>(
                    <ListItem button key={item.text} component={Link} to={item.path}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                    
                ))}
            </List>
            </Drawer>

            <Box component="main" sx={{flexGrow:1,p:3}}>
                <Toolbar/>
                {children}
            </Box>
        </Box>
     )
}