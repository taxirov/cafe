<script lang="ts">
    import { userStore, type User, roleStore } from "../store";
    import { UserEndpoint } from '../api';

    const userEndpoint = new UserEndpoint();

    export let show: boolean
    export let close: () => void

    let name: HTMLInputElement
    let username: HTMLInputElement
    let password: HTMLInputElement
    let phone: HTMLInputElement
    let email: HTMLInputElement
    let salary: HTMLInputElement
    let role: HTMLSelectElement
    let admin_key: HTMLInputElement

    async function create() {
        try {
            const res = await userEndpoint.register(name.value, username.value, password.value, +salary.value, +role.value, phone.value, email.value, admin_key.value)
            const user: User = res.data.user
            userStore.update((pro) => { return pro.concat(user)})
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">
        <p class="text-xl text-center font-bold">Ishchi qo'shish</p>
        <div class="flex flex-col gap-3">
            <div class="role flex flex-col gap-2">
                <label class="font-semibold" for="desc">Roli*:</label>
                <select bind:this={role} class="outline-0 border-2 px-3 py-1 rounded" name="category" id="">
                    {#each $roleStore as role}
                        <option value="{role.id}">{role.name}</option>
                    {/each}
                </select>
            </div>
            <div class="name flex flex-col gap-2">
                <label class="font-semibold" for="fullname">Ismi*:</label>
                <input bind:this={name}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="fullname" id="" placeholder="Eshmatov Toshmat">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="username">Username*:</label>
                <input bind:this={username}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="username" id="" placeholder="toshmat">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="password">Parol*:</label>
                <input bind:this={password} class="outline-0 border-2 px-3 py-1 rounded" type="text" name="password" id="" placeholder="parol" />
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="phone">Telefon*:</label>
                <input bind:this={phone} class="outline-0 border-2 px-3 py-1 rounded" type="text" name="phone" id="" placeholder="+998905789204" />
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="email">Email*:</label>
                <input bind:this={email} class="outline-0 border-2 px-3 py-1 rounded" type='email' name="email" id="" placeholder="eshmatovtoshmat@gmail.com" />
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="salary">Oylik maosh*:</label>
                <input bind:this={salary} class="outline-0 border-2 px-3 py-1 rounded" type="text" name="salary" id="" placeholder="2000000" />
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="admin-key">Admin parol*:</label>
                <input bind:this={admin_key}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="admin-key" id="">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-600">Yopish</button>
            <button on:click={create} class="py-2 px-4 rounded-md text-white bg-green-600">Qo'shish</button>
        </div>
    </div>
</div>