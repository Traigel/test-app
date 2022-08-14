import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {                      //по дефолту создаётся компонент в StoryBook
  title: 'ToDoList/AddItemForm',      //имя папки (Example) и в ней раздел (Button)
  component: AddItemForm,             //компонента которую мы используем
  argTypes: {                         //описываем свойства нашей компоненты
    addItem: {
      description: 'button clicked inside form'
    },
  },
} as ComponentMeta<typeof AddItemForm>;

//на основе компоненты (AddItemForm), создаём образец (Template)
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

//создаём историю, привязываем пустой объект наших пропсов (args)
export const Primary = Template.bind({});
Primary.args = {
  addItem: action('Button clicked inside form')   //при клике выдаст текст и данные
};
