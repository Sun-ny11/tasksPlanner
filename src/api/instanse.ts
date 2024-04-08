import axios from "axios";

const settings = {
   withCredentials: true,
   apikey: "5cacf4cb-7927-4b35-b1cd-f53e382df6e8",
};

export const instance = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1",
   ...settings,
});
