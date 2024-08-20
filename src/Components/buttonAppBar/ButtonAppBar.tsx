import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../app/store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { authThunks, selectIsLoggedIn } from "../../features/login/model/authSlice";
import ChangeThem from "Components/changeTheme/ChangeThem";

export const ButtonAppBar = () => {
   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();
   const isLoggedIn = useSelector<AppRootStateType, boolean>(selectIsLoggedIn);

   const logOutHandler = () => {
      dispatch(authThunks.logOut());
   };

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static">
            <Toolbar>
               <ChangeThem />
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Tasks Planner
               </Typography>
               {isLoggedIn && (
                  <Button color="inherit" onClick={logOutHandler}>
                     LogOut
                  </Button>
               )}
            </Toolbar>
         </AppBar>{" "}
      </Box>
   );
};
