<script lang="ts">
    import { RoomEndpoint } from '../api/room.api'
    import { roomStore, type Room } from "../database/room.store";

    const roomEndpoint = new RoomEndpoint()
    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void
    export let id: number

    async function deleteRoom() {
        try {
            const res = await roomEndpoint.delete(id, token)
            const room_deleted: Room = res.data.room
            roomStore.update((rooms) => { return rooms.filter(room => room.id !== room_deleted.id)})
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 h-fit w-fit rounded-md shadow-md">
        <p class="text-xl text-center font-bold">Xona o'chirish</p>
        <p class="text-sm">Xonani o'chirishni tasdiqlaysizmi?</p>
        <div class="flex justify-between gap-3">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-400 font-semibold">Yopish</button>
            <button on:click={deleteRoom} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold">Tasdiqlash</button>
        </div>
    </div>
</div>