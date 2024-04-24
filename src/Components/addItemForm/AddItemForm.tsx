import React, { ChangeEvent, KeyboardEvent, useState, memo } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export type AddItemFormProps = {
   disabled?: boolean;
   collBack: (title: string) => Promise<any>;
};

export const AddItemForm = memo(({ disabled = false, collBack }: AddItemFormProps) => {
   let [title, setTitle] = useState("");
   let [error, setError] = useState<string | null>(null);

   const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
   };

   const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error) setError(null);
      if (e.charCode === 13) {
         addTask();
      }
   };

   const addTask = () => {
      if (title.trim() !== "") {
         collBack(title.trim())
            .then((res) => {
               setTitle("");
            })
            .catch((error: any) => {
               setError("Ooops, it's error");
               // Для отображения ошибки в флде
               // setError(error.messages[0]);
            });
      } else {
         setError("Title is required");
      }
   };
   const styles = {
      maxWidth: "38px",
      maxHeight: "38px",
      minWidth: "38px",
      minHeight: "38px",
   };
   return (
      <div>
         <TextField
            id="outlined-basic"
            label={error ? error : "Outlined"}
            variant="outlined"
            value={title}
            onChange={changeTitleHandler}
            onKeyPress={onKeyPressAddTask}
            size="small"
            error={!!error}
            disabled={disabled}
         />
         <Button onClick={addTask} size="small" variant="contained" style={styles} disabled={disabled}>
            +
         </Button>
      </div>
   );
});
