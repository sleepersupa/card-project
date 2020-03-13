import {api} from "../api";


export const cardApi = {
    addCard : (data)=> api.post('/api/manage-cards', data),
    modifyCard : (data) => api.post('/api/modify-card' , data),
    getCard : (id) => api.get(`/api/card/${id}`),
    getAll : () => api.get('/api/cards'),
    getOfGame : (game) => api.get(`/api/${game}/cards`),
    deleteCard : (id) => api.delete(`/api/card/${id}`)
}