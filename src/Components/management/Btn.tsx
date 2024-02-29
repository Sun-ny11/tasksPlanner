import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../reducers/store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { logOutTC } from '../../reducers/authReducer';

export default function ButtonAppBar() {

   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch()
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


   const logOut = () => {
      dispatch(logOutTC())
   }

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static">
            <Toolbar>
               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
               >
                  <MenuIcon />
               </IconButton>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  News
               </Typography>
               {isLoggedIn && <Button color="inherit" onClick={logOut}>LogOut</Button>}
            </Toolbar>
         </AppBar>
      </Box>
   );
}