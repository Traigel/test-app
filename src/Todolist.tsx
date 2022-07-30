import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {Button, Checkbox, IconButton} from '@mui/material';
import {TodolistType} from "./AppRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "./Redux/store";
import {addTitleTaskAC, deleteTitleTaskAC, newIsDoneTaskAC, newTitleTaskAC} from "./state/tasks-reducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function Todolist(props: PropsType) {

    let tasks = useSelector<AppRootStoreType, Array<TaskType>>(state => state.tasks[props.todolist.id])
    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTitleTaskAC(props.todolist.id, title))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.todolist.id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(props.todolist.id, title))

    }

    const onAllClickHandler = () => dispatch(changeFilterAC(props.todolist.id, "all"))
    const onActiveClickHandler = () => dispatch(changeFilterAC(props.todolist.id, "active"))
    const onCompletedClickHandler = () => dispatch(changeFilterAC(props.todolist.id, "completed"))

    if (props.todolist.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.todolist.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }


    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => {
                        dispatch(deleteTitleTaskAC(props.todolist.id, t.id))
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(newIsDoneTaskAC(props.todolist.id, t.id, newIsDoneValue))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(newTitleTaskAC(props.todolist.id, t.id, newValue))
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={"primary"}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


