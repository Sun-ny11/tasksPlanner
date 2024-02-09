import React from 'react';
import './App.css';
import Btn from '../management/Btn';
import Container from '@mui/material/Container';
import { TaskType } from '../../api/todolists-api';
import { TodolistsList } from '../features/todolistsLists/TodolistsList';


export type taskTodoType = {
    [key: string]: TaskType[]
}

function App() {
    return (
        <div className="App">
            <Btn />
            <Container >
                <TodolistsList />
            </Container>
        </div>
    );
}

export default App;
