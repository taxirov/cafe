<script lang="ts">
    import AcceptDeleteProduct from "../modalsAdmin/AcceptDeleteProduct.svelte";
import EditProductModal from "../modalsAdmin/EditProductModal.svelte";
    import type { Product } from "../store";

    export let product: Product

    let showEditProduct: boolean = false
    let showDeleteProduct: boolean = false
</script>

<AcceptDeleteProduct show={showDeleteProduct} close={() => { showDeleteProduct = false }} product_id={product.id}></AcceptDeleteProduct>
<EditProductModal show={showEditProduct} close={() => { showEditProduct = false }} product={product}></EditProductModal>
<tr>
    <td class="text-center">{product.id}</td>
    <td class="text-center">{product.name}</td>
    <td class="text-center">{product.price}</td>
    <td class="text-center">{product.desc}</td>
    <td class="text-center">
            <button on:click={() => { showEditProduct = true }} class="px-3 py-1 rounded-md bg-blue-500 font-semibold text-zinc-100"> Tahrirlash <i class="bi bi-pencil" /></button>
            <button on:click={() => { showDeleteProduct = true }} class="px-3 py-1 rounded-md bg-red-500 font-semibold text-zinc-100">O'chirish <i class="bi bi-trash" /></button>
    </td>
</tr>