import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {ToDoApi} from "../api/api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        ToDoApi.getTodos()
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        ToDoApi.postTodos('ToDoList')
            .then(res => {
                setState(res.data.data.item)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        ToDoApi.deleteTodos('db6f7630-5d7a-40e2-8190-47c96e9a7aed')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        ToDoApi.putTodos('7d19b6eb-b564-4da7-994c-e8035bd74f80', 'newToDoList')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

