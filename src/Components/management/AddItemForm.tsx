import React, { ChangeEvent, KeyboardEvent, FC, useState, memo } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export type AddItemFormProps = {
   disabled?: boolean
   collBack: (title: string) => void
}

export const AddItemForm: FC<AddItemFormProps> = memo(({ disabled = false, collBack }) => {
   console.log("AddItemForm");

   let [title, setTitle] = useState("")
   let [error, setError] = useState<string | null>(null)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error) setError(null);
      if (e.charCode === 13) {
         addTask();
      }
   }

   const addTask = () => {
      if (title.trim() !== "") {
         collBack(title.trim());
         setTitle("");
      } else {
         setError("Title is required");
      }
   }
   const styles = {
      maxWidth: '38px',
      maxHeight: '38px',
      minWidth: '38px',
      minHeight: '38px',
   }
   return (
      <div>
         <TextField id="outlined-basic" label={error ? error : "Outlined"} variant="outlined"
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            size="small"
            error={!!error}
            disabled={disabled}
         />
         {/* <input value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}
         /> */}
         <Button onClick={addTask} size="small" variant="contained" style={styles} disabled={disabled}>+</Button>
      </div>
   );
})