import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (editedNewTitle:string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [text, setText] = useState<string>(props.title)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(text)
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && offEditMode()

    return (
        editMode
            ? <input
                value={text}
                onChange={onChangeSetTitle}
                onBlur={offEditMode}
                onKeyPress={onKeyDownAddTask}
                autoFocus
            />
            : <span onDoubleClick={onEditMode}>
            {props.title}
        </span>
    );
};