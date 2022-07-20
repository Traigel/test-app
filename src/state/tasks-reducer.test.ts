import { v1 } from "uuid";
import {TasksStateType} from "../App";
import {
    addTitleTaskAC,
    deleteTitleTaskAC,
    newIsDoneTaskAC,
    newTitleTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

const toDoListID_1 = v1();
const toDoListID_2 = v1();
const taskID_1 = v1()

let tasks: TasksStateType;
beforeEach(() => {
    tasks = {
        [toDoListID_1]: [
            {id: taskID_1, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "TypeScript", isDone: false},
        ],
        [toDoListID_2]: [
            {id: v1(), title: "Hello", isDone: true},
            {id: v1(), title: "Yo! Bro", isDone: true},
        ],
    }
})

test('delete title task', () => {
    const tasksReducer1 = tasksReducer(tasks, deleteTitleTaskAC(toDoListID_1, taskID_1))
    expect(tasksReducer1[toDoListID_1][0].id).not.toBe(taskID_1)
    expect(tasksReducer1[toDoListID_1].length).toBe(3)
})

test('add title task', () => {
    const tasksReducer1 = tasksReducer(tasks, addTitleTaskAC(toDoListID_1, "New task"))
    expect(tasksReducer1[toDoListID_1][0].title).toBe("New task")
})
test('new is done task', () => {
    const tasksReducer1 = tasksReducer(tasks, newIsDoneTaskAC(toDoListID_1, taskID_1, false))
    expect(tasksReducer1[toDoListID_1][0].isDone).toBe(false)
})
test('new is title task', () => {
    const tasksReducer1 = tasksReducer(tasks, newTitleTaskAC(toDoListID_1, taskID_1, 'New title'))
    expect(tasksReducer1[toDoListID_1][0].title).toBe('New title')
})
test('new toDoList task', () => {
    const tasksReducer1 = tasksReducer(tasks, addTodolistAC(''))
    expect(Object.keys(tasksReducer1).length).toBe(3)
})
test('delete toDoList task', () => {
    const tasksReducer1 = tasksReducer(tasks, removeTodolistAC(toDoListID_1))
    expect(tasksReducer1.hasOwnProperty(toDoListID_1)).toBe(false)
})

