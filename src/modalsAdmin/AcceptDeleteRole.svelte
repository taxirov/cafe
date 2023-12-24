<script lang="ts">
    import { roleStore, type Role, userStore, type User } from "../store";
    import { RoleEndpoint, UserEndpoint } from '../api';

    const roleEndpoint = new RoleEndpoint()
    const userEndpoint = new UserEndpoint()
    const token = localStorage.getItem('token')
    
    export let show: boolean
    export let close: () => void
    export let role_id: number

    let admin_key: string

    async function deleteRole() {
        let id = role_id
        try {
            const res = await roleEndpoint.delete(id, admin_key)
            const role: Role = res.data.role
            roleStore.update(rol => { return rol.filter(r => r.id != role.id) })
            const users: User[] = (await userEndpoint.get(token)).data.users
            userStore.set(users)
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 w-4/5 h-fit md:w-fit rounded-md shadow-md overflow-y-auto">
        <p class="text-xl text-center font-bold">Rolni o'chirish</p>
        <div class="flex flex-col gap-3">
            <p class="font-medium text-md text-center">Rolni o'chirishni tasdiqlaysizmi?</p>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Admin parol*:</label>
                <input bind:value={admin_key}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-400 font-bold">Yopish</button>
            <button on:click={deleteRole} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-bold">Tasdiqlash</button>
        </div>
    </div>
</div>