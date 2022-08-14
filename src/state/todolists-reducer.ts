import {FilterValuesType, TodolistType} from "../AppRedux";
import {v1} from "uuid";

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeFilterACType = ReturnType<typeof changeFilterAC>
type ActionType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeFilterACType

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType>=> {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todoID)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.payload.toDoListID, title: action.payload.title, filter: 'all'},...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todoID ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.todoID ? {...el, filter: action.payload.value} : el)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todoID: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {todoID}} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', payload: {title, toDoListID: v1()}} as const
}
export const changeTodolistTitleAC = (todoID: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {todoID, title}} as const
}
export const changeFilterAC = (todoID: string, value: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {todoID, value}} as const
}