<script lang="ts">
    import AcceptDeleteCategory from "../modalsAdmin/AcceptDeleteCategory.svelte";
    import EditCategoryModal from "../modalsAdmin/EditCategoryModal.svelte";
    import type { Category } from "../store";

    export let category: Category
    export let index: number

    let showEditCategory: boolean = false
    let showDeleteCategory: boolean = false

</script>
<AcceptDeleteCategory show={showDeleteCategory} close={() => { showDeleteCategory = false }} category_id={category.id}></AcceptDeleteCategory>
<EditCategoryModal show={showEditCategory} close={() => { showEditCategory = false }} category={category}></EditCategoryModal>
<tr>
    <td class="text-center">{index + 1}</td>
    <td class="text-center">{category.name}</td>
    <td class="text-center">{category.products.length}</td>
    {#if screen.width > 500}
        <td class="text-center">{category.desc}</td>
    {/if}
    <td class="text-center">
        <button on:click={() => { showEditCategory = true }} class="px-3 py-1 rounded-md font-semibold text-zinc-100 bg-blue-500">{#if screen.width > 500} Tahrirlash{/if} <i class="bi bi-pencil" /></button>
        <button on:click={() => { showDeleteCategory = true }} class="px-3 py-1 rounded-md font-semibold text-zinc-100 bg-red-500">{#if screen.width > 500} O'chirish{/if} <i class="bi bi-trash" /></button>
    </td>
</tr>