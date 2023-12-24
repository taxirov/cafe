<script lang="ts">
    import AcceptDeleteRoom from "../modalsAdmin/AcceptDeleteRoom.svelte";
    import EditRoomModal from "../modalsAdmin/EditRoomModal.svelte";
    import type { Room } from "../store";

    export let room: Room
    export let index: number

    let showRoomDelete: boolean = false
    let showRoomEdit: boolean = false
    
</script>

<AcceptDeleteRoom show={showRoomDelete} close={() => { showRoomDelete = false }} id={room.id} />
<EditRoomModal show={showRoomEdit} close={() => { showRoomEdit = false }} id={room.id} name={room.name} desc={room.desc} capacity={room.capacity} />
<tr>
    <td class="text-center">{index + 1}</td>
    <td class="text-center">{room.name}</td>
    {#if room.booked == true}
        <td class="text-center"><p class="bg-red-500 text-zinc-100 text-sm font-semibold px-4 py-1 text-center rounded-2xl">Band</p></td>
    {:else}
        <td class="text-center"><p class="bg-green-500 text-zinc-100 text-sm font-semibold px-4 py-1 text-center rounded-2xl">Ochiq</p></td>
    {/if}
    {#if screen.width > 500}
        <td class="text-center">{room.desc}</td>
    {/if}
    <td class="text-center">
        <button on:click={() => { showRoomEdit = true }} class="px-3 py-1 font-semibold text-zinc-100 rounded-md bg-blue-500 text-gray-100">{#if screen.width > 500} Tahrirlash {/if} <i class="bi bi-pencil" /></button>
        <button on:click={() => { showRoomDelete = true }} class="px-3 py-1 font-semibold text-zinc-100 rounded-md bg-red-500 text-gray-100">{#if screen.width > 500} O'chirish {/if} <i class="bi bi-trash" /></button>
    </td>
</tr>