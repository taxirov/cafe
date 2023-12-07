<script lang="ts">
    import { navigate } from 'svelte-navigator';
    import { roomStore, type Room } from '../store';
    import { RoomEndpoint } from '../api';

    // components
    import RoomComponent from '../components/RoomComponent.svelte';
    import AdminNavbar from '../components/AdminNavbar.svelte';
    
    // modals
    import AddRoomModal from '../modals/AddRoomModal.svelte';
    
    let show_add: boolean = false
    const roomEndpoint = new RoomEndpoint()
    const token: string = localStorage.getItem('token')

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

</script>


<svelte:head>
    <title>Xonalar</title>
</svelte:head>

<section class="flex flex-col min-h-screen">
    <div class="grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-white p-3 h-fit">
        <h2  class="outline-none text-xl font-bold text-indigo-500"><i class="bi bi-door-open-fill text-2xl text-indigo-500"></i> Xonalar</h2>
        <div class="flex gap-1 items-center">
            <button on:click={() => show_add = true} class="px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-plus"></i></button>
        </div>
    </div>
    <div class="grow flex flex-col gap-3 p-3 h-fit">
        <AddRoomModal show={show_add} close={() => show_add = false}></AddRoomModal>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-start">
            {#if $roomStore.length == 0}
                <p class="text-center text-md text-gray-400 font-medium">Xonalar mavjud emas</p>
            {:else}
                {#each $roomStore as room}
                    <RoomComponent room_booked={room.booked} room_id={room.id} room_name={room.name} room_capacity={room.capacity} room_desc={room.desc}></RoomComponent>
                {/each}
            {/if}
        </div>
    </div>
    <AdminNavbar current_page={"mrooms"}></AdminNavbar>
</section>
