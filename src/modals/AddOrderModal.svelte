<script lang="ts">
    // endpoints
    import { OrderEndpoint } from '../api/order.api'

    // stores
    import { orderStore, type Order } from "../database/order.store";
    import { roomStore} from "../database/room.store";

    const orderEndpoint = new OrderEndpoint()
    const token = localStorage.getItem('token')
    export let show: boolean
    export let close: () => void

    let title: HTMLInputElement
    let desc: HTMLTextAreaElement
    let room_id: HTMLSelectElement

    async function create() {
        try {
            const res = await orderEndpoint.post(title.value, desc.value, +(room_id.value), token)
            const order: Order = res.data.order
            orderStore.update((orders) => orders.concat(order))
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">

        <p class="text-xl text-center font-bold">Buyurtma yaratish</p>

        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Sarlavhasi*:</label>
                <input bind:this={title}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="" placeholder="Buyurtma 1">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="room">Xonani tanlang*:</label>
                <select bind:this={room_id}  class="outline-0 border-2 px-3 py-1 rounded" name="room" id="">
                    {#each $roomStore as room}
                        <option value="{room.id}">{room.name}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="desc">Izoh*:</label>
                <textarea bind:this={desc} class="outline-0 border-2 px-3 py-1 rounded" name="desc" id="" rows="5" placeholder="Salqin ichimliklar, Soklar va boshqa ichimliklar"></textarea>
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-400 font-semibold"><i class="bi bi-x"></i> Yopish</button>
            <button on:click={create} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold"><i class="bi bi-plus"></i> Yaratish</button>
        </div>
    </div>
</div>