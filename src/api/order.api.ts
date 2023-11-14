import axios from "axios";

const url = "http://localhost:4800/api";
const adminkey = "opa039jf0w4fnio;sa;f49jfsif;i;fnafdnfldf"

export class OrderEndpoint {
    post = async (title: string, desc: any, room_id: number, token: string) => {
        return await axios.post(url + '/order', { title, desc, room_id }, { headers: { "Access-Token": token, "Admin-Key": adminkey }})
    }
    get = async (token: string, status_order: any, room_id: any) => {
        return await axios.get(url + '/order?status_order=' + status_order + '&room_id=' + room_id, { headers: { "Access-Token": token, "Admin-Key": adminkey }})
    }
    delete = async (id: number, token: string) => {
        return await axios.delete(url + '/order/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey }} )
    }
}