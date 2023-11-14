<script lang="ts">
    import { categoryStore } from "../database/category.store"
    import { RoomEndpoint } from '../api/room.api'
    import { roomStore, type Room } from "../database/room.store";

    const roomEndpoint = new RoomEndpoint()
    const token = localStorage.getItem('token')
    export let show: boolean
    export let close: () => void

    let name: HTMLInputElement
    let desc: HTMLTextAreaElement
    let capacity: HTMLInputElement

    

    async function create() {
        try {
            const res = await roomEndpoint.post(name.value, desc.value, +(capacity.value), token)
            const room: Room = res.data.room
            roomStore.update((rooms) => rooms.concat([room]))
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">

        <p class="text-xl text-center font-bold">Xona qo'shish</p>

        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Nomi*:</label>
                <input bind:this={name}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="" placeholder="Zal 1">
                <p class="text-red-500 font-medium">Xona nomi takrorlanmasligi kerak!</p>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Sig'imi*:</label>
                <input bind:this={capacity}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="" placeholder="10">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="desc">Izoh*:</label>
                <textarea bind:this={desc} class="outline-0 border-2 px-3 py-1 rounded" name="desc" id="" rows="5" placeholder="Salqin ichimliklar, Soklar va boshqa ichimliklar"></textarea>
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-400 font-bold">Yopish</button>
            <button on:click={create} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-bold">Qo'shish</button>
        </div>
    </div>
</div>