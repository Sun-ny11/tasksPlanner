import React, { useEffect, useState } from 'react'
import { todolistsAPI } from '../api/todolists-api'

export default {
   title: 'API'
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.getTodolists()
         .then((res) => {
            setState(res.data)
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.postTodolists("NEW_TODOLIST")
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
      todolistsAPI.putTodolists("Second2", todolistID)
         .then((res) => {
            setState(res.data)
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}



export const GetTask = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.getTask("67d12884-1c38-4ea0-896d-309c6c0cdd4b")
         .then((res) => {
            console.log(res);

            setState(res.data)
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      const todolistID = "67d12884-1c38-4ea0-896d-309c6c0cdd4b"
      todolistsAPI.postTask(todolistID, "NEW_TASK")
         .then((res) => {
            console.log(res);
            setState(res.data)
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
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
   useEffect(() => {

      const todolistID = "67d12884-1c38-4ea0-896d-309c6c0cdd4b"
      const taskID = "8ba18bd6-8c4d-4b6f-b698-11c8d7fd98a7"
      const title = "UPDATE"

      todolistsAPI.updateTask(todolistID, taskID, title)
         .then((res) => {
            console.log(res);
            setState(res.data)
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
}