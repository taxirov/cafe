<script lang="ts">
    import { RoomEndpoint } from "../api/room.api";
    import AcceptDeleteRoom from "../modals/AcceptDeleteRoom.svelte";

    const roomEndpoint = new RoomEndpoint()

    export let room_name: string
    export let room_desc: string
    export let room_capacity: number
    export let room_id: number

    let show_delete: boolean = false

    async function deleteRoom(){}

</script>

<div class="flex flex-col shadow-md rounded-xl bg-white">
    <img class="rounded-t-xl" src="https://b.zmtcdn.com/data/pictures/6/19877256/3275c38ad9d367b8a7acf16934344973.jpeg" alt="">
    <div class="flex flex-col gap-2 p-3">
        <div class="flex justify-between items-center rounded-md bg-indigo-500/10 p-2">
            <p class="text-sm font-bold">Nomi:</p>
            <p class="text-md font-medium">{room_name}</p>
        </div>
        <div class="flex justify-between items-center rounded-md bg-indigo-500/10 p-2">
            <p class="text-sm font-bold">Ma'lumot:</p>
            <p class="text-md font-medium">{room_desc}</p>
        </div>
        <div class="flex justify-between items-center rounded-md bg-indigo-500/10 px-3 py-2">
            <p class="text-sm font-bold">Sig'imi:</p>
            <p class="text-md font-medium">{room_capacity} kishilik</p>
        </div>
        <div class="flex gap-2">
            <button disabled class="bg-green-200 text-white p-2 rounded-md font-semibold w-full"><i class="bi bi-pencil"></i> Tahrirlash</button>
            <button on:click={() => { show_delete = true}} class="bg-red-400 text-white p-2 rounded-md font-semibold w-full"><i class="bi bi-trash"></i> O'chirish</button>
        </div>
    </div>
    <AcceptDeleteRoom show={show_delete} id={room_id} close={() => show_delete = false}></AcceptDeleteRoom>
</div>