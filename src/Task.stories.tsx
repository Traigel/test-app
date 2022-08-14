import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";

export default {                      //по дефолту создаётся компонент в StoryBook
    title: 'ToDoList/Task',      //имя папки (Example) и в ней раздел (Button)
    component: Task,             //компонента которую мы используем
    argTypes: {                         //описываем свойства нашей компоненты
        tasks: {
            description: 'tasks toDoList'
        },
        todolistID: {
            description: 'ID toDoList'
        },
    },
    args: {                 //значение (пропсы) будет пренадлежать всем историям
      todolistID: '1',
    },
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

//на основе компоненты (AddItemForm), создаём образец (Template)
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

//создаём историю, привязываем пустой объект наших пропсов (args)
export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    tasks: {id: '1', title: 'JS/TS', isDone: true}
};

export const TaskNotDone = Template.bind({});
TaskNotDone.args = {
    tasks: {id: '1', title: 'CSS/HTML', isDone: false}
};
