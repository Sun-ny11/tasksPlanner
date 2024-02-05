import Checkbox from "@mui/material/Checkbox";
import React, { ChangeEvent, FC, memo } from "react";

type CheckBoxType = {
   onChangeCallBack: (i: boolean) => void
   checked: boolean
}

export const CheckBox: FC<CheckBoxType> = memo(({ onChangeCallBack, checked }) => {
   console.log("CheckBox");


   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeCallBack(e.currentTarget.checked)
   }

   return (
      <>
         <Checkbox onChange={onChangeHandler} checked={checked} />
      </>
   );
})