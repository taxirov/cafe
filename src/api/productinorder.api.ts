import axios from "axios";

const url = "http://localhost:4800/api";

export class ProductInOrderEndpoint {
    // done
    post = async (order_id: number, product_id: number, count: number, token: string) => {
        return await axios.post(url + '/productinorder', { order_id, product_id, count }, { headers: { "Access-Token": token }})
    }

    // done
    get = async (token: string, order_id: number | null) => {
        if(order_id) {
            return await axios.get(url + '/productinorder?order_id=' + order_id, { headers: { "Access-Token": token }})
        } else {
            return await axios.get(url + '/productinorder', { headers: { "Access-Token": token }})
        }
    }

    // done
    delete = async (id: number, token: string) => {
        return await axios.delete(url + '/productinorder/' + id, { headers: { "Access-Token": token }} )
    }
}
