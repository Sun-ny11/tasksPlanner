import React, { ChangeEvent, memo, useState } from "react";

type Props = {
   oldTitle: string;
   collBack: (title: string) => void;
};

export const EditableSpan = memo(({ oldTitle, collBack }: Props) => {
   console.log("EditableSpan");

   const [edit, setEdit] = useState(false);
   const [inputValue, setInputValue] = useState(oldTitle);

   const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value);
   };

   const activateEditHandler = () => {
      setEdit(!edit);
      collBack(inputValue);
   };

   return edit ? (
      <input onChange={changeValueHandler} onBlur={activateEditHandler} autoFocus value={inputValue} type="text" />
   ) : (
      <span onDoubleClick={activateEditHandler}>{oldTitle}</span>
   );
});
