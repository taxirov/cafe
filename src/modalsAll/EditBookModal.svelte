<script lang="ts">
    // endpoints
    import { BookEndpoint } from "../api";
    // types and stores
    import { roomStore, bookStore, type Book } from "../store";
    import Alert from "../modalsAll/Alert.svelte";
    import { navigate } from "svelte-navigator";

    const bookEndpoint = new BookEndpoint()
    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void
    export let book: Book

    let room: HTMLSelectElement
    let person: HTMLInputElement
    let price: HTMLInputElement
    let booker_name: HTMLInputElement
    let booked_date: HTMLInputElement
    let booked_time: HTMLSelectElement

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

    async function edit() {
        let bookDate = (new Date(booked_date.value).toLocaleDateString()) + ' ' + booked_time.value
        let id = book.id
        try {
            const res = await bookEndpoint.put(id, +room.value, +person.value, +price.value, booker_name.value, bookDate, token)
            const book: Book = res.data.book;
            bookStore.update(b => {return b.filter(b => b.id != book.id)})
            bookStore.update(b => b.concat(book))
            close()
        } catch (error) {
            if (error.response.status == 409) {
                showAlert('Xatolik', 'red-500', `Bu vaqtga buyurtma olingan. Iltimos boshqa vaqtni tanlang.`, 'x')
            } else if (error.response.status == 500) {
                showAlert('Xatolik', 'red-500', `Serverda xatolik. Dasturchi bilan bog'laning`, 'x')
            } else if (error.response.status == 401 || error.response.status == 403) {
                navigate('/login')
            }
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-50 justify-center items-center " + (show ? "flex" : "hidden")}>
    <Alert show={show_alert} close={() => show_alert = false } color={alert_color} text={alert_text} title={alert_title} icon={alert_icon} />
    <div class="bg-white p-8 flex flex-col gap-3 w-screen md:w-1/3 h-full md:h-[fit-content] md:rounded-md shadow-md overflow-y-auto">
        <p class="text-xl text-center font-bold">Bronni tahrirlash</p>
        <div class="flex flex-col gap-3">
            <div class="room_id flex flex-col gap-2">
                <label class="font-semibold" for="room">Xonani tanlang*:</label>
                <select bind:this={room} value="{book.room.id}" class="outline-0 border-2 px-3 py-1 rounded" name="room">
                    {#each $roomStore as room}
                        <option value={room.id}>{room.name}</option>
                    {/each}
                </select>
            </div>
            <div class="boked_date flex justify-between">
                <div class="flex flex-col gap-2">
                    <label class="font-semibold" for="">Sana*:</label>
                    <input bind:this={booked_date} value="{book.booked_date.split(' ')[0]}" on:change={() => {console.log(new Date(booked_date.value).toLocaleDateString())}} class="outline-0 border-2 px-3 py-1 rounded" type="date" name="" id="">
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold" for="person">Vaqt*:</label>
                    <select bind:this={booked_time} value="{book.booked_date.split(' ')[1]}" class="outline-0 border-2 px-3 py-1 rounded" name="" id="">
                        <option value="abet">Abet</option>
                        <option value="gech">Gech</option>
                    </select>
                </div>
            </div>
            <div class="person flex flex-col gap-2">
                <label class="font-semibold" for="">Mijozlar soni*:</label>
                <input bind:this={person} value="{book.person}" class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
            </div>
            <div class="price flex flex-col gap-2">
                <label class="font-semibold" for="">Bron narxi*:</label>
                <input bind:this={price} value="{book.price}" class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
            </div>
            <div class="booker_name flex flex-col gap-2">
                <label class="font-semibold" for="">Mijoz ismi*:</label>
                <input bind:this={booker_name} value="{book.booker_name}" class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-400 font-semibold">Yopish</button>
            <button on:click={edit} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold">Yaratish</button>
        </div>
    </div>
</div>
