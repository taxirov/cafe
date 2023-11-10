<script>

    import { navigate } from "svelte-navigator";

</script>
<nav class="grid grid-cols-4 bg-indigo-500 px-2 py-3 fixed bottom-0 right-0 left-0 rounded-t-2xl">
    <button on:click={() => { navigate('/w')}} class="flex flex-col items-center gap-1 bg-indigo-500 px-2 rounded-xl">
        <i class="bi bi-clipboard-fill text-2xl text-white"></i>
        <p class="text-[9px] text-white">Buyurtmalar</p>
    </button>
    <button on:click={() => { navigate('/products')}} class="flex flex-col items-center gap-1 bg-indigo-500 px-2 rounded-xl">
        <i class="bi bi-box-seam-fill text-2xl text-white"></i>
        <p class="text-[9px] text-white">Mahsulotlar</p>
    </button>
    <button on:click={() => { navigate('/wadd')}} class="flex flex-col items-center gap-1 bg-indigo-500 px-2 rounded-xl">
        <i class="bi bi-plus text-2xl text-white"></i>
        <p class="text-[9px] text-white">Qo'shish</p>
    </button>
    <button on:click={() => { navigate('/wprofile')}} class="flex flex-col items-center gap-1 bg-indigo-500 px-2 rounded-xl">
        <i class="bi bi-person-fill text-2xl text-white"></i>
        <p class="text-[9px] text-white">Profile</p>
    </button>
</nav>


