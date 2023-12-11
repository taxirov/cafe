<script lang="ts">
    import { categoryStore } from "../store"
    import { CategoryEndpoint } from '../api'

    const categoryEndpoint = new CategoryEndpoint()
    const token = localStorage.getItem('token')
    export let show: boolean
    export let close: () => void

    let name: string
    let desc: string
    let admin_key: string

    async function create() {
        try {
            const res = await categoryEndpoint.post(name, desc, token, admin_key)
            categoryStore.update((cat) => { return cat.concat(res.data.category)})
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">

        <p class="text-xl text-center font-bold">Kategoriya qo'shish</p>

        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="category-name">Nomi*:</label>
                <input bind:value={name}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="category-name" id="" placeholder="Ichimliklar">
                <p class="text-red-500 font-medium">Kategoriya nomi takrorlanmasligi kerak!</p>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="category-desc">Izoh*:</label>
                <textarea bind:value={desc} class="outline-0 border-2 px-3 py-1 rounded" name="category-desc" id="" rows="5" placeholder="Salqin ichimliklar, Soklar va boshqa ichimliklar"></textarea>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="admin-key">Admin parol*:</label>
                <input bind:value={admin_key}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="admin-key" id="">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-600">Yopish</button>
            <button on:click={create} class="py-2 px-4 rounded-md text-white bg-green-600">Qo'shish</button>
        </div>
    </div>
</div>