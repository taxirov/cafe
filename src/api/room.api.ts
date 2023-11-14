import axios from "axios";

const url = "http://localhost:4800/api";
const adminkey = "opa039jf0w4fnio;sa;f49jfsif;i;fnafdnfldf"

export class RoomEndpoint {
    post = async (name: string, desc: string, capacity: number, token: string) => {
        return await axios.post(url + '/room', { name, desc, capacity }, { headers: { "Access-Token": token, "Admin-Key": adminkey }})
    }
    get = async (token: string) => {
        return await axios.get(url + '/room', { headers: { "Access-Token": token, "Admin-Key": adminkey }})
    }
    delete = async (id: number, token: string) => {
        return await axios.delete(url + '/room/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey }} )
    }
}