<script>

    import { navigate } from "svelte-navigator";

</script>
<nav class="grid grid-cols-5 bg-indigo-500 px-2 py-3 fixed bottom-0 right-0 left-0 rounded-t-2xl">
    <button on:click={() => { navigate('/mobile')}} class="flex flex-col items-center gap-1 bg-indigo-500 px-2 rounded-xl">
        <i class="bi bi-house-fill text-2xl text-white"></i>
        <p class="text-[8px] text-white">Asosiy</p>
    </button>
    <button on:click={() => { navigate('/morders')}} class="flex flex-col items-center gap-1 bg-indigo-500 px-2 rounded-xl">
        <i class="bi bi-clipboard-fill text-2xl text-white"></i>
        <p class="text-[8px] text-white">Buyurtmalar</p>
    </button>
    <button on:click={() => { navigate('/madd')}} class="flex flex-col items-center gap-1 bg-indigo-500 px-2 rounded-xl">
        <i class="bi bi-plus text-2xl text-white"></i>
        <p class="text-[8px] text-white">Qo'shish</p>
    </button>
    <button on:click={() => { navigate('/mrooms')}} class="flex flex-col items-center gap-1 bg-indigo-500 px-2 rounded-xl">
        <i class="bi bi-door-open-fill text-2xl text-white"></i>
        <p class="text-[8px] text-white">Xonalar</p>
    </button>
    <button on:click={() => { navigate('/mprofile')}} class="flex flex-col items-center gap-1 bg-indigo-500 px-2 rounded-xl">
        <i class="bi bi-person-fill text-2xl text-white"></i>
        <p class="text-[8px] text-white">Profil</p>
    </button>
</nav>