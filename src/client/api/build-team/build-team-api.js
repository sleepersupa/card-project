import {api} from "../api";


export const buildTeamApi ={
    submit : (data) => api.post("/api/build-team", data),
    getBuilds : () => api.get("/api/builds"),
    getBuild : (slug) => api.get(`/api/build/${slug}`)
}