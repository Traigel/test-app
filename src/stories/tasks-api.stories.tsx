import React, {useEffect, useState} from 'react'
import {TasksAPI, ToDoApi} from "../api/api";
import axios from "axios";

export default {
    title: 'TasksAPI'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TasksAPI.getTask('532b6c39-dc5a-4c81-afc8-55bc5be0bd90')
            .then(res => {
                setState(res.data.items)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TasksAPI.postTask('532b6c39-dc5a-4c81-afc8-55bc5be0bd90', 'lala'
        )
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TasksAPI.deleteTask('532b6c39-dc5a-4c81-afc8-55bc5be0bd90', '3be3d5e0-73f2-459c-ac9b-f2d41471f726')
            .then((res) => {
                console.log(res)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TasksAPI.putTask('532b6c39-dc5a-4c81-afc8-55bc5be0bd90', '87bf010f-f570-4998-ab6f-b5992cf30f85', 'newNameTask')
            .then(res => {

            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

