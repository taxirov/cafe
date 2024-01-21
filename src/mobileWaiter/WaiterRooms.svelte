<script lang="ts">
    import { navigate } from 'svelte-navigator';
    import { roomStore, type Room, type User } from '../store';
    import { RoomEndpoint, UserEndpoint } from '../api';
    const user: User = JSON.parse(localStorage.getItem('user'))
    const token: string = localStorage.getItem("token")
    const userEndpoint = new UserEndpoint()

    async function checkToken() {
        try {
            const res = await userEndpoint.getTokenVerify(token)
            if (res.status == 200) {
                if (res.data.user.role == "admin") {
                    navigate('/mrooms')
                } else {
                    localStorage.setItem("user", JSON.stringify(res.data.user))
                    console.log("Verify success")
                }
            }
        } catch (error) {
            navigate('/login')
        }
    }
    if (!token || !user) {
        localStorage.clear()
        navigate('/login')
    } else { checkToken() }

    // components
    import RoomComponent from '../components/RoomComponent.svelte';
    
    // modals
    import AddRoomModal from '../modalsAdmin/AddRoomModal.svelte';
    
    let show_add: boolean = false
    const roomEndpoint = new RoomEndpoint()

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
    </div>
    <div class="grow flex flex-col gap-3 p-2 h-fit">
        <AddRoomModal show={show_add} close={() => show_add = false}></AddRoomModal>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 justify-start">
            {#if $roomStore.length == 0}
                <p class="text-center text-md text-gray-400 font-medium">Xonalar mavjud emas</p>
            {:else}
                {#each $roomStore as room}
                    <RoomComponent room_booked={room.booked} room_name={room.name} room_capacity={room.capacity} room_desc={room.desc}></RoomComponent>
                {/each}
            {/if}
        </div>
    </div>
    <div class="grow-0 h-fit grid grid-cols-4 bg-white px-2 py-2 sticky bottom-0 right-0 left-0">
        <button on:click={() => { navigate('/w')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-clipboard-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Buyurtmalar</p>
        </button>
        <button on:click={() => { navigate('/products')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-box-seam-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Mahsulotlar</p>
        </button>
        <button on:click={() => { navigate('/wrooms')}} class="flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl">
            <i class="bi bi-door-open-fill text-2xl"></i>
            <p class="text-[10px] font-bold">Xonalar</p>
        </button>
        <button on:click={() => { navigate('/wprofile')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-person-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Profile</p>
        </button>
    </div>
</section>
