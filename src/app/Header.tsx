import { ButtonAppBar } from "Components/buttonAppBar/ButtonAppBar";
import ErrorSnackbar from "Components/errorSnackbar/ErrorSnackbar";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./store";
import { RequestType, selectStatus } from "./appSlice";

export const Header = () => {
   const status = useSelector<AppRootStateType, RequestType>(selectStatus);

   return (
      <>
         <ErrorSnackbar />
         <ButtonAppBar />
         {status === "loading" && <LinearProgress />}
      </>
   );
};
