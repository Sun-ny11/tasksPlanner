import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { selectCaptchaUrl } from "../model/authSlice";
import { FormikProps } from "formik";

type Props = {
   formik: FormikProps<{
      email: string;
      password: string;
      rememberMe: boolean;
      captcha: string;
   }>;
};
export const Captcha = ({ formik }: Props) => {
   const captchaUrl = useSelector(selectCaptchaUrl);

   const [open, setOpen] = React.useState(true);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <React.Fragment>
         <Button variant="outlined" onClick={handleClickOpen}>
            Enter a captcha
         </Button>
         <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
               component: "form",
               onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                  handleClose();
               },
            }}
         >
            <DialogTitle>Enter the characters from the image</DialogTitle>
            <DialogContent>
               <img src={captchaUrl} alt="captcha" />
               <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="captcha"
                  label="Captcha..."
                  type="text"
                  fullWidth
                  variant="standard"
                  value={formik.values.captcha}
                  onChange={formik.handleChange}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button type="submit">Submit </Button>
            </DialogActions>
         </Dialog>
      </React.Fragment>
   );
};
