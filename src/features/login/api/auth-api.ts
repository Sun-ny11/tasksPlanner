import { FormikErrorType } from "features/login/ui/Login";
import { BaseResponseType } from "../../../common/types/ResponseType";
import { instance } from "../../../api/instanse";

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
   public getCaptchaUrl() {
      return instance.get<{ url: string }>("/security/get-captcha-url");
   }
}
export const authAPI = new AuthAPI();
