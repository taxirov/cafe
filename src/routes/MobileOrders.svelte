<script lang="ts">
    import { navigate } from 'svelte-navigator';
    import MobileNavbar from '../components/AdminNavbar.svelte';
</script>

<svelte:head>
    <title>Buyurtmalar</title>
</svelte:head>

<section class="grid grid-rows-2 bg-indigo-500/10">
    <div class="orders flex flex-col gap-3 p-3">
        <div class="flex justify-between items-center">
            <h2  class="outline-none">Buyurtmalar</h2>
            <div class="flex gap-1 items-center">
                <button class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-filter"></i></button>
                <button class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-plus"></i></button>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-2">
            <div class="flex flex-col gap-2 shadow-md rounded-xl p-3 bg-white">
                <h2 class="font-bold text-md">Buyurtma sarlavhasi</h2>
                <div class="flex flex-col gap-1">
                    <p class="text-md">Mahsulotlar:</p>
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between bg-indigo-500/10 rounded-xl p-2">
                            <span class="flex gap-1 w-1/2">
                                <span class="w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://img.freepik.com/premium-photo/fried-fish-with-lemon-dark-board-male-hands-black_239004-146.jpg')]"></span>
                                <p class="font-semibold">Qovurilgan baliq</p>
                            </span>
                            <span class="flex flex-col items-end gap-1 w-1/2">
                                <p>3 kg</p>
                                <p>150000 so'm</p>
                            </span>
                        </div>
                        <div class="flex justify-between bg-indigo-500/10 rounded-xl p-2">
                            <span class="flex gap-1 w-1/2">
                                <span class="w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://images.uzum.uz/cf7p3f2vtie1lhbhc7ig/original.jpg')]"></span>
                                <p class="font-semibold">Coca Cola 1.5</p>
                            </span>
                            <span class="flex flex-col items-end gap-1 w-1/2">
                                <p>2 ta</p>
                                <p>26000 so'm</p>
                            </span>
                        </div>
                        <div class="flex justify-between bg-indigo-500/10 rounded-xl p-2">
                            <span class="flex gap-1 w-1/2">
                                <span class="w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://images.uzum.uz/ce8a878v1htd23airm6g/original.jpg')]"></span>
                                <p class="font-semibold">Fanta 1.5</p>
                            </span>
                            <span class="flex flex-col items-end gap-1 w-1/2">
                                <p>2 ta</p>
                                <p>26000 so'm</p>
                            </span>
                        </div>
                    </div>
                    <p class="bg-green-300 rounded-lg p-2 text-sm text-center">Faol buyurtma</p>
                </div>
            </div>
            <div class="flex flex-col gap-2 shadow-md rounded-xl p-3 bg-white">
                <h2 class="font-bold text-md">Buyurtma sarlavhasi</h2>
                <div class="flex flex-col gap-1">
                    <p class="text-md">Mahsulotlar:</p>
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between bg-indigo-500/10 rounded-xl p-2">
                            <span class="flex gap-1 w-1/2">
                                <span class="w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://img.freepik.com/premium-photo/fried-fish-with-lemon-dark-board-male-hands-black_239004-146.jpg')]"></span>
                                <p class="font-semibold">Qovurilgan baliq</p>
                            </span>
                            <span class="flex flex-col items-end gap-1 w-1/2">
                                <p>3 kg</p>
                                <p>150000 so'm</p>
                            </span>
                        </div>
                        <div class="flex justify-between bg-indigo-500/10 rounded-xl p-2">
                            <span class="flex gap-1 w-1/2">
                                <span class="w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://images.uzum.uz/cf7p3f2vtie1lhbhc7ig/original.jpg')]"></span>
                                <p class="font-semibold">Coca Cola 1.5</p>
                            </span>
                            <span class="flex flex-col items-end gap-1 w-1/2">
                                <p>2 ta</p>
                                <p>26000 so'm</p>
                            </span>
                        </div>
                        <div class="flex justify-between bg-indigo-500/10 rounded-xl p-2">
                            <span class="flex gap-1 w-1/2">
                                <span class="w-[40px] rounded-md bg-clip-border bg-center bg-cover bg-[url('https://images.uzum.uz/ce8a878v1htd23airm6g/original.jpg')]"></span>
                                <p class="font-semibold">Fanta 1.5</p>
                            </span>
                            <span class="flex flex-col items-end gap-1 w-1/2">
                                <p>2 ta</p>
                                <p>26000 so'm</p>
                            </span>
                        </div>
                    </div>
                    <p class="bg-green-300 rounded-lg p-2 text-sm text-center">Faol buyurtma</p>
                </div>
            </div>
        </div>
    </div>
    <MobileNavbar></MobileNavbar>
</section>