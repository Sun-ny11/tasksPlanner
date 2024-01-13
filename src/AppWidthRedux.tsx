import React, { useReducer } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import Btn from './Btn';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, updateTaskAC } from './reducers/tasksReducer';
import { addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './reducers/todolistsReducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './reducers/store';
import { useDispatch } from 'react-redux';
import { TodolistWithReducer } from './TodolistWithReducer';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = { id: string, title: string, filter: FilterValuesType }

export type taskTodoType = {
    [key: string]: TaskType[]
}

function AppWidthRedux() {

    let todolists = useSelector<AppRootStateType, todolistsType[]>(state => state.todolists)
    const dicpatch = useDispatch()

    const addTodolist = (title: string) => {
        const AC = addTodolistAC(title)
        dicpatch(addTodolistAC(title))
    }

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
