import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "app/store";
import { ThunkDispatch } from "redux-thunk";
import { useFormik } from "formik";
import { FormikErrorType } from "../ui/Login";
import { authThunks, selectIsLoggedIn } from "features/login/model/authSlice";
import { BaseResponseType } from "common/types/ResponseType";

export const useLogin = () => {
   const dispatch: ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch();
   const isLoggedIn = useSelector<AppRootStateType, boolean>(selectIsLoggedIn);
   //ускорит валидацию библиотека Yup !!!

   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
         rememberMe: false,
         captcha: "",
      },
      validate: (values) => {
         const errors: FormikErrorType = {};
         if (!values.password) {
            errors.password = "Required";
         }
         if (!values.email) {
            errors.email = "Required";
         }
         return errors;
      },
      onSubmit: (values, formikHelpers) => {
         // alert(JSON.stringify(values, null, 2));
         dispatch(authThunks.login(values))
            .unwrap()
            .catch((e: BaseResponseType) => {
               if (e.fieldsErrors) {
                  e.fieldsErrors.forEach((el) => formikHelpers.setFieldError(el.field, el.error));
               }
            });
      },
   });

   return { isLoggedIn, formik };
};
