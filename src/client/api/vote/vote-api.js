import {api} from "../api";


export const voteApi = {
    vote : (id, status)=> api.get(`/api/vote/${id}/${status}`)
}