<script lang="ts">
    // endpoints
    import { OrderEndpoint, RoomEndpoint } from "../api";
    // types and stores
    import { orderStore, roomStore, type Order, type Room } from "../store";

    const orderEndpoint = new OrderEndpoint()
    const roomEndpoint = new RoomEndpoint()
    const token = localStorage.getItem('token')
    export let show: boolean
    export let close: () => void

    let title: HTMLInputElement
    let desc: HTMLTextAreaElement
    let room: HTMLSelectElement
    let room_id: number | null

    let check_soboy: HTMLInputElement
    let room_class = 'flex'

    // get rooms
    async function getRooms() {
        try{
            const res = await roomEndpoint.get(token)
            const rooms: Room[] = res.data.rooms
            roomStore.set(rooms)
        }
        catch(error) {
            console.log(error)
        }
    }  getRooms()

    
    function checkSoboy() {
        if (check_soboy.checked == true){
            room_class = 'hidden'
            room_id = null
        } else {
            room_class = 'flex'
            room_id = (room.value === undefined) ? null : +room.value
        }
    }

    let show_alert: boolean

    async function create() {
        try {
            const res = await orderEndpoint.post(title.value, desc.value, room_id, token)
            const order: Order = res.data.order;
            orderStore.update((orders) => orders.concat(order))
            getRooms()
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-50 justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">
        <p class="text-xl text-center font-bold">Buyurtma yaratish</p>
        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Sarlavhasi*:</label>
                <input
                    bind:this={title}
                    class="outline-0 border-2 px-3 py-1 rounded"
                    type="text"
                    name=""
                    id=""
                    placeholder="Buyurtma 1"
                />
            </div>
            <div class="flex gap-3">
                <input bind:this={check_soboy} on:click={checkSoboy} class="p-2" type="checkbox" name="soboy-dostovka" id="">
                <label for="soboy-dostovka">Soboy/Dostavka</label>
            </div>
            <div class="{room_class} flex-col gap-2">
                <label class="font-semibold" for="room">Xonani tanlang*:</label>
                {#if $roomStore.filter(room => room.booked != true).length != 0}
                    <select bind:this={room} bind:value={room_id} class="outline-0 border-2 px-3 py-1 rounded" name="room">
                        {#each $roomStore.filter(room => room.booked != true) as room}
                            <option value={room.id}>{room.name}</option>
                        {/each}
                    </select>
                {:else}
                    <p class="text-red-500 text-sm">Bosh xona mavjud emas</p>
                {/if}
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="desc">Izoh*:</label>
                <textarea
                    bind:this={desc}
                    class="outline-0 border-2 px-3 py-1 rounded"
                    name="desc"
                    id=""
                    rows="5"
                    placeholder="Buyutma uchun izoh"
                ></textarea>
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-400 font-semibold">Yopish</button>
            <button on:click={create} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold">Yaratish</button>
        </div>
    </div>
</div>
