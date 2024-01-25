import React, { ChangeEvent, FC, memo, useState } from "react";

type EditableSpanProps = {
   oldTitle: string
   collBack: (title: string) => void
}

export const EditableSpan: FC<EditableSpanProps> = memo((props) => {
   console.log("EditableSpan");
   
   const [edit, setEdit] = useState(false)
   const [inputValue, setInputValue] = useState(props.oldTitle)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
   }

   const activateEditHandler = () => {
      setEdit(!edit)
      props.collBack(inputValue)
   }


   return (
      edit ?
         <input onChange={onChangeHandler} onBlur={activateEditHandler} autoFocus value={inputValue} type="text" />
         : <span onDoubleClick={activateEditHandler}>{props.oldTitle}</span>

   );
})