<script lang="ts">
    import { ProductInOrderEndpoint } from '../api'
    import { orderStore } from "../store";
    import type { Order } from "../store";

    const token = localStorage.getItem('token')
    const productInOrderEndpoint = new ProductInOrderEndpoint()

    export let show: boolean
    export let close: () => void
    export let id: number

    async function patchStatus() {
        try {
            const res = await productInOrderEndpoint.patchStatus(id, 1, token)
            const orders: Order[] = res.data.orders
            orderStore.set(orders)
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 md:p-5 flex flex-col gap-3 md:gap-4 h-fit w-4/5 md:w-fit rounded-md shadow-md">
        <p class="text-xl text-center font-bold">Tasdiqlash</p>
        <p class="text-sm md:text-md text-center font-medium">Mahsulot mijozga berilganligini tasdiqlaysizmi?</p>
        <div class="flex justify-between gap-3">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-500 font-semibold">Yopish</button>
            <button on:click={patchStatus} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold">Tasdiqlash</button>
        </div>
    </div>
</div>