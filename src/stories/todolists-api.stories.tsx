import React, { useEffect, useState } from 'react'
import { todolistsAPI } from '../api/todolists-api'

export default {
   title: 'API'
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.readTodolists()
         .then((res) => {
            setState(res.data)
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.createTodolists("NEW_TODOLIST")
         .then((res) => {
            setState(res.data)
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      const todolistID = "563d7830-ea31-4b59-acfd-fb5f60d7eb94"
      todolistsAPI.deleteTodolists(todolistID)
         .then((res) => {
            setState(res.data)
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      const todolistID = "fa04d407-28ff-4ee0-8f8a-b24ffb10af04"
      todolistsAPI.updateTodolists("Second2", todolistID)
         .then((res) => {
            setState(res.data)
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}



export const GetTask = () => {
   const [state, setState] = useState<any>(null)
   const [todoID, setTodoID] = useState<any>("")


   const createTask = () => {
      todolistsAPI.readTask(todoID)
         .then((res) => {
            console.log(res);
            setState(res.data)
         })
   }

   return <div>{JSON.stringify(state)}
      <div>
         <input placeholder='Todolist ID:' type='text' value={todoID} onChange={(e) => setTodoID(e.currentTarget.value)} />
         <button onClick={createTask}>Get task</button>
      </div>
   </div>
}

export const CreateTask = () => {
   const [state, setState] = useState<any>(null)
   const [todoID, setTodoID] = useState<any>("")
   const [title, setTitle] = useState<any>("")

   const createTask = () => {
      todolistsAPI.createTask(todoID, title)
         .then((res) => {
            console.log(res);
            setState(res.data)
         })
   }

   return <div>{JSON.stringify(state)}
      <div>
         <input placeholder='Todolist ID:' type='text' value={todoID} onChange={(e) => setTodoID(e.currentTarget.value)} />
         <input placeholder='Title:' type='text' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
         <button onClick={createTask}>Create task</button>
      </div>

   </div>
}
export const DeleteTask = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {

      const todolistID = "67d12884-1c38-4ea0-896d-309c6c0cdd4b"
      const taskID = "a279fbed-e114-419c-b3e0-14eb29dd8f66"

      todolistsAPI.deleteTask(todolistID, taskID)
         .then((res) => {
            console.log(res);
            setState(res)
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
   const [state, setState] = useState<any>(null)
   const [todoID, setTodoID] = useState<any>(null)
   const [taskID, setTaskID] = useState<any>(null)
   const [title, setTitle] = useState<any>(null)
   const [description, setDescription] = useState<string>("")
   const [completed, setCompleted] = useState<boolean>(false)
   const [status, setStatus] = useState<number>(0)
   const [priority, setPriority] = useState<number>(0)
   const [startDate, setStartDate] = useState<string>("")
   const [deadline, setDeadline] = useState<string>("")

   //    const todolistID = "67d12884-1c38-4ea0-896d-309c6c0cdd4b"
   //    const taskID = "0edabf73-90f2-45a1-bbde-3758102f7723"

   const updateTask = () => {
      todolistsAPI.updateTask(todoID, taskID, {
         title: "title",
         description: "description",
         status: 0,
         priority: 0,
         startDate: "startDate",
         deadline: "deadline",
      })
         .then((res) => {
            console.log(res);
            setState(res.data)
         })

   }

   return <div>{JSON.stringify(state)}
      <div>
         <input placeholder='Todolist ID:' type='text' value={todoID} onChange={(e) => setTodoID(e.currentTarget.value)} />
         <input placeholder='Task ID:' type='text' value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)} />
         <input placeholder='Title:' type='text' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
         <input placeholder='description:' type='text' value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
         {/* <input placeholder='completed:' type='text' value={completed} onChange={(e) => setCompleted(e.currentTarget.checked)} /> */}
         <input placeholder='status:' type='text' value={status} onChange={(e) => setStatus(+e.currentTarget.value)} />
         <input placeholder='priority:' type='text' value={priority} onChange={(e) => setPriority(+e.currentTarget.value)} />
         <input placeholder='startDate:' type='text' value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)} />
         <input placeholder='deadline:' type='text' value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)} />
         <button onClick={updateTask}>Update task</button>

      </div>


   </div>
}