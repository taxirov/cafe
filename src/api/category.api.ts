import axios from "axios";

const url = "http://localhost:4800/api";
const adminkey = "opa039jf0w4fnio;sa;f49jfsif;i;fnafdnfldf"

export class CategoryEndpoint {
    post = async (name: string, desc: string, token: string) => {
        return await axios.post(url + '/category', { name, desc }, { headers: { "Access-Token": token, "Admin-Key": adminkey }})
    }
    get = async () => {
        return await axios.get(url + '/category')
    }
    delete = async (id: number, token: string) => {
        return await axios.delete(url + '/category/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey }} )
    }
}