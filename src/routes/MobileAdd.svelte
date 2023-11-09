<script lang="ts">
    import MobileNavbar from '../components/MobileNavbar.svelte';
</script>

<svelte:head>
    <title>Qo'shish</title>
</svelte:head>

<section class="grid grid-rows-2 bg-indigo-500/10">
    <div class="orders flex flex-col gap-3 p-3">
        <div class="flex justify-between items-center">
            <h2  class="outline-none">Buyurtmaga mahsulot qo'shish</h2>
            <div class="flex gap-1 items-center">
                <button class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-filter"></i></button>
                <button class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-plus"></i></button>
            </div>
        </div>
        <div>
            <select name="orders" id="">
                <option value="order1">32-buyurtma</option>
                <option value="order2">33-buyurtma</option>
                <option value="order3">34-buyurtma</option>
            </select>
        </div>
    </div>
    <MobileNavbar></MobileNavbar>
</section>