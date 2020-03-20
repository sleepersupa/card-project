import {api} from "../api";


export const cardApi = {
    addCard : (data)=> api.post('/api/manage-cards', data),
    modifyCard : (data) => api.post('/api/modify-card' , data),
    getCardById : (id) => api.get(`/api/card/${id}`),
    getAll : () => api.get('/api/cards'),
    getAllOfGame : (game) => api.get(`/api/${game}/cards`),
    getCardOfGame : (game , slug) => api.get(`/api/${game}/card/${slug}`),
    deleteCard : (id) => api.delete(`/api/card/${id}`),
    getOverview : ( game,slug) => api.get(`/api/${game}/card/overview/${slug}`)
}