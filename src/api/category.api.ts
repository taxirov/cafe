import axios from "axios";

const url = "//31.129.110.72:4800/api";

export class CategoryEndpoint {
    post = async (name: string, desc: string, token: string, adminkey: string) => {
        return axios.post(url + '/category', { name, desc }, { headers: { "Access-Token": token, "Admin-Key": adminkey }})
    }
    get = async () => {
        return axios.get(url + '/category')
    }
    delete = async (id: number, token: string, adminkey: string) => {
        return axios.delete(url + '/category/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey }} )
    }
}