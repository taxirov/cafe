<script lang="ts">
    import { OrderEndpoint } from "../api"
    import type { Order, ProductInOrder } from "../store";
    import AcceptEndOrder from "../modalsAdmin/AcceptEndOrder.svelte";
    import AcceptDeleteOrder from "../modalsAdmin/AcceptDeleteOrder.svelte";
    import AddProInOrModal from "../modalsAll/AddProInOrModal.svelte";
    import ProInOrder from "./ProInOrder.svelte";

    const token = localStorage.getItem('token')

    export let order: Order
    export let user_role: string

    let show_end: boolean = false
    let show_edit: boolean = false
    let show_delete: boolean = false

    // buttons for products
    let show_products: boolean = false
    let show_btn: boolean = true
    let close_btn: boolean = false

    let show_add_pro: boolean = false;

</script>

<div class="flex flex-col gap-2 md:gap-3 px-4 py-2 md:px-8 md:py-6 rounded-lg bg-white shadow-md">
    <AddProInOrModal order_id={order.id} show={show_add_pro} close={() => { show_add_pro = false }}></AddProInOrModal>
    <!-- <EditProInOrModal productInOrder={productInOrder} show={showEditProInOrder} close={() => showEditProInOrder = false }></EditProInOrModal> -->
    <div class="flex items-center justify-between p-2">
        <span class="flex gap-1 items-center">
            <p class="md:text-2xl font-bold">
                {order.title}
            </p>
            {#if order.status == 1}
                <p class="px-3 py-1 font-semibold text-white rounded-2xl bg-green-500 text-sm md:text-xl"><i class="bi bi-hourglass-top"></i></p>
            {:else}
                <p class="px-3 py-1 font-semibold text-white rounded-2xl bg-red-500 text-sm md:text-xl"><i class="bi bi-hourglass-split"></i></p>
            {/if}
            {#if order.room === null}
                <p class="text-stone-100 text-sm md:text-xl font-semibold bg-pink-500 rounded-2xl px-3 py-1">S/D</p>
            {:else}
                <p class="text-stone-100 text-sm md:text-xl font-semibold bg-violet-500 rounded-2xl px-3 py-1">{order.room.name}</p>
            {/if}
        </span>
        <div class="flex gap-2">
            {#if order.status != 0}
                <button on:click={() => { show_add_pro = true}} class="bg-violet-500 text-white text-md md:text-xl px-2 py-1 md:py-3 md:px-4 rounded-md font-semibold w-fit"><i class="bi bi-clipboard-plus"></i></button>
            {/if}
            {#if user_role == 'admin'}
                {#if order.status != 0}
                    <button on:click={() => { show_end = true}} class="bg-red-500 text-white text-md md:text-xl px-2 py-1 md:py-3 md:px-4 rounded-md font-semibold w-fit"><i class="bi bi-clipboard-x"></i></button>
                {/if}
                <button on:click={() => { show_delete = true}} class="border-red-500 border-2 text-red-500 text-md md:text-xl px-2 py-1 md:py-3 md:px-4 rounded-md font-semibold w-fit"><i class="bi bi-trash"></i></button>
            {/if}
        </div>
    </div>
    <div class="flex flex-col items-start justify-between p-2 rounded-md bg-green-500/10">
        <p class="md:text-xl text-green-500"><b><i class="bi bi-quote"></i> Izoh:</b></p>
        <p class="md:text-xl pl-3">{order.desc}</p>
    </div>
    <div class="flex flex-col">
        <div class="flex justify-between p-2 bg-indigo-500 text-zinc-100 rounded-t-lg">
            <p class="md:text-xl"><b>Umumiy hisob:</b></p>
            <p  class="md:text-2xl font-bold">
                {#if order.total_price == null}
                    0 so'm
                {:else}
                    {order.total_price} so'm
                {/if}
            </p>
        </div>
        <div class="flex flex-col justify-between p-2 bg-indigo-500/20 rounded-b-lg">
            <div class="flex justify-between items-center md:px-2 w-full">
                <p class="md:text-xl"><b>Mahsulotlar ({order.products.length})</b></p>
                <button on:click={() => { show_products = true, show_btn = false, close_btn = true }} class={"px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100 " + (show_btn ? "block" : "hidden")}><i class="bi bi-caret-down"></i></button>
                <button on:click={() => { show_products = false, close_btn = false, show_btn = true }} class={"px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100 " + (close_btn ? "block" : "hidden")}><i class="bi bi-caret-up"></i></button>
            </div>
            <div class={"flex-col md:px-2 gap-2 " + (show_products ? "flex" : "hidden")}>
                <table>
                    <thead>
                        <tr>
                            <th class="border-b-2 border-indigo-500 text-center text-sm md:text-lg">T/r</th>
                            <th class="border-b-2 border-indigo-500 text-center text-sm md:text-lg">Nomi</th>
                            <th class="border-b-2 border-indigo-500 text-center text-sm md:text-lg">Miqdori</th>
                            <th class="border-b-2 border-indigo-500 text-center text-sm md:text-lg">Narxi</th>
                            <th class="border-b-2 border-indigo-500 text-center text-sm md:text-lg">Tahrir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each order.products as product, index}
                            <ProInOrder order_status={order.status} product={product} index={index}></ProInOrder>
                        {/each}                    
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="flex items-center justify-between">
        <p class="text-sm md:text-xl font-medium">{order.user.name}</p>
    <p class="text-sm md:text-xl font-medium">{order.create_date.slice(0,10)} {order.create_date.slice(11,16)}</p>
    </div>
</div>
<AcceptEndOrder id={order.id} show={show_end} close={() => { show_end = false }}></AcceptEndOrder>
<AcceptDeleteOrder id={order.id} show={show_delete} close={() => show_delete = false }></AcceptDeleteOrder>