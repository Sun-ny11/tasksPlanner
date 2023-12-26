import React from 'react';
import { FilterValuesType, todolistsType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import { CheckBox } from './CheckBox';
// import { title } from 'process';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    todolists: Array<todolistsType>
    updateTask: (todolistID: string, title: string, taskId: string) => void
    updateTodolist: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {


    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }


    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const newTitleHandler = (title: string, taskId: string) => {
        props.updateTask(props.todolistID, title, taskId)
    }


    const updateTodolistHandler = (title: string) => {
        props.updateTodolist(props.todolistID, title)
    }



    const onChangeHandler = (e: boolean, id:string) => {
        props.changeTaskStatus(props.todolistID, id, e);
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
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    
                    // const newTitleHandler = (title:string) =>{
                    //     props.updateTask(props.todolistID,title,t.id )
                    // }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>


                        <CheckBox onChange={(event)=>{onChangeHandler(event,t.id)}} checked={t.isDone}/>


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
