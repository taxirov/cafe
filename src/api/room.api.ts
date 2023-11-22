import axios from "axios";

const url = "http://localhost:4800/api";

export class RoomEndpoint {
    post = async (name: string, desc: string, capacity: number, token: string, admin_key: string) => {
        return await axios.post(url + '/room', { name, desc, capacity }, { headers: { "Access-Token": token, "Admin-Key": admin_key }})
    }
    put = async (id: number, name: string, desc: string, capacity: number, token: string, admin_key: string) => {
        return await axios.put(url + '/room/' + id, { name, desc, capacity }, { headers: { "Access-Token": token, "Admin-Key": admin_key }})
    }
    get = async (token: string) => {
        return await axios.get(url + '/room', { headers: { "Access-Token": token }})
    }
    delete = async (id: number, token: string, admin_key: string) => {
        return await axios.delete(url + '/room/' + id, { headers: { "Access-Token": token, "Admin-Key": admin_key }} )
    }
}