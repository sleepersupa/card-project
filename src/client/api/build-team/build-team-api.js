import {api} from "../api";


export const buildTeamApi ={
    submit : (data) => api.post(`/api/build-team`, data),
    getBuilds : (game) => api.get(`/api/${game}/builds`),
    getBuild : (game,slug) => api.get(`/api/${game}/build/${slug}`)
}