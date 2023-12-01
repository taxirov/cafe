import axios from "axios";
import { REST_API } from "../env";
const url = REST_API;

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