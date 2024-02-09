import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { AddItemForm } from '../management/AddItemForm';
import { EditableSpan } from '../management/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../reducers/store';
import { FilterValuesType, changeFilterAC, removeTodolistTC, updateTodolistTC } from '../../reducers/todolistsReducer';
import { addTaskTC, setTaskTC } from '../../reducers/tasksReducer';
import { Task } from './task/Task';
import { ButtonWithRedux } from '../management/ButtonWithRedux';
import { TaskStatus, TaskType } from '../../api/todolists-api';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';


type PropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
}

export const TodolistWithReducer = memo((props: PropsType) => {
    console.log("TodolistWithReducer " + props.title);

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistID])
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()

    useEffect(() => {
        dispatch(setTaskTC(props.todolistID))
    }, [])

    let tasksForTodolist = tasks;

    tasksForTodolist = useMemo(() => {
        if (props.filter === "active") {
            tasksForTodolist = tasks.filter(t => t.status === TaskStatus.New);
        }
        if (props.filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.status === TaskStatus.Completed);
        }
        return tasksForTodolist
    }, [props.filter, tasks])



    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC(props.todolistID, "all")), [dispatch, props.todolistID]);
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC(props.todolistID, "active")), [dispatch, props.todolistID]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC(props.todolistID, "completed")), [dispatch, props.todolistID]);

    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(props.todolistID))
    }

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolistID, title))
    }, [dispatch, props.todolistID])

    const updateTodolistHandler = useCallback((title: string) => {
        dispatch(updateTodolistTC(props.todolistID, title))
    }, [dispatch, props.todolistID])

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} collBack={updateTodolistHandler} />
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm collBack={addTaskHandler} />
        <ul>
            {tasksForTodolist.map(t => <Task key={t.id} todolistID={props.todolistID} taskID={t.id} />)}
        </ul>
        <div>
            <ButtonWithRedux onClick={onAllClickHandler} name={'All'} color="success" variant={props.filter === 'all' ? "outlined" : "contained"} />
            <ButtonWithRedux onClick={onActiveClickHandler} name={'Active'} variant={props.filter === 'active' ? "outlined" : "contained"} />
            <ButtonWithRedux onClick={onCompletedClickHandler} name={'Completed'} variant={props.filter === 'completed' ? "outlined" : "contained"} />
        </div>
    </div>
})
