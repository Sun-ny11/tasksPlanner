import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { AppRootStateType } from "app/store";
import { themeState } from "Components/changeTheme/themeSlice";

export const useTheme = () => {
   const themeColor = useSelector<AppRootStateType, string>(themeState);

   const theme = createTheme({
      palette: {
         primary: {
            main: themeColor,
         },
         secondary: pink,
      },
   });

   return theme;
};
