<script lang="ts">
    import { RoomEndpoint } from "../api";
    import { type Room, roomStore } from "../store"
    import Alert from "../modalsAll/Alert.svelte"
    import { navigate } from "svelte-navigator";

    const roomEndpoint = new RoomEndpoint()
    const token = localStorage.getItem("token")

    let showAlertModal = false

    async function getRooms() {
        try {
            const res = await roomEndpoint.get(token)
            const rooms: Room[] = res.data.rooms
            roomStore.set(rooms)
        } catch (error) {
            if (error.response.status == 401) {
                navigate('/login')
            } else if (error.response.status >= 500) {
                showAlertModal = true
            } else {
                console.log(error)
            }
        }
    } getRooms()

    export let room_name: string
    export let room_desc: string
    export let room_capacity: number
    export let room_booked: boolean

    let show_delete: boolean = false
    let show_edit: boolean = false

</script>

<Alert show={showAlertModal} close={() => showAlertModal = false } color={"red-500"} text={"Serverda xatolik. Iltimos dasturchi bilan bog'laning!"} icon={"x"} title={"Xatolik"} />
<div class="flex flex-col shadow-md rounded-xl bg-white">
    <img class="rounded-t-xl" src="https://b.zmtcdn.com/data/pictures/6/19877256/3275c38ad9d367b8a7acf16934344973.jpeg" alt="">
    <div class="flex flex-col gap-2 p-3">
        <div class="flex justify-between items-center rounded-md bg-indigo-500/10 p-2">
            <p class="text-sm font-bold">Nomi:</p>
            <p class="text-md font-medium">{room_name}</p>
        </div>
        <div class="flex justify-between items-center rounded-md bg-indigo-500/10 px-3 py-2">
            <p class="text-sm font-bold">Sig'imi:</p>
            <p class="text-md font-medium">{room_capacity} kishilik</p>
        </div>
        <div class="flex justify-between items-center rounded-md bg-indigo-500/10 p-2">
            <p class="text-sm font-bold">Ma'lumot:</p>
            <p class="text-md font-medium">{room_desc}</p>
        </div>
        <div class="flex justify-between items-center rounded-md bg-indigo-500/10 px-3 py-2">
            <p class="text-sm font-bold">Holati:</p>
            {#if room_booked == true}
                <p class="text-sm font-semibold px-4 py-1 rounded-2xl text-white bg-red-400">Xona band</p>
            {:else}
                <p class="text-sm font-semibold px-4 py-1 rounded-2xl text-white bg-green-400">Xona ochiq</p>
            {/if}
        </div>
    </div>
</div>