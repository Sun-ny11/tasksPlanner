import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import { Login } from "features/login/ui/Login";
import { TodolistsList } from "features/todolistsLists/ui/TodolistsList";

type Props = {
   demo: boolean;
};

export const Routing = ({ demo = false }: Props) => {
   return (
      <>
         <Container>
            <Routes>
               <Route path={"/tasksPlanner"} element={<TodolistsList demo={demo} />} />
               <Route path={"/login"} element={<Login />} />
               <Route path={"/error404"} element={<h1>404 page not found</h1>} />
               <Route path={"/*"} element={<Navigate to={"/error404"} />} />
            </Routes>
         </Container>
      </>
   );
};
