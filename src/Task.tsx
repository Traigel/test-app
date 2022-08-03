import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {deleteTitleTaskAC, newIsDoneTaskAC, newTitleTaskAC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskType} from "./Todolist";

export type TaskCType = {
    todolistID: string
    tasks: TaskType
}

export const Task = memo( ({todolistID, tasks,}: TaskCType) => {

    console.log('tasks')

    const dispatch = useDispatch()

    const onClickHandler = () => {
        dispatch(deleteTitleTaskAC( todolistID, tasks.id))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(newIsDoneTaskAC( todolistID, tasks.id, newIsDoneValue))
    }
    const onTitleChangeHandler = useCallback( (newValue: string) => {
        dispatch(newTitleTaskAC( todolistID, tasks.id, newValue))
    }, [dispatch])

    return <div className={tasks.isDone ? "is-done" : ""}>
        <Checkbox
            checked={tasks.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={tasks.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})