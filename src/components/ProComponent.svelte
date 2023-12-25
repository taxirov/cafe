<script lang="ts">
    import type { ProductInOrder} from "../store"
    import EditStatusProductModal from "../modalsAll/EditStatusProductModal.svelte";
    import AcceptDeleteProModal from "../modalsAll/AcceptDeleteProModal.svelte";

    export let proInOrder: ProductInOrder

    let showEditStatus: boolean = false
    let showDeletePro: boolean = false
    

</script>

<AcceptDeleteProModal show={showDeletePro} close={() => { showDeletePro = false }} pro_id={proInOrder.id}></AcceptDeleteProModal>
<EditStatusProductModal show={showEditStatus} close={() => { showEditStatus = false }} id={proInOrder.id}></EditStatusProductModal>
<div class="flex flex-col gap-3 bg-white p-5 rounded-md shadow-md">
    <span class="flex justify-between border-b-2 pb-2 border-indigo-400">
        <p class="text-lg font-semibold md:text-xl">Mahsulot:</p>
        <p class="text-lg font-meduim md:text-xl">{proInOrder.product.name}</p>
    </span>
    <span class="flex justify-between border-b-2 pb-2 border-indigo-400">
        <p class="text-lg font-semibold md:text-xl">Miqdori:</p>
        <p class="text-lg font-medium md:text-xl">{proInOrder.count}</p>
    </span>
    <span class="flex justify-between border-b-2 pb-2 border-indigo-400">
        <p class="text-lg font-semibold md:text-xl">Xona:</p>
        {#if proInOrder.order.room != null}
            <p class="text-lg font-medium md:text-xl">{proInOrder.order.room.name.toUpperCase()}</p>
        {:else}
            <p class="text-lg font-medium md:text-xl">SOBOY/DOSTOVKA</p>
        {/if}
    </span>
    <div class="flex justify-between">
        <button on:click={() => { showDeletePro = true }} class="bg-red-500 text-white text-sm md:text-md py-2 px-3 rounded-md font-semibold w-fit">Bekor qilish <i class="bi bi-x"></i></button>
        <button on:click={() => { showEditStatus = true }} class="bg-green-500 text-white text-sm md:text-md py-2 px-3 rounded-md font-semibold w-fit">Tasdiqlash <i class="bi bi-check"></i></button>
    </div>
</div>