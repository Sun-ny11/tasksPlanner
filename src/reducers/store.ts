import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { taskReducerType, tasksReducer } from './tasksReducer';
import { todolistsReducer, todolistsReducerType } from './todolistsReducer';
import { ThunkAction, thunk } from 'redux-thunk';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore<any, any>(rootReducer, applyMiddleware(thunk));//либо вторым параметром undefined
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

//Чтобы диспатчить санку в санку, общий тип
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppAllReducerType>

//Общий тип всех reducer
export type AppAllReducerType = taskReducerType | todolistsReducerType
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
