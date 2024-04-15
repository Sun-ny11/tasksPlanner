import { FormikErrorType } from "Components/features/login/Login";
import { BaseResponseType } from "../utils/types/ResponseType";
import { instance } from "./instanse";

export type LoginType = {
   id: number;
   email: string;
   login: string;
};

export class AuthAPI {
   public login(data: FormikErrorType) {
      return instance.post<BaseResponseType<{ userId: number }>>("auth/login", data);
   }
   public logOut() {
      return instance.delete<BaseResponseType>("auth/login");
   }
   public me() {
      return instance.get<BaseResponseType<LoginType>>("auth/me");
   }
}
export const authAPI = new AuthAPI();
