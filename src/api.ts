import axios from "axios";
import { REST_API } from "./env";
const url = REST_API;

export class RoleEndpoint {
    post = async (name: string, admin_key: string) => {
        return await axios.post(url + '/role', { name }, { headers: { "Admin-Key": admin_key }})
    }
    get = async (admin_key: string) => {
        return await axios.get(url + '/role', { headers: { "Admin-Key": admin_key }})
    }
    delete = async (id: number, admin_key: string) => {
        return await axios.delete(url + '/role/' + id, { headers: { "Admin-Key": admin_key }} )
    }
}

export class UserEndpoint {
    register = async (name:string, username: string, password: string, salary: number, role_id: number, phone: string, email: string, admin_key: string) => {
        return await axios.post(url + '/user/register', { username, password, salary, name, role_id, phone, email }, { headers: { "Admin-Key": admin_key}})
    }
    login = async (username: string, password: string) => {
        return await axios.post(url + '/user/login', { username, password })
    }
    getTokenVerify = async (token: string) => {
        return await axios.get(url + '/user/verify', { headers: { "Access-Token": token }})
    }
    getAdminVerify = async (admin_key: string) => {
        return await axios.get(url + '/user/admin', { headers: { "Admin-Key": admin_key}})
    }
    get = async (token: string) => {
        return await axios.get(url + '/user', { headers: { "Access-Token": token }})
    }
}

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

export class ProductEndpoint {
    async post(category_id: number, name: string, price: number, desc: string, token: string, adminkey: string) {
        return await axios.post(
            url + '/product',
            { name, desc, category_id, price },
            { headers: { "Access-Token": token, "Admin-Key": adminkey }})
    }
    async get() {
        return await axios.get(url + '/product')
    }
    async getByCatgory(category_id: number) {
        return await axios.get(url + '/product?category_id=' + category_id)
    }
    async delete(id: number, token: string, adminkey: string) {
        return await axios.delete(url + '/product/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey }} )
    }
}

export class OrderEndpoint {
    async post(title: string, desc: string | null, room_id: number, token: string) {
        return await axios.post(url + '/order', { title, desc, room_id }, { headers: { "Access-Token": token }})
    }
    async get(token: string) {
        return await axios.get(url + '/order', { headers: { "Access-Token": token }} )
    }
    async getStatus(status_order: number, token: string) {
        return await axios.get(url + '/order?status_order=' + status_order, { headers: { "Access-Token": token }})
    }
    async getRoom( room_id: number, token: string) {
        return await axios.get(url + '/order/?room_id=' +  room_id, { headers: { "Access-Token": token }})
    }
    async getStatusRoom( status_order: number, room_id: number, token: string) {
        return await axios.get(url + '/order/?status_order=' + status_order + '&room_id=' + room_id, { headers: { "Access-Token": token }})
    }
    async delete(id: number, token: string) {
        return await axios.delete(url + '/order/' + id, { headers: { "Access-Token": token }} )
    }
    async patchStatus(id: number, status_order: boolean, token: string) {
        return await axios.patch(url + '/order/' + id + '/status', { status_order }, { headers: { "Access-Token": token }})
    }
    async patchTotal(id: number, total_price: boolean, token: string) {
        return await axios.patch(url + '/order/' + id + '/total', { total_price }, { headers: { "Access-Token": token }})
    }
}

export class ProductInOrderEndpoint {
    post = async (order_id: number, product_id: number, count: number, token: string) => {
        return await axios.post(url + '/productinorder', { order_id, product_id, count }, { headers: { "Access-Token": token }})
    }
    get = async (token: string, order_id: number | null) => {
        if(order_id) {
            return await axios.get(url + '/productinorder?order_id=' + order_id, { headers: { "Access-Token": token }})
        } else {
            return await axios.get(url + '/productinorder', { headers: { "Access-Token": token }})
        }
    }
    delete = async (id: number, token: string) => {
        return await axios.delete(url + '/productinorder/' + id, { headers: { "Access-Token": token }} )
    }
}