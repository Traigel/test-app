import axios, {AxiosResponse} from "axios";
import {CreateTodolist} from "../stories/todolists-api.stories";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b9c59615-46e7-4032-afb6-5c6e3ef180ec'
    }
})


export const ToDoApi = {
    getTodos() {
        return instance.get<ToDoListType[]>('todo-lists')
    },
    postTodos(title: string) {
        return instance.post<'', AxiosResponse<CommonTodoResponseType<{ item: ToDoListType }>>, { title: string }>('todo-lists', {title})
    },
    deleteTodos(toDoID: string) {
        return instance.delete<CommonTodoResponseType>(`todo-lists/${toDoID}`)
    },
    putTodos(toDoID: string, title: string) {
        return instance.put<CommonTodoResponseType>(`todo-lists/${toDoID}`, {title})
    },
}

export const TasksAPI = {
    getTask(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    postTask(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    putTask(toDoID: string, taskID: string, title: string) {
        return instance.put(`todo-lists/${toDoID}/tasks/${taskID}`, {title})
    },
}

export type ToDoListType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}

export type CommonTodoResponseType<T = {}> = {
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
    data: T
}