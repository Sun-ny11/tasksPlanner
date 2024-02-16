import React from 'react';
import './App.css';
import Btn from '../management/Btn';
import Container from '@mui/material/Container';
import { TaskType } from '../../api/todolists-api';
import { TodolistsList } from '../features/todolistsLists/TodolistsList';
import LinearProgress from '@mui/material/LinearProgress';
import ErrorSnackbar from '../errorSnackbar/ErrorSnackbar';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../reducers/store';
import { RequestType } from '../../reducers/appReducer';
import { useDispatch } from 'react-redux';

export type taskTodoType = {
    [key: string]: TaskType[]
}

type PropsType = {
    demo?: boolean
}

function App({ demo = false }: PropsType) {

    const status = useSelector<AppRootStateType, RequestType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar />
            <Btn />
            {status === "loading" && <LinearProgress />}
            <Container >

                <TodolistsList demo={demo} />

            </Container>
        </div>
    );
}

export default App;
