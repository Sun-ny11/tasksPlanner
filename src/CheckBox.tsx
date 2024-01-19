import Checkbox from "@mui/material/Checkbox";
import React, { ChangeEvent, FC, memo } from "react";

type CheckBoxType = {
   onChange: (i: boolean) => void
   checked: boolean
}

export const CheckBox: FC<CheckBoxType> = memo(({ onChange, checked }) => {
   console.log("CheckBox");
   

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.checked)
   }

   return (
      <>
         <Checkbox onChange={onChangeHandler} checked={checked} />
      </>
   );
})