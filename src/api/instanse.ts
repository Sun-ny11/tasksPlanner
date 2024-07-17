import axios from "axios";


export const instance = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.1",
   withCredentials: true,
   headers:{
      "API-KEY": "2eb33ab0-f72c-41b0-bade-ad7eaede43ea",
      // Authorization: "Bearer 4ef6cd48-7083-4a5e-b041-38d9975791b3"
   }
});
