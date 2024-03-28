import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { AppRootStateType } from "../../../reducers/store";
import { loginTC } from "../../../reducers/authReducer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export type FormikErrorType = {
   email?: string;
   password?: string;
   rememberMe?: boolean;
};

export const Login = () => {
   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();
   const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);
   //ускорит валидацию библиотека Yup !!!

   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
         rememberMe: false,
      },
      validate: (values) => {
         const errors: FormikErrorType = {};

         if (!values.password) {
            errors.password = "Required";
         } else if (values.password.length < 2) {
            errors.password = "Must be 2 characters or more";
         }

         if (!values.email) {
            errors.email = "Required";
         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
         }
         return errors;
      },
      onSubmit: (values) => {
         // alert(JSON.stringify(values, null, 2));
         dispatch(loginTC(values));
         formik.resetForm({
            values: {
               email: "",
               password: "",
               rememberMe: true,
            },
         }); //после отправки будут значения из resetForm
      },
   });

   console.log(formik.touched);

   if (isLoggedIn) {
      return <Navigate to={"/second-todolist"} />;
   }

   return (
      <Grid container justifyContent={"center"}>
         <Grid item justifyContent={"center"}>
            <form onSubmit={formik.handleSubmit}>
               {" "}
               {/* handleSubmit функция которая вернет результат метода onSubmit передав в нее values */}
               <FormControl>
                  <FormLabel>
                     <p>
                        To log in get registered
                        <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                           {" "}
                           here
                        </a>
                     </p>
                     <p>or use common test account credentials:</p>
                     <p>Email: free@samuraijs.com</p>
                     <p>Password: free</p>
                  </FormLabel>
                  <FormGroup>
                     <TextField
                        label="Email"
                        margin="normal"
                        error={!!formik.errors.email && formik.touched.email}
                        {...formik.getFieldProps("email")}
                     />
                     {/* чтобы не заполнять руками value,name,onChange,onBlur, есть метод заменяющий их getFieldProps */}

                     {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}

                     <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={!!formik.errors.password && formik.touched.password}
                     />
                     {/* код без метода getFieldProps */}
                     {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}

                     <FormControlLabel
                        label={"Remember me"}
                        control={
                           <Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />
                        }
                     />
                     {/* onChange начнет всплытие до form onSubmit */}
                     <Button type={"submit"} variant={"contained"} color={"primary"}>
                        Login
                     </Button>
                  </FormGroup>
               </FormControl>
            </form>
         </Grid>
      </Grid>
   );
};
