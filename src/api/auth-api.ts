import { FormikErrorType } from "Components/features/login/Login";
import { ResponseType } from "../utils/types/ResponseType";
import { instance } from "./instanse";

export type LoginType = {
   id: number;
   email: string;
   login: string;
};

export class AuthAPI {
   public login(data: FormikErrorType) {
      return instance.post<ResponseType<{ userId: number }>>("auth/login", data);
   }
   public logOut() {
      return instance.delete<ResponseType>("auth/login");
   }
   public me() {
      return instance.get<ResponseType<LoginType>>("auth/me");
   }
}
export const authAPI = new AuthAPI();
