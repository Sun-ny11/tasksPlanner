import React, { useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import Btn from './Btn';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTaskAC, addTaskForNewTodoAC, changeStatusAC, removeTaskAC, tasksReducer, updateTaskAC } from './reducers/tasksReducer';
import { addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './reducers/todolistsReducer';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = { id: string, title: string, filter: FilterValuesType }

export type taskTodoType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML&CSS2", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
            { id: v1(), title: "ReactJS2", isDone: false },
            { id: v1(), title: "Rest API2", isDone: true },
            { id: v1(), title: "GraphQL2", isDone: false },
        ]

    });
    // console.log(tasks)


    function removeTask(todolistID: string, taskId: string) {
        dispatchTasks(removeTaskAC(todolistID, taskId))
        // setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId) })
    }

    function addTask(todolistID: string, title: string) {
        dispatchTasks(addTaskAC(todolistID, title))
        // let newTask = { id: v1(), title: title, isDone: false };
        // setTasks({ ...tasks, [todolistID]: [...tasks[todolistID], newTask] })

    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        dispatchTasks(changeStatusAC(todolistID, taskId, isDone))
        // setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, isDone } : el) })
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatchTodolists(changeFilterAC(todolistID, value))
        // setTodolists(todolists.map(el => el.id === todolistID ? { ...el, filter: value } : el))
    }

    const removeTodolist = (todolistID: string) => {
        // setTodolists(todolists.filter(el => el.id !== todolistID))
        dispatchTodolists(removeTodolistAC(todolistID))
        delete tasks[todolistID]
    }
    const addTodolist = (title: string) => {
        const id = v1()
        dispatchTodolists(addTodolistAC(title, id))
        dispatchTasks(addTaskForNewTodoAC(id))
        // 
        // setTodolists([...todolists, newTodo])
        // setTasks({ ...tasks, [newTodo.id]: [] })
    }

    const updateTask = (todolistID: string, title: string, taskId: string) => {
        dispatchTasks(updateTaskAC(todolistID, title, taskId))
        // setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, title } : el) })
    }
    const updateTodolist = (todolistID: string, title: string) => {
        dispatchTodolists(updateTodolistAC(todolistID, title))
        // setTodolists(todolists.map(el => el.id === todolistID ? { ...el, title } : el))
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
                        // let tasksForTodolist = tasks[el.id];
                        // if (el.filter === "active") {
                        //     tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                        // }
                        // if (el.filter === "completed") {
                        //     tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                        // }
                        return <Grid item justifyContent={"space-around"}>
                            <Paper elevation={3} style={{ padding: "20px" }}>
                                <Todolist
                                    key={el.id}
                                    updateTask={updateTask}
                                    todolistID={el.id}
                                    title={el.title}
                                    tasks={tasks[el.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={el.filter}
                                    removeTodolist={removeTodolist}
                                    todolists={todolists}
                                    updateTodolist={updateTodolist}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>

            </Container>



        </div>
    );
}

export default App;
