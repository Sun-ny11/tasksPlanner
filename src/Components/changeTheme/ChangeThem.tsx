import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AppRootStateType } from "app/store";
import { themeActions, themeState } from "./themeSlice";

const ITEM_HEIGHT = 48;

export default function ChangeThem() {
   const themeColor = useSelector<AppRootStateType, string>(themeState);

   const [selectedColor, setSelectedColor] = useState(themeColor);

   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
      localStorage.setItem("themeColor", JSON.stringify(selectedColor));
      dispatch(themeActions.changeTheme(selectedColor));
   };

   return (
      <div>
         <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
         >
            <MenuIcon />
         </IconButton>
         <Menu
            id="long-menu"
            MenuListProps={{
               "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
               style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "30ch",
               },
            }}
         >
            <MenuItem selected={false} disabled>
               Change theme
            </MenuItem>
            <MenuItem selected={false} onClick={() => {}}>
               <input
                  value={selectedColor}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                     setSelectedColor(e.currentTarget.value);
                  }}
                  type="color"
               />
            </MenuItem>
         </Menu>
      </div>
   );
}
