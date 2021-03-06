import {api} from "../api";

export const gameApi ={
    getAll : () => api.get("/api/games"),
    addGame : (data) => api.post("/api/game" , data),
    getGame : (id) => api.get(`/api/game/${id}`),
    getGameBySlug : (slug) => api.get(`/api/game/by-slug/${slug}`),
    editGame : (data) => api.put("/api/game" ,data)
}