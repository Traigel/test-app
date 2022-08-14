import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AppRedux from "./AppRedux";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";

export default {                      //по дефолту создаётся компонент в StoryBook
    title: 'ToDoList/AppRedux',      //имя папки (Example) и в ней раздел (Button)
    component: AppRedux,             //компонента которую мы используем
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
} as ComponentMeta<typeof AppRedux>;

//на основе компоненты (AddItemForm), создаём образец (Template)
const Template: ComponentStory<typeof AppRedux> = (args) => <AppRedux/>

//создаём историю, привязываем пустой объект наших пропсов (args)
export const Primary = Template.bind({});
