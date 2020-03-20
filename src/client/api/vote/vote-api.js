import {api} from "../api";


export const voteApi = {
    vote : (id, status)=> api.get(`/api/vote/${id}/${status}`),
    votePVE : (id, status) => api.get(`/api/pve/${id}/${status}`),
    votePVP : (id, status) => api.get(`/api/pvp/${id}/${status}`)
}