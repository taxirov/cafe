<script lang="ts">
    import { RoomEndpoint } from "../api";
    import AcceptDeleteRoom from "../modals/AcceptDeleteRoom.svelte";
    import EditRoomModal from '../modals/EditRoomModal.svelte';

    const roomEndpoint = new RoomEndpoint()

    export let room_name: string
    export let room_desc: string
    export let room_capacity: number
    export let room_id: number
    export let room_booked: number

    let show_delete: boolean = false
    let show_edit: boolean = false

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
        <div class="flex justify-between items-center rounded-md bg-indigo-500/10 px-3 py-2">
            <p class="text-sm font-bold">Holati:</p>
            {#if room_booked == 1}
                <p class="text-sm font-semibold px-4 py-1 rounded-2xl text-white bg-red-400">Xona band</p>
            {:else}
                <p class="text-sm font-semibold px-4 py-1 rounded-2xl text-white bg-green-400">Xona ochiq</p>
            {/if}
        </div>
        <div class="flex gap-2">
            <button on:click={() => { show_edit = true }} class="bg-green-500 text-white p-2 rounded-md font-semibold w-full"><i class="bi bi-pencil"></i> Tahrirlash</button>
            <button on:click={() => { show_delete = true }} class="bg-red-500 text-white p-2 rounded-md font-semibold w-full"><i class="bi bi-trash"></i> O'chirish</button>
        </div>
    </div>
    <EditRoomModal show={show_edit} close={() => { show_edit = false }} id={room_id} name={room_name} desc={room_desc} capacity={room_capacity}></EditRoomModal>
    <AcceptDeleteRoom show={show_delete} id={room_id} close={() => show_delete = false}></AcceptDeleteRoom>
</div>