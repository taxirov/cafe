import axios from "axios";

const url = "//31.129.110.72:4800/api";

export class RoleEndpoint {
    // done
    post = async (name: string, admin_key: string) => {
        return await axios.post(url + '/role', { name }, { headers: { "Admin-Key": admin_key }})
    }

    // done
    get = async (admin_key: string) => {
        return await axios.get(url + '/role', { headers: { "Admin-Key": admin_key }})
    }

    // done
    delete = async (id: number, admin_key: string) => {
        return await axios.delete(url + '/role/' + id, { headers: { "Admin-Key": admin_key }} )
    }
}
