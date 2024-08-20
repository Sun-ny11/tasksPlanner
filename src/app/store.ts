// import { UnknownAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { tasksReducer } from "../features/todolistsLists/model/tasksSlice";
import { todolistsReducer } from "../features/todolistsLists/model/todolistsSlice";
import { appReducer } from "./appSlice";
import { authReducer } from "../features/login/model/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "Components/changeTheme/themeSlice";

// мы задаём структуру нашего единственного объекта-состояния

// непосредственно создаём store
// export const store = legacy_createStore<any, any>(rootReducer, applyMiddleware(thunk)); //либо вторым параметром undefined

export const store = configureStore({
   reducer: {
      tasks: tasksReducer,
      todolists: todolistsReducer,
      app: appReducer,
      auth: authReducer,
      theme: themeReducer,
   },
});
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>;

//Чтобы диспатчить санку в санку, общий тип
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
