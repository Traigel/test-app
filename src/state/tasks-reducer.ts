import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, setTodoListType} from './todolists-reducer';
import {TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type setTasksACType = ReturnType<typeof setTasksAC>
export type updateTaskACType = ReturnType<typeof updateTaskAC>
export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>

type ActionsType =
    | AddTodolistActionType
    | RemoveTodolistActionType | setTodoListType | setTasksACType | updateTaskACType | removeTaskACType | addTaskACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }

        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...action.task} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODO-LIST": {
            const copyState = {...state}
            action.todoLists.forEach(t => {
                copyState[t.id] = []
            })
            return copyState
        }
        case "SET-TASK": {
            return {
                ...state,
                [action.todoListsID]: action.tasks
            }
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string, task: TaskType, todolistId: string) => {
    return {type: 'UPDATE-TASK', task, todolistId, taskId} as const
}
export const setTasksAC = (todoListsID: string, tasks: TaskType[]) => {
    return {type: 'SET-TASK', todoListsID, tasks} as const
}

export const getTaskTC = (todoListsID: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.getTasks(todoListsID)
            .then(res => {
                dispatch(setTasksAC(todoListsID, res.data.items))
            })
    }

export const removeTaskTC = (todoListsID: string, taskID: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTask(todoListsID, taskID)
            .then(res => {
                dispatch(removeTaskAC(taskID, todoListsID))
            })
    }

export const addTaskTC = (title: string, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }

export const updateTaskTC = (todolistId: string, taskId: string, model: any) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                title: task.title,
                status: task.status,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                ...model
            })
                .then(res => {
                    dispatch(updateTaskAC(taskId, res.data.data.item, todolistId))
                })
        }
    }
