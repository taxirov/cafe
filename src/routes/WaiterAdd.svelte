<script lang="ts">
    import WaiterNavbar from '../components/WaiterNavbar.svelte';
</script>

<svelte:head>
    <title>Qo'shish</title>
</svelte:head>

<section class="grid grid-rows-2">
    <section>
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
        <div class="categories flex flex-col gap-3 p-2">
            <div class="flex justify-between items-center">
                <p>Kategoriyalar</p>
                <div class="flex gap-1 items-center">
                    <button class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-filter"></i></button>
                    <button class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-plus"></i></button>
                </div>
            </div>
            <table class="border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th class="border border-slate-600">T/r</th>
                        <th class="border border-slate-600">Nomi</th>
                        <th class="border border-slate-600">Mah. soni</th>
                        <th class="border border-slate-600">O'zgartirish</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border border-slate-600">1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <WaiterNavbar></WaiterNavbar>
</section>