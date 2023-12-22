<script lang="ts">
    import EditProInOrModal from "../modalsAll/EditProInOrModal.svelte";
    import EditStatusProductModal from "../modalsAll/EditStatusProductModal.svelte";
    import type { ProductInOrder } from "../store";
    export let product: ProductInOrder
    export let index: number

    let show_edit_data:boolean
    let show_edit_status:boolean
</script>
<EditStatusProductModal id={product.id} show={show_edit_status} close={() => show_edit_status = false}></EditStatusProductModal>
<EditProInOrModal productInOrder={product} show={show_edit_data} close={() => show_edit_data = false }></EditProInOrModal>
<tr>
    <td class="text-center font-medium md:text-lg py-1">{index + 1}</td>
    <td class="text-center py-1">
        {product.product.name}
        {#if product.status == 1}
            <i class="bi bi-clipboard-check-fill text-green-500"></i>
        {:else}
            <i class="bi bi-clipboard-x-fill text-red-500"></i>
        {/if}
    </td>
    <td class="text-center font-medium md:text-lg py-1">{product.count}</td>
    <td class="text-center font-medium md:text-lg py-1">{product.total_price}</td>
    <td class="text-center font-medium md:text-lg py-1">
        <button on:click={() => { show_edit_data = true }} class="bg-green-500 text-white text-sm py-2 px-3 rounded-md font-semibold w-fit"><i class="bi bi-pencil"></i></button>
        {#if product.status == 0}
            <button on:click={() => { show_edit_status = true }} class="bg-green-500 text-white text-sm py-2 px-3 rounded-md font-semibold w-fit"><i class="bi bi-check"></i></button>
        {:else}
            <button disabled on:click={() => { show_edit_status = true }} class="bg-green-400 text-white text-sm py-2 px-3 rounded-md font-semibold w-fit"><i class="bi bi-check-all"></i></button>
        {/if}
    </td>
</tr>