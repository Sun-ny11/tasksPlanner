import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = { id: string, title: string, filter: FilterValuesType }

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState({
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
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId) })
    }

    function addTask(todolistID: string, title: string) {
        let newTask = { id: v1(), title: title, isDone: false };
        setTasks({ ...tasks, [todolistID]: [...tasks[todolistID], newTask] })

    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, isDone } : el) })
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? { ...el, filter: value } : el))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }
    const addTodolist = (title: string) => {
        const newTodo: todolistsType = { id: v1(), title, filter: 'all' }
        setTodolists([...todolists, newTodo])
        setTasks({ ...tasks, [newTodo.id]: [] })
    }

    const updateTask = (todolistID: string, title: string, taskId: string) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, title } : el) })
    }
    const updateTodolist = (todolistID: string, title: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? { ...el, title } : el))
    }

    return (
        <div className="App">
            <AddItemForm collBack={addTodolist} />
            {todolists.map(el => {
                // let tasksForTodolist = tasks[el.id];
                // if (el.filter === "active") {
                //     tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                // }
                // if (el.filter === "completed") {
                //     tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                // }
                return (
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
                )
            })}


        </div>
    );
}

export default App;
