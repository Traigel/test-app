import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        {/*<input value={title}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? "error" : ""}*/}
        {/*/>*/}
        <TextField
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            size={"small"}
            id="outlined-basic"
            label={error}
            variant="outlined"/>
        {/*<button onClick={addItem}>+</button>*/}
        <Button
            variant="contained"
            onClick={addItem}
            style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
        >+</Button>

        {/*<IconButton>*/}
        {/*    <AddBox onClick={addItem}/>*/}
        {/*</IconButton>*/}
        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}
