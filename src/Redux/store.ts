import {combineReducers, legacy_createStore, compose} from "redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";

const rootReducer = combineReducers({
    todoList: todolistsReducer,
    tasks: tasksReducer
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// непосредственно создаём store
export const store = legacy_createStore(rootReducer, composeEnhancers());

export type AppRootStoreType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;