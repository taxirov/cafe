<script lang="ts">
    // endpoints
    import { OrderEndpoint } from "../api";

    // types and stores
    import { orderStore, roomStore, type Order, type Room } from "../store";

    let rooms: Room[] = $roomStore.filter(room => room.booked !== 0)

    const orderEndpoint = new OrderEndpoint()
    const token = localStorage.getItem('token')
    export let show: boolean
    export let close: () => void

    let title: HTMLInputElement
    let desc: HTMLTextAreaElement
    let room_id: HTMLSelectElement
    let check_soboy: HTMLInputElement
    let room_div = document.getElementById('room-div')

    function checkSoboy() {
        if (check_soboy.checked == true){
            room_div.classList.add('none');
            room_div.classList.remove('flex') 
        } else {
            room_div.classList.add('flex');
            room_div.classList.remove('none')
        }
    }

    let show_alert: boolean

    // alert function
    function showErrorAlert(error_text: string) {
        let alert = document.createElement('div')
        let alert_child_div = document.createElement('div')
        let icon = document.createElement('i')
        let title = document.createElement('p')
        let text = document.createElement('p')
        let button = document.createElement('button')
        button.className = "py-2 px-4 rounded-2xl bg-red-400"
        button.innerText = "Yopish"
        button.onclick = () => { document.removeChild(alert) }
        text.className = "text-sm font-medium"
        text.innerText = error_text
        title.className = "text-3xl font-semibold"
        title.innerText = "Xatolik"
        icon.className = "bi bi-x text-2xl text-white w-[20px] h-[20px] rounded-3xl bg-red-400"
        alert_child_div.className = "flex flex-col gap-2 bg-white rounded-2xl"
        alert_child_div.appendChild(icon)
        alert_child_div.appendChild(title)
        alert_child_div.appendChild(text)
        alert_child_div.appendChild(button)
        alert.className = "w-screen h-screen fixed flex justify-center items-center bg-black/20"
        alert.appendChild(alert_child_div)
        document.body.appendChild(alert)
    }

    async function create() {
        try {
            const res = await orderEndpoint.post(title.value, desc.value, +room_id.value, token)
            const order: Order = res.data.order;
            orderStore.update((orders) => orders.concat(order))
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div
    class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " +
        (show ? "flex" : "hidden")}
>
    <div
        class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto"
    >
        <p class="text-xl text-center font-bold">Buyurtma yaratish</p>

        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Sarlavhasi*:</label>
                <input
                    bind:this={title}
                    class="outline-0 border-2 px-3 py-1 rounded"
                    type="text"
                    name=""
                    id=""
                    placeholder="Buyurtma 1"
                />
            </div>
            <div class="flex gap-3">
                <input bind:this={check_soboy} on:click={checkSoboy} class="p-2" type="checkbox" name="soboy-dostovka" id="">
                <label for="soboy-dostovka">Soboy/Dostavka</label>
            </div>
            <div id="room-div" class="flex flex-col gap-2">
                <label class="font-semibold" for="room">Xonani tanlang*:</label>
                {#if rooms.length > 0}
                    <select
                        bind:this={room_id}
                        class="outline-0 border-2 px-3 py-1 rounded"
                        name="room"
                        id=""
                    >
                        {#each rooms as room}
                            <option value={room.id}>{room.name}</option>
                        {/each}
                    </select>
                {:else}
                    <p class="text-red-500 text-sm">Bosh xona mavjud emas</p>
                {/if}
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="desc">Izoh*:</label>
                <textarea
                    bind:this={desc}
                    class="outline-0 border-2 px-3 py-1 rounded"
                    name="desc"
                    id=""
                    rows="5"
                    placeholder="Salqin ichimliklar, Soklar va boshqa ichimliklar"
                ></textarea>
            </div>
        </div>

        <div class="flex justify-between">
            <button
                on:click={() => close()}
                class="py-2 px-4 rounded-md text-white bg-red-400 font-semibold"
                ><i class="bi bi-x"></i> Yopish</button
            >
            <button
                on:click={create}
                class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold"
                ><i class="bi bi-plus"></i> Yaratish</button
            >
        </div>
    </div>
</div>
