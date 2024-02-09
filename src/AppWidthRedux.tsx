import React, { useCallback, useEffect } from 'react';
import './App.css';
// import { TaskType } from './Components/todoList/Todolist';
import { AddItemForm } from './Components/management/AddItemForm';
import Btn from './Components/management/Btn';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TodolistsDomainType, addTodolistAC, addTodolistTC, getTodolistTC } from './reducers/todolistsReducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './reducers/store';
import { useDispatch } from 'react-redux';
import { TodolistWithReducer } from './Components/todoList/TodolistWithReducer';
import { TaskType } from './api/todolists-api';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// export type FilterValuesType = "all" | "active" | "completed";
// export type todolistsType = { 
//     id: string
//     title: string
//     filter: FilterValuesType }

export type taskTodoType = {
    [key: string]: TaskType[]
}

function AppWidthRedux() {
    // console.log("AppWidthRedux");

    let todolists = useSelector<AppRootStateType, TodolistsDomainType[]>(state => state.todolists)
    const dispatch:ThunkDispatch<any, any, AnyAction> = useDispatch()

    useEffect(() => {
        dispatch(getTodolistTC()) 

        //getTodolistTC(dispatch)
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
        <div className="App">
            <Btn />
            <Container >

                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm collBack={addTodolist} />
                </Grid>

                <Grid container spacing={3} justifyContent={"center"}>
                    {todolists.map(el => {
                        return <Grid key={el.id} item justifyContent={"space-around"}>
                            <Paper elevation={3} style={{ padding: "20px" }}>
                                <TodolistWithReducer
                                    todolistID={el.id}
                                    title={el.title}
                                    filter={el.filter}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWidthRedux;
