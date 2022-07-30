import {TasksStateType} from "../AppRedux"
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType, todolistId1, todolistId2} from "./todolists-reducer";

export type DeleteTitleTaskACType = ReturnType<typeof deleteTitleTaskAC>
export type AddTitleTaskACType = ReturnType<typeof addTitleTaskAC>
export type NewIsDoneTaskACType = ReturnType<typeof newIsDoneTaskAC>
export type NewTitleTaskACType = ReturnType<typeof newTitleTaskAC>

type ActionsType = DeleteTitleTaskACType | AddTitleTaskACType | NewIsDoneTaskACType
    | NewTitleTaskACType | AddTodolistACType | RemoveTodolistACType

const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'DELETE-TITLE-TASK':
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].filter(el => el.id !== action.taskID)
            }
        case 'ADD-TITLE-TASK':
            return {
                ...state,
                [action.toDoListID]: [{id: v1(), title: action.newTitle, isDone: false}, ...state[action.toDoListID]]
            }
        case 'NEW-IS-DONE-TASK':
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(el => el.id === action.taskID ? {
                    ...el,
                    isDone: action.newIsDone
                } : el)
            }
        case 'NEW-TITLE-TASK':
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(el => el.id === action.taskID ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.payload.toDoListID]: []
            }
        case 'REMOVE-TODOLIST': {
            let {[action.payload.todoID]: remove, ...copyState} = {...state}
            return copyState
        }
        default:
            return state
    }
}

export const deleteTitleTaskAC = (toDoListID: string, taskID: string) => {
    return {type: 'DELETE-TITLE-TASK', toDoListID, taskID} as const
}
export const addTitleTaskAC = (toDoListID: string, newTitle: string) => {
    return {type: 'ADD-TITLE-TASK', toDoListID, newTitle} as const
}
export const newIsDoneTaskAC = (toDoListID: string, taskID: string, newIsDone: boolean) => {
    return {type: 'NEW-IS-DONE-TASK', toDoListID, taskID, newIsDone} as const
}
export const newTitleTaskAC = (toDoListID: string, taskID: string, newTitle: string) => {
    return {type: 'NEW-TITLE-TASK', toDoListID, taskID, newTitle} as const
}
