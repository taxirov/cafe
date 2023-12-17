import axios from "axios";

const REST_API = "https:/webpack.uz:4800/api"

export class RoleEndpoint {
    async post(name: string, admin_key: string) {
        return await axios.post(REST_API + '/role', { name }, { headers: { "Admin-Key": admin_key } })
    }
    async get() {
        return await axios.get(REST_API + '/role')
    }
    async delete(id: number, admin_key: string) {
        return await axios.delete(REST_API + '/role/' + id, { headers: { "Admin-Key": admin_key } })
    }
}

export class UserEndpoint {
    register = async (name: string, username: string, password: string, salary: number, role_id: number, phone: string, email: string, admin_key: string) => {
        return await axios.post(REST_API + '/user/register', { username, password, salary, name, role_id, phone, email }, { headers: { "Admin-Key": admin_key } })
    }
    login = async (username: string, password: string) => {
        return await axios.post(REST_API + '/user/login', { username, password }, { headers: { "Content-Type": "application/json" } })
    }
    getTokenVerify = async (token: string) => {
        return await axios.get(REST_API + '/user/verify', { headers: { "Access-Token": token } })
    }
    getAdminVerify = async (admin_key: string) => {
        return await axios.get(REST_API + '/user/admin', { headers: { "Admin-Key": admin_key } })
    }
    get = async (token: string) => {
        return await axios.get(REST_API + '/user', { headers: { "Access-Token": token } })
    }
}

export class RoomEndpoint {
    post = async (name: string, desc: string, capacity: number, token: string, admin_key: string) => {
        return await axios.post(REST_API + '/room', { name, desc, capacity }, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
    put = async (id: number, name: string, desc: string, capacity: number, token: string, admin_key: string) => {
        return await axios.put(REST_API + '/room/' + id, { name, desc, capacity }, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
    get = async (token: string) => {
        return await axios.get(REST_API + '/room', { headers: { "Access-Token": token } })
    }
    delete = async (id: number, token: string, admin_key: string) => {
        return await axios.delete(REST_API + '/room/' + id, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
}

export class CategoryEndpoint {
    async post(name: string, desc: string, token: string, adminkey: string) {
        return await axios.post(REST_API + '/category', { name, desc }, { headers: { "Access-Token": token, "Admin-Key": adminkey } })
    }
    async get() {
        return await axios.get(REST_API + '/category')
    }
    async delete(id: number, token: string, adminkey: string) {
        return await axios.delete(REST_API + '/category/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey } })
    }
}

export class ProductEndpoint {
    async post(category_id: number, name: string, price: number, desc: string, token: string, adminkey: string) {
        return await axios.post(
            REST_API + '/product',
            { name, desc, category_id, price },
            { headers: { "Access-Token": token, "Admin-Key": adminkey } })
    }
    async get() {
        return await axios.get(REST_API + '/product')
    }
    async getByCatgory(category_id: number) {
        return await axios.get(REST_API + '/product?category_id=' + category_id)
    }
    async delete(id: number, token: string, adminkey: string) {
        return await axios.delete(REST_API + '/product/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey } })
    }
}

export class OrderEndpoint {
    async post(title: string, desc: string | null, room_id: number | null, token: string) {
        return await axios.post(REST_API + '/order', { title, desc, room_id }, { headers: { "Access-Token": token } })
    }
    async get(token: string) {
        return await axios.get(REST_API + '/order', { headers: { "Access-Token": token } })
    }
    async getStatus(status_order: number, token: string) {
        return await axios.get(REST_API + '/order?status_order=' + status_order, { headers: { "Access-Token": token } })
    }
    async getRoom(room_id: number, token: string) {
        return await axios.get(REST_API + '/order?room_id=' + room_id, { headers: { "Access-Token": token } })
    }
    async getStatusRoom(status_order: number, room_id: number, token: string) {
        return await axios.get(REST_API + '/order?status_order=' + status_order + '&room_id=' + room_id, { headers: { "Access-Token": token } })
    }
    async delete(id: number, token: string, admin_key: string) {
        return await axios.delete(REST_API + '/order/' + id, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
    async patchStatus(id: number, status: number, token: string, admin_key: string) {
        return await axios.patch(REST_API + '/order/' + id + '/status', { status }, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
    async getStatusUser(status_order: number, user_id: number, token: string) {
        return await axios.patch(REST_API + '/order?status_order=' + status_order + '&user_id=' + user_id, { headers: { "Access-Token": token } })
    }
    async getWaiterOrders(token: string) {
        return await axios.get(REST_API + '/order/waiter', { headers: { "Access-Token": token } })
    }
}

export class ProductInOrderEndpoint {
    async post(order_id: number, product_id: number, count: number, token: string) {
        return await axios.post(REST_API + '/productinorder', { order_id, product_id, count }, { headers: { "Access-Token": token } })
    }
    async get(token: string, order_id: number | null) {
        if (order_id) {
            return await axios.get(REST_API + '/productinorder?order_id=' + order_id, { headers: { "Access-Token": token } })
        } else {
            return await axios.get(REST_API + '/productinorder', { headers: { "Access-Token": token } })
        }
    }
    async delete(id: number, token: string) {
        return await axios.delete(REST_API + '/productinorder/' + id, { headers: { "Access-Token": token } })
    }
    async put(id: number, product_id: number, count: number, token: string) {
        return await axios.put(REST_API + '/productinorder/' + id, { product_id, count }, { headers: { "Access-Token": token } })
    }
    async patchStatus(id: number, status: number, token: string) {
        return await axios.patch(REST_API + '/productinorder/' + id + '/status', { status }, { headers: { "Access-Token": token } })
    }
}
