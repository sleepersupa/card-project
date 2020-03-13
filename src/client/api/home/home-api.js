import {api} from "../api";


export const homeApi ={
    getHome : () => api.get("/api/home")
}