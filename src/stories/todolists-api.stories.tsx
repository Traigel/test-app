import React, {useEffect, useState} from 'react'
import {ToDoApi} from "../api/api";

export default {
    title: 'TodolistsAPI'
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
        ToDoApi.postTodos('new___ToDoList')
            .then(res => {
                setState(res.data.data.item)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        ToDoApi.deleteTodos('84b897d1-4b82-454d-a9f0-a07ed9b81c3d')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        ToDoApi.putTodos('e85b39c5-c325-4647-8b71-787910c25158', 'Skills')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

