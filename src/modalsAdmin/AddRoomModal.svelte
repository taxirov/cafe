<script lang="ts">
    import { categoryStore, roomStore, type Room } from "../store"
    import { RoomEndpoint } from '../api'
    import Alert from "../modalsAll/Alert.svelte"

    const roomEndpoint = new RoomEndpoint()
    const token = localStorage.getItem('token')
    
    export let show: boolean
    export let close: () => void

    let name: string
    let desc: string
    let capacity: string
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

    async function create() {
        try {
            const res = await roomEndpoint.post(name, desc, +capacity, token, admin_key)
            const room: Room = res.data.room
            roomStore.update((rooms) => rooms.concat([room]))
            close()
        } catch (error) {
            if (error.response.status == 500) {
                showAlert('Xatolik', 'red-500', 'Serverda xatolik. Iltimos dasturchiga murojat qiling', 'x')
            } else if (error.response.status == 401) {
                showAlert('Xatolik', 'red-500', "Admin parol noto'g'ri. Iltimos qaytadan urunib ko'ring", 'x')
            }
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <Alert close={() => show_alert = false } show={show_alert} title={alert_title} color={alert_color} text={alert_text} icon={alert_icon}></Alert>
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">

        <p class="text-xl text-center font-bold">Xona qo'shish</p>

        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Nomi*:</label>
                <input bind:value={name}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="" placeholder="Zal 1">
                <p class="text-red-500 font-medium">Xona nomi takrorlanmasligi kerak!</p>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Sig'imi*:</label>
                <input bind:value={capacity}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="" placeholder="10">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="desc">Izoh*:</label>
                <textarea bind:value={desc} class="outline-0 border-2 px-3 py-1 rounded" name="desc" id="" rows="5" placeholder="Salqin ichimliklar, Soklar va boshqa ichimliklar"></textarea>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Admin parol*:</label>
                <input bind:value={admin_key}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-400 font-bold">Yopish</button>
            <button on:click={create} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-bold">Qo'shish</button>
        </div>
    </div>
</div>