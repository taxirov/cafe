import axios from "axios";

const url = "http://localhost:4800/api";

export class ProductEndpoint {
    post = async (category_id: number, name: string, price: number, desc: string, token: string, adminkey: string) => {
        return await axios.post(url + '/product', { name, desc, category_id, price }, { headers: { "Access-Token": token, "Admin-Key": adminkey }})
    }
    get = async () => {
        return await axios.get(url + '/product')
    }
    getByCatgory = async (category_id: number) => {
        return await axios.get(url + '/product?category_id=' + category_id)
    }
    delete = async (id: number, token: string, adminkey: string) => {
        return await axios.delete(url + '/product/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey }} )
    }
}