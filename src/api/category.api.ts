import axios from "axios";

const url = "http://localhost:4800/api";

export class CategoryEndpoint {
    post = async (name: string, desc: string, token: string, adminkey: string) => {
        return axios.post(url + '/category', { name, desc }, { headers: { "Access-Token": token, "Admin-Key": adminkey }})
    }
    get = async (token: string) => {
        return axios.get(url + '/category', { headers: { "Access-Token": token }})
    }
    delete = async (id: number, token: string, adminkey: string) => {
        return axios.delete(url + '/category/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey }} )
    }
}