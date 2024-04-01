// import { UnknownAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { tasksReducer } from "./tasksReducer";
import { todolistsReducer } from "./todolistsReducer";
import { ThunkAction, thunk } from "redux-thunk";
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";
import { configureStore } from "@reduxjs/toolkit";

// мы задаём структуру нашего единственного объекта-состояния

// непосредственно создаём store
// export const store = legacy_createStore<any, any>(rootReducer, applyMiddleware(thunk)); //либо вторым параметром undefined

export const store = configureStore({
   reducer: {
      tasks: tasksReducer,
      todolists: todolistsReducer,
      app: appReducer,
      auth: authReducer,
   },
});
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>;

//Чтобы диспатчить санку в санку, общий тип
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>;

//Общий тип всех reducer
export type AppAllReducerType = any;
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
