import React, { FC, memo } from "react";
import Button from "@mui/material/Button";

type FilterButtonProps = {
   color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
   variant?: "text" | "outlined" | "contained";
   onClick: () => void;
   name: string;
};

export const FilterButton = memo(({ color, variant, onClick, name }: FilterButtonProps) => {
   console.log("ButtonWithRedux");
   return (
      <Button color={color} onClick={onClick} variant={variant}>
         {name}
      </Button>
   );
});
