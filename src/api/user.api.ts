import axios from "axios";

const url = "http://localhost:4800/api"

export class UserEndpoint {
    login = async (username: string, password: string) => {
        return await axios.post(url + '/user/login', { username, password })
    }
    verify = async (token: string) => {
        return await axios.get(url + '/user/verify', { headers: { "Access-Token": token}})
    }
}