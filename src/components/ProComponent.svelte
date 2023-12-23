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
<div class="flex flex-col gap-3 bg-white p-5 rounded-md">
    <p class="text-lg md:text-xl"><b>Mahsulot:</b> {proInOrder.product.name}</p>
    <p class="text-lg md:text-xl"><b>Miqdori:</b> {proInOrder.count}</p>
    <div class="flex justify-between items-center">
        {#if proInOrder.order.room != null}
            <span class="flex gap-2">
                <p class="text-lg font-bold">Xona:</p>
                <p class="px-3 py-1 rounded-md text-zinc-100 bg-purple-500 font-semibold">{proInOrder.order.room.name}</p>
            </span>
        {:else}
            <span class="flex gap-2">
                <p class="text-lg font-bold">Xona:</p>
                <p class="px-3 py-1 rounded-md text-zinc-100 bg-pink-500 font-semibold">SOBOY/DOSTOVKA</p>
            </span>
        {/if}
    </div>
    <div class="flex justify-between">
        <button on:click={() => { showEditStatus = true }} class="bg-red-500 text-white text-sm py-2 px-3 rounded-md font-semibold w-fit">Bekor qilish <i class="bi bi-x"></i></button>
        <button on:click={() => { showDeletePro = true }} class="bg-green-500 text-white text-sm py-2 px-3 rounded-md font-semibold w-fit">Tasdiqlash <i class="bi bi-check"></i></button>
    </div>
</div>