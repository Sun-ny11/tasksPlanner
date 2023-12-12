import React, { ChangeEvent, KeyboardEvent, FC, useState } from "react";

type AddItemFormProps = {
   // title:string
   collBack: (title: string) => void
}

export const AddItemForm: FC<AddItemFormProps> = (props) => {
   let [title, setTitle] = useState("")
   let [error, setError] = useState<string | null>(null)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.charCode === 13) {
         addTask();
      }
   }

   const addTask = () => {
      if (title.trim() !== "") {
         props.collBack(title.trim());
         setTitle("");
      } else {
         setError("Title is required");
      }
   }

   return (
      <div>
         <input value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}
         />
         <button onClick={addTask}>+</button>
         {error && <div className="error-message">{error}</div>}
      </div>
   );
};