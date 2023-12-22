<script lang="ts">
    import { roleStore, type Role, userStore, type User } from "../store"
    import { RoleEndpoint, UserEndpoint } from '../api'

    const roleEndpoint = new RoleEndpoint()
    const userEndpoint = new UserEndpoint()
    const token = localStorage.getItem('token')
    
    export let show: boolean
    export let close: () => void
    export let role: Role

    let name: HTMLInputElement
    let admin_key: string

    async function edit() {
        let id = role.id
        try {
            const res = await roleEndpoint.put(id, name.value, admin_key)
            const role: Role = res.data.role
            roleStore.update(rol => { return rol.filter(r => r.id != role.id) })
            roleStore.update(rol => rol.concat([role]))
            const users: User[] = (await userEndpoint.get(token)).data.users
            userStore.set(users)
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">
        <p class="text-xl text-center font-bold">Rolni tahrirlash</p>
        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Nomi*:</label>
                <input bind:this={name} value="{role.name}"  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="" placeholder="admin">
                <p class="text-red-500 font-medium">Rol nomi takrorlanmasligi kerak!</p>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Admin parol*:</label>
                <input bind:value={admin_key}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-400 font-bold">Yopish</button>
            <button on:click={edit} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-bold">Saqlash</button>
        </div>
    </div>
</div>