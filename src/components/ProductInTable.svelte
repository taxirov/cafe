<script lang="ts">
    import AcceptDeleteProduct from "../modalsAdmin/AcceptDeleteProduct.svelte";
import EditProductModal from "../modalsAdmin/EditProductModal.svelte";
    import type { Product } from "../store";

    export let product: Product
    export let index: number

    let showEditProduct: boolean = false
    let showDeleteProduct: boolean = false
</script>

<AcceptDeleteProduct show={showDeleteProduct} close={() => { showDeleteProduct = false }} product_id={product.id}></AcceptDeleteProduct>
<EditProductModal show={showEditProduct} close={() => { showEditProduct = false }} product={product}></EditProductModal>
<tr>
    <td class="text-center">{index + 1}</td>
    <td class="text-center">{product.name}</td>
    <td class="text-center">{product.price}</td>
    {#if screen.width > 500}
        <td class="text-center">{product.desc}</td>
    {/if}
    <td class="text-center">
            <button on:click={() => { showEditProduct = true }} class="px-3 py-1 rounded-md bg-blue-500 font-semibold text-zinc-100">{#if screen.width > 500} Tahrirlash{/if} <i class="bi bi-pencil" /></button>
            <button on:click={() => { showDeleteProduct = true }} class="px-3 py-1 rounded-md bg-red-500 font-semibold text-zinc-100">{#if screen.width > 500} O'chirish{/if} <i class="bi bi-trash" /></button>
    </td>
</tr>