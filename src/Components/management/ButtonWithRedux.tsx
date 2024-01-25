import React, { FC, memo } from "react";
import Button from '@mui/material/Button';

type ButtonWithReduxProps = {
   color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
   variant?: 'text' | 'outlined' | 'contained'
   onClick: () => void
   name: string
}

export const ButtonWithRedux: FC<ButtonWithReduxProps> = memo(({ color, variant, onClick, name }) => {
   console.log("ButtonWithRedux");
   return (
      <Button color={color} onClick={onClick} variant={variant} >{name}</Button>
   );
})