<script lang="ts">
    import { categories } from "../database/category.store"
    import { CategoryEndpoint } from '../api/category.api'

    const categoryEndpoint = new CategoryEndpoint()
    const token = localStorage.getItem('token')
    export let show: boolean
    export let close: () => void

    let name: HTMLInputElement
    let desc: HTMLTextAreaElement

    async function create() {
        try {
            const res = await categoryEndpoint.post(name.value, desc.value, token)
            console.log(res.data)
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
                <label class="font-semibold" for="">Nomi*:</label>
                <input bind:this={name}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="" placeholder="Ichimliklar">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="desc">Izoh*:</label>
                <textarea bind:this={desc} class="outline-0 border-2 px-3 py-1 rounded" name="desc" id="" rows="5" placeholder="Salqin ichimliklar, Soklar va boshqa ichimliklar"></textarea>
            </div>
            <div class="flex flex-col gap-2">
                <label for="" class="font-semibold">Rasmi*:</label>
                <input type="file" name="image" id="" accept=".jpg, .png, .jpeg">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-600">Yopish</button>
            <button on:click={create} class="py-2 px-4 rounded-md text-white bg-green-600">Qo'shish</button>
        </div>
    </div>
</div>