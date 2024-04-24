import { todolistsAPI } from "../api/todolistsApi";
import { RequestType } from "../../../app/appSlice";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { AppRootStateType } from "../../../app/store";
import { TodolistsType } from "../api/todolistsApi.types";

const slice = createSlice({
   name: "todolists",
   initialState: [] as TodolistsDomainType[],
   reducers: {
      changeFilter: (state, action: PayloadAction<{ todolistID: string; value: FilterValuesType }>) => {
         const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
         if (index !== -1) state[index].filter = action.payload.value;
      },
      changeTodolistEntityStatus: (state, action: PayloadAction<{ status: RequestType; todolistID: string }>) => {
         const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
         if (index !== -1) state[index].entityStatus = action.payload.status;
      },
      clearData: () => {
         return [];
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getTodolist.fulfilled, (state, action) => {
            action.payload.todolists.forEach((el) => {
               state.push({ ...el, filter: "all", entityStatus: "idle" });
            });
         })
         .addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
            if (index !== -1) state.splice(index, 1);
         })
         .addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({ ...action.payload.todo, filter: "all", entityStatus: "idle" });
         })
         .addCase(updateTodolist.fulfilled, (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistID);
            if (index !== -1) state[index].title = action.payload.title;
         })
         .addCase(reorderTodolist.fulfilled, (state, action) => {
            current;
            const { draggableTodolistIndex, droppableTodolistIndex } = action.payload;

            const element = state.splice(draggableTodolistIndex, 1);

            state.splice(droppableTodolistIndex, 0, element[0]);
         });
   },
   selectors: {
      todolistsSlice: (sliceState) => sliceState,
   },
});

//types

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsDomainType = TodolistsType & {
   filter: FilterValuesType;
   entityStatus: RequestType;
};

const getTodolist = createAppAsyncThunk<{ todolists: TodolistsType[] }, void>(
   `${slice.name}/getTodolist`,
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      const res = await todolistsAPI.readTodolists();
      if (res.statusText === "") {
         return { todolists: res.data };
      } else {
         return rejectWithValue(null);
      }
   },
);

const removeTodolist = createAppAsyncThunk<{ todolistID: string }, string>(
   `${slice.name}/removeTodolist`,
   async (todolistID, thunkAPI) => {
      const { dispatch, rejectWithValue } = thunkAPI;
      dispatch(todolistActions.changeTodolistEntityStatus({ status: "loading", todolistID }));
      const res = await todolistsAPI.deleteTodolists(todolistID);

      if (res.data.resultCode === 0) {
         return { todolistID };
      } else {
         return rejectWithValue(res.data);
      }
   },
);

const addTodolist = createAppAsyncThunk<{ todo: TodolistsType }, string>(
   `${slice.name}/addTodolist`,
   async (title, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      const res = await todolistsAPI.createTodolists(title);
      if (res.data.resultCode === 0) {
         return { todo: res.data.data.item };
      } else {
         return rejectWithValue(res.data);
      }
   },
);

type updateTodolistType = { todolistID: string; title: string };
const updateTodolist = createAppAsyncThunk<updateTodolistType, updateTodolistType>(
   `${slice.name}/updateTodolist`,
   async ({ todolistID, title }, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;

      const res = await todolistsAPI.updateTodolists(title, todolistID);
      if (res.data.resultCode === 0) {
         return { todolistID, title };
      } else {
         return rejectWithValue(res.data);
      }
   },
);

const reorderTodolist = createAppAsyncThunk<
   { draggableTodolistIndex: number; droppableTodolistIndex: number },
   { draggableId: string; droppableId: string }
>(`${slice.name}/reorderTodolist`, async ({ draggableId, droppableId }, thunkAPI) => {
   const { rejectWithValue, getState } = thunkAPI;

   const state = getState() as AppRootStateType;
   const draggableTodolist = state.todolists.find((el) => el.id === draggableId) as TodolistsDomainType;
   const droppableTodolist = state.todolists.find((el) => el.id === droppableId) as TodolistsDomainType;

   const draggableTodolistIndex = state.todolists.indexOf(draggableTodolist);
   const droppableTodolistIndex = state.todolists.indexOf(droppableTodolist);

   const putAfterTodolistIndex =
      draggableTodolistIndex > droppableTodolistIndex ? droppableTodolistIndex - 1 : droppableTodolistIndex;

   const putAfterTodolistId = state.todolists[putAfterTodolistIndex]?.id;

   const res = await todolistsAPI.reorderTodolists(draggableId, putAfterTodolistId);
   if (res.data.resultCode === 0) {
      return { draggableTodolistIndex, droppableTodolistIndex };
   } else {
      return rejectWithValue(res.data);
   }
});

export const todolistsReducer = slice.reducer;
export const todolistActions = slice.actions;
export const todolistThunks = { getTodolist, removeTodolist, addTodolist, updateTodolist, reorderTodolist };
export const { todolistsSlice } = slice.selectors;
