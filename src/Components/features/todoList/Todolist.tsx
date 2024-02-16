import React, { memo, useCallback, useEffect, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { Task } from './task/Task';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { FilterValuesType, TodolistsDomainType, changeFilterAC, removeTodolistTC, updateTodolistTC } from '../../../reducers/todolistsReducer';
import { AppRootStateType } from '../../../reducers/store';
import { TaskStatus, TaskType } from '../../../api/todolists-api';
import { addTaskTC, setTaskTC } from '../../../reducers/tasksReducer';
import { EditableSpan } from '../../management/EditableSpan';
import { AddItemForm } from '../../management/AddItemForm';
import { ButtonWithRedux } from '../../management/ButtonWithRedux';


type PropsType = {
    todolist: TodolistsDomainType
    // todolistID: string
    // title: string
    // filter: FilterValuesType
    demo?: boolean
}

export const Todolist = memo(({ demo = false, ...props }: PropsType) => {
    console.log("Todolist " + props.todolist.title);

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolist.id])
    const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(setTaskTC(props.todolist.id))
    }, [])

    let tasksForTodolist = tasks;

    tasksForTodolist = useMemo(() => {
        if (props.todolist.filter === "active") {
            tasksForTodolist = tasks.filter(t => t.status === TaskStatus.New);
        }
        if (props.todolist.filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.status === TaskStatus.Completed);
        }
        return tasksForTodolist
    }, [props.todolist.filter, tasks])



    const onAllClickHandler = useCallback(() => dispatch(changeFilterAC(props.todolist.id, "all")), [dispatch, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC(props.todolist.id, "active")), [dispatch, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC(props.todolist.id, "completed")), [dispatch, props.todolist.id]);

    const removeTodolistHandler = () => {
        console.log(props.todolist.entityStatus);

        dispatch(removeTodolistTC(props.todolist.id))
    }

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolist.id, title))
    }, [dispatch, props.todolist.id])

    const updateTodolistHandler = useCallback((title: string) => {
        dispatch(updateTodolistTC(props.todolist.id, title))
    }, [dispatch, props.todolist.id])

    return <div>
        <h3>
            <EditableSpan oldTitle={props.todolist.title} collBack={updateTodolistHandler} />
            <IconButton aria-label="delete" onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === "loading"}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm collBack={addTaskHandler} disabled={props.todolist.entityStatus === "loading"} />
        <ul>
            {tasksForTodolist.map(t => <Task key={t.id} todolistID={props.todolist.id} taskID={t.id} />)}
        </ul>
        <div>
            <ButtonWithRedux onClick={onAllClickHandler} name={'All'} color="success" variant={props.todolist.filter === 'all' ? "outlined" : "contained"} />
            <ButtonWithRedux onClick={onActiveClickHandler} name={'Active'} variant={props.todolist.filter === 'active' ? "outlined" : "contained"} />
            <ButtonWithRedux onClick={onCompletedClickHandler} name={'Completed'} variant={props.todolist.filter === 'completed' ? "outlined" : "contained"} />
        </div>
    </div>
})
