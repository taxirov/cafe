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
                if (res.data.user.role == "waiter") {
                    navigate('/wrooms')
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
    } 
    else { checkToken() }

    if (screen.width < 500) {
        navigate('/mrooms')
    }

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

    setInterval(() => { getRooms() }, 30000)

</script>

<svelte:head>
    <title>Xonalar</title>
</svelte:head>

<section class="flex min-h-screen md:h-screen">
    <div class="grow-0 bg-indigo-600 md:w-1/5 flex flex-col justify-between p-6 sticky bottom-0 top-0 left-0">
        <div class="flex flex-col gap-8">
            <p class="text-2xl font-black text-zinc-100">Madat Ota Choyxonasi</p>
        <div class="flex flex-col gap-1">
            <button on:click={() => { navigate('/admin')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                <i class="bi bi-house-fill text-lg"></i>
                <p class="text-md font-bold">Asosiy</p>
            </button>
            <button on:click={() => { navigate('/orders')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                <i class="bi bi-clipboard-fill text-lg"></i>
                <p class="text-md font-bold">Buyurtmalar</p>
            </button>
            <button on:click={() => { navigate('/add')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                <i class="bi bi-database-fill-gear text-lg"></i>
                <p class="text-md font-bold">Boshqarish</p>
            </button>
            <button on:click={() => { navigate('/rooms')}} class="flex items-center gap-3 bg-zinc-100 text-indigo-500 p-3 rounded-md  shadow-md">
                <i class="bi bi-door-open-fill text-lg"></i>
                <p class="text-md font-bold">Xonalar</p>
            </button>
            <button on:click={() => { navigate('/archive')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                <i class="bi bi-archive-fill text-lg"></i>
                <p class="text-md font-bold">Arxiv</p>
            </button>
            <button on:click={() => { navigate('/profile')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                <i class="bi bi-person-fill text-lg"></i>
                <p class="text-md font-bold">Profile</p>
            </button>
        </div>
        </div>
        <p class="text-center py-3 text-zinc-200">Created by <button class="font-semibold">Saad Takhir</button> </p>
    </div>
    <div class="w-4/5 left-0 flex flex-col h-screen">
        <div class="grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-indigo-500 px-3 py-4 h-fit">
            <h2  class="outline-none text-zinc-100 text-lg font-bold"><i class="bi bi-clipboard-fill"></i> Xonalar</h2>
        </div>
        <div class="grow flex flex-col gap-3 p-5 overflow-y-scroll">
            {#if $roomStore.length == 0}
                <p class="text-center text-md md:text-xl text-gray-400 font-medium">Xonalar mavjud emas</p>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-5 justify-start">
                    {#each $roomStore as room}
                        <RoomComponent room_booked={room.booked} room_name={room.name} room_capacity={room.capacity} room_desc={room.desc}></RoomComponent>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</section>