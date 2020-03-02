import {api} from "../api";


export const buildTeamApi ={
    submit : (data) => api.post("/api/build-team", data)
}