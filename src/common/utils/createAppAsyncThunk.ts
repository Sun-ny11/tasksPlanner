import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppRootStateType } from "app/store";
import { BaseResponseType } from "../types/ResponseType";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
   state: AppRootStateType;
   rejectValue: null | BaseResponseType;
}>();
//санка созданная с помощью createAsyncThunk всегда возвращает зарезолвленый промис
//это может исправить .unwrap(), он вернет стандартное поведение then catch
