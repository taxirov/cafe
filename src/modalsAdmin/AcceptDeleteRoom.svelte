<script lang="ts">
    import { RoomEndpoint } from '../api';
    import { roomStore, type Room } from "../store";
    import Alert from "../modalsAll/Alert.svelte";

    const roomEndpoint = new RoomEndpoint()
    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void
    export let id: number
    let admin_key: string

    let show_alert: boolean = false
    let alert_title: string
    let alert_color: string
    let alert_text: string
    let alert_icon: string

    function showAlert(title: string, color: string, text: string, icon: string) {
        show_alert = true;
        alert_title = title;
        alert_text = text;
        alert_color = color;
        alert_icon = icon;
    }

    async function deleteRoom() {
        try {
            const res = await roomEndpoint.delete(id, token, admin_key)
            const room_deleted: Room = res.data.room
            roomStore.update((rooms) => { return rooms.filter(room => room.id !== room_deleted.id)})
            close()
        } catch (error) {
            if(error.response.status == 403) {
                showAlert('Xatolik', 'red-500', "Admin parol kiritilmagan! Iltimos admin parolni kiritib qaytadan urining.", 'x')
            } else if(error.response.status == 401) {
                showAlert('Xatolik', 'red-500', "Admin parol noto'g'ri! Iltimos qaytadan urining.", 'x')
            } else if(error.response.status == 500 && error.response.status > 500) {
                showAlert('Xatolik', 'red-500', "Serverda xatolik. Iltimos admin bilan bog'laning", 'x')
            }
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <Alert close={() => show_alert = false } show={show_alert} title={alert_title} color={alert_color} text={alert_text} icon={alert_icon}></Alert>
    <div class="bg-white p-8 flex flex-col gap-3 h-fit w-fit rounded-md shadow-md">
        <p class="text-xl text-center font-bold">Xona o'chirish</p>
        <p class="text-sm">Xonani o'chirishni tasdiqlaysizmi?</p>
        <div class="flex flex-col gap-2">
            <label class="font-semibold text-md" for="">Admin parol*:</label>
            <input bind:value={admin_key}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="" placeholder="parol">
        </div>
        <div class="flex justify-between gap-3">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-500 font-semibold">Yopish</button>
            <button on:click={deleteRoom} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold">Tasdiqlash</button>
        </div>
    </div>
</div>