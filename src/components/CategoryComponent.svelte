<script lang="ts">
    import type { Category } from "../store";

    export let category: Category

    let showProducts: boolean = false
    let products_class = 'hidden'
    function showHideProducts() {
        if (showProducts) {
            showProducts = false
            products_class = 'hidden'
        } else {
            showProducts = true
            products_class = ''
        }
    }

</script>

<div class="users flex flex-col gap-3 p-3 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center">
        <p class="text-xl font-semibold">{category.name + " (" + category.products.length + ")"}</p>
        <div class="flex gap-1 items-center">
            {#if showProducts}
                <button on:click={showHideProducts} class="px-2 py-1 rounded-md bg-violet-500 text-xl text-gray-100"><i class="bi bi-chevron-up" /></button> 
            {:else}
                <button on:click={showHideProducts} class="px-2 py-1 rounded-md bg-violet-500 text-xl text-gray-100"><i class="bi bi-chevron-down" /></button>
            {/if}
        </div>
    </div>
    <div class="{products_class} flex flex-col bg-slate-200 rounded-lg p-2">
        <div class="grid grid-cols-8 justify-items-center py-2">
            <p class="col-span-1 text-center font-semibold">T/r</p>
            <p class="col-span-3 text-center font-semibold">Nomi</p>
            <p class="col-span-4 text-center font-semibold">Narxi</p>
        </div>
        {#each category.products as product, index}
            <div class="grid grid-cols-8 justify-items-center py-2 border-t-[1px] border-violet-500">
                <p class="col-span-1 text-center">{index + 1}</p>
                <p class="col-span-3 text-center">{product.name}</p>
                <p class="col-span-4 text-center">{product.price} so'm</p>
            </div>
        {/each}
    </div>
</div>