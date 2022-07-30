import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";

const rootReducer = combineReducers({
    todoList: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStoreType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store;