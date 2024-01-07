<script lang="ts">
    import { RoomEndpoint } from "../api";
    import { type Room, roomStore } from "../store"
    import Alert from "../modalsAll/Alert.svelte"
    import { navigate } from "svelte-navigator";

    const roomEndpoint = new RoomEndpoint()
    const token = localStorage.getItem("token")

    let showAlertModal = false

    export let room_name: string
    export let room_desc: string
    export let room_capacity: number
    export let room_booked: boolean

    let show_delete: boolean = false
    let show_edit: boolean = false

</script>

<Alert show={showAlertModal} close={() => showAlertModal = false } color={"red-500"} text={"Serverda xatolik. Iltimos dasturchi bilan bog'laning!"} icon={"x"} title={"Xatolik"} />
<div class="flex flex-col shadow-md rounded-xl bg-white">
    <div class="flex flex-col gap-2 p-4">
        <p class="text-2xl md:text-4xl font-bold">{room_name}</p>
        <p class="text-xl md:text-xl font-medium">{room_capacity} kishilik</p>
        <p class="text-md md:text-lg font-medium">{room_desc}</p>
        <div class="flex justify-end items-center rounded-mdend">
            {#if room_booked == true}
                <p class="text-sm md:text-xl font-semibold px-5 py-2 rounded-3xl text-white bg-red-400">Xona band</p>
            {:else}
                <p class="text-sm md:text-xl font-semibold px-5 py-2 rounded-3xl text-white bg-green-400">Xona ochiq</p>
            {/if}
        </div>
    </div>
</div>