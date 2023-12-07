<script lang="ts">
    import { OrderEndpoint } from '../api'
    import { orderStore, type Order } from "../store";

    const roomEndpoint = new OrderEndpoint()
    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void
    export let id: number

    async function endOrder() {
        try {
            const res = await roomEndpoint.patchStatus(id, false, token)
            const order_ended: Order = res.data.order
            orderStore.update((orders) =>  { return orders.filter(o => {
                if(o.id == order_ended.id) { 
                    o = order_ended
            }})})
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 h-fit w-fit rounded-md shadow-md">
        <p class="text-xl text-center font-bold">Buyurtmani tugatish</p>
        <p class="text-sm">Buyurtmani tugatishni tasdiqlaysizmi?</p>
        <div class="flex justify-between gap-3">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-500 font-semibold">Yopish</button>
            <button on:click={endOrder} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold">Tasdiqlash</button>
        </div>
    </div>
</div>