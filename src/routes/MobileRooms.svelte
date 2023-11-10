<script lang="ts">
    import { navigate } from 'svelte-navigator';
    import MobileNavbar from '../components/AdminNavbar.svelte';
</script>


<svelte:head>
    <title>Xonalar</title>
</svelte:head>

<section class="grid grid-rows-2 bg-indigo-500/10">
    <div class="flex flex-col gap-3 p-3 h-fit">
        <div class="rooms flex flex-col gap-3 p-3">
            <div class="flex justify-between items-center">
                <h2  class="outline-none">Xonalar</h2>
                <div class="flex gap-1 items-center">
                    <button class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-filter"></i></button>
                    <button class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-plus"></i></button>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div class="flex flex-col shadow-md rounded-xl bg-white">
                    <img class="rounded-t-xl" src="https://b.zmtcdn.com/data/pictures/6/19877256/3275c38ad9d367b8a7acf16934344973.jpeg" alt="">
                    <div class="flex flex-col gap-1 p-3">
                        <p class="text-md font-bold">Xona nomi</p>
                        <p class="text-sm">Xona haqida. Lorem ipsum dolor sit amet.</p>
                        <p class="bg-green-300 rounded-lg p-2 text-sm text-center">Xona bo'sh</p>
                    </div>
                </div>
                <div class="flex flex-col shadow-md rounded-xl bg-white">
                    <img class="rounded-t-xl" src="https://b.zmtcdn.com/data/pictures/6/19877256/3275c38ad9d367b8a7acf16934344973.jpeg" alt="">
                    <div class="flex flex-col gap-1 p-3">
                        <p class="text-md font-bold">Xona nomi</p>
                        <p class="text-sm">Xona haqida. Lorem ipsum dolor sit amet.</p>
                        <p class="bg-red-300 rounded-lg p-2 text-sm text-center">Band qilingan</p>
                    </div>
                </div>
                <div class="flex flex-col shadow-md rounded-xl bg-white">
                    <img class="rounded-t-xl" src="https://b.zmtcdn.com/data/pictures/6/19877256/3275c38ad9d367b8a7acf16934344973.jpeg" alt="">
                    <div class="flex flex-col gap-1 p-3">
                        <p class="text-md font-bold">Xona nomi</p>
                        <p class="text-sm">Xona haqida. Lorem ipsum dolor sit amet.</p>
                        <p class="bg-red-300 rounded-lg p-2 text-sm text-center">Band qilingan</p>
                    </div>
                </div>
                <div class="flex flex-col shadow-md rounded-xl bg-white">
                    <img class="rounded-t-xl" src="https://b.zmtcdn.com/data/pictures/6/19877256/3275c38ad9d367b8a7acf16934344973.jpeg" alt="">
                    <div class="flex flex-col gap-1 p-3">
                        <p class="text-md font-bold">Xona nomi</p>
                        <p class="text-sm">Xona haqida. Lorem ipsum dolor sit amet.</p>
                        <p class="bg-red-300 rounded-lg p-2 text-sm text-center">Band qilingan</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <MobileNavbar></MobileNavbar>
</section>
