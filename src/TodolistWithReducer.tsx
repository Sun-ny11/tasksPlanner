import React from 'react';
import { FilterValuesType, taskTodoType, todolistsType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import { CheckBox } from './CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './reducers/store';
import { changeFilterAC, removeTodolistAC, updateTodolistAC } from './reducers/todolistsReducer';
import { addTaskAC, changeStatusAC, removeTaskAC, updateTaskAC } from './reducers/tasksReducer';
// import { title } from 'process';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
}

export function TodolistWithReducer(props: PropsType) {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistID])
    const dicpatch = useDispatch()


    let tasksForTodolist = tasks;
    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }


    const onAllClickHandler = () => dicpatch(changeFilterAC(props.todolistID, "all"))
        ;
    const onActiveClickHandler = () => dicpatch(changeFilterAC(props.todolistID, "active"));
    const onCompletedClickHandler = () => dicpatch(changeFilterAC(props.todolistID, "completed"));

    const removeTodolistHandler = () => {
        dicpatch(removeTodolistAC(props.todolistID))
    }

    const addTaskHandler = (title: string) => {
        dicpatch(addTaskAC(props.todolistID, title))
    }

    const newTitleHandler = (title: string, taskId: string) => {
        dicpatch(updateTaskAC(props.todolistID, title, taskId))
    }


    const updateTodolistHandler = (title: string) => {
        dicpatch(updateTodolistAC(props.todolistID, title))
    }



    const onChangeHandler = (isDone: boolean, taskId: string) => {
        dicpatch(changeStatusAC(props.todolistID, taskId, isDone))

    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} collBack={updateTodolistHandler} />
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm collBack={addTaskHandler} />
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dicpatch(removeTaskAC(props.todolistID, t.id))

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>

                        <CheckBox onChange={(event) => { onChangeHandler(event, t.id) }} checked={t.isDone} />


                        {/* <Checkbox onChange={onChangeHandler} checked={t.isDone} /> */}
                        <EditableSpan oldTitle={t.title} collBack={(title) => newTitleHandler(title, t.id)} />
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button color="success" onClick={onAllClickHandler} variant={props.filter === 'all' ? "outlined" : "contained"} >All</Button>
            <Button onClick={onActiveClickHandler} variant={props.filter === 'active' ? "outlined" : "contained"}>Active</Button>
            <Button onClick={onCompletedClickHandler} variant={props.filter === 'completed' ? "outlined" : "contained"}>Completed</Button>

        </div>
    </div>
}
