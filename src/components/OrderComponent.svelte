<script lang="ts">
    import { OrderEndpoint } from "../api/order.api"
    import type { Product } from "../database/product.store";
    import type { Room } from "../database/room.store";
    import AcceptEndOrder from "../modals/AcceptEndOrder.svelte";

    const token = localStorage.getItem('token')

    export let id: number
    export let title: string
    export let created_date: string
    export let status: boolean
    export let total_price: number | null
    export let products: Product[]
    export let room: Room

    let show_end: boolean = false

</script>

<div class="flex-flex-col gap-2 p-3 rounded-md bg-white shadow-md">
    <div class="flex items-center justify-between p-2 border-b-2 border-indigo-500">
        <p class="">Buyurtma ID: {id}</p>
        <button on:click={() => { show_end = true}} class="bg-red-400 text-white text-sm py-2 px-3 rounded-md font-semibold w-fit"><i class="bi bi-trash"></i> Tugatish</button>
    </div>
    <div class="flex items-center justify-between p-2">
        <p><b>{title}</b></p>
        {#if status == true}
            <p class="px-3 py-1 font-semibold text-white rounded-2xl bg-green-500 text-sm">Faol</p>
        {:else}
            <p class="px-3 py-1 font-semibold text-white rounded-2xl bg-red-500 text-sm">Tugatilgan</p>
        {/if}
    </div>
    <div class="flex justify-between p-2">
        <p><b>Yaratilgan sana:</b></p>
        <span class="flex flex-col items-end font-medium">
            <p>Sana: {created_date.slice(0,10)}</p>
            <p>Vaqt: {created_date.slice(11,17)}</p>
        </span>
    </div>
    <div class="flex justify-between p-2">
        <p><b>Xona nomi:</b></p>
        <p>{room.name}</p>
    </div>
    <div class="flex justify-between p-2">
        <p><b>Umumiy hisob:</b></p>
        <p>
            {#if total_price == null}
                0 so'm
            {:else}
                {total_price} so'm
            {/if}
        </p>
    </div>
    <div class="flex justify-between p-2">
        <div class="flex justify-between p-2">
            <p>Products list</p>
            <button class="px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-filter"></i></button>
        </div>
        <div class="flex flex-col gap-2">
            {#each products as product}
                <p>{product.name}</p>
            {/each}
        </div>
    </div>
</div>
<AcceptEndOrder id={id} show={show_end} close={() => { show_end = false }}></AcceptEndOrder>