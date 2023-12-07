<script lang="ts">
    import { navigate } from "svelte-navigator";
    export let current_page: string
    let m: string = 'bg-indigo-500 text-white'
    let morders: string = 'bg-indigo-500 text-white'
    let madd: string = 'bg-indigo-500 text-white'
    let mrooms: string = 'bg-indigo-500 text-white'
    let mprofile: string = 'bg-indigo-500 text-white'
    if(current_page == 'm') {
        m = 'bg-stone-100 text-indigo-500 shadow-sm';
    } else if (current_page == 'morders') {
        morders = 'bg-stone-100 text-indigo-500 shadow-sm';
    } else if (current_page == 'madd') {
        madd = 'bg-stone-100 text-indigo-500 shadow-sm';
    } else if (current_page == 'mrooms') {
        mrooms = 'bg-stone-100 text-indigo-500 shadow-sm';
    } else {
        mprofile = 'bg-stone-100 text-indigo-500 shadow-sm';
    }
</script>
<nav class="grid grid-cols-5 bg-indigo-500 px-2 py-3 fixed bottom-0 right-0 left-0 rounded-t-2xl">
    <button on:click={() => { navigate('/m')}} class="{m} flex flex-col items-center gap-1 px-2 rounded-xl">
        <i class="bi bi-house-fill text-2xl"></i>
        <p class="text-[8px]">Asosiy</p>
    </button>
    <button on:click={() => { navigate('/morders')}} class="{morders} flex flex-col items-center gap-1 px-2 rounded-xl">
        <i class="bi bi-clipboard-fill text-2xl"></i>
        <p class="text-[8px]">Buyurtmalar</p>
    </button>
    <button on:click={() => { navigate('/madd')}} class="{madd} flex flex-col items-center gap-1 px-2 rounded-xl">
        <i class="bi bi-plus text-2xl"></i>
        <p class="text-[8px]">Qo'shish</p>
    </button>
    <button on:click={() => { navigate('/mrooms')}} class="{mrooms} flex flex-col items-center gap-1 px-2 rounded-xl">
        <i class="bi bi-door-open-fill text-2xl"></i>
        <p class="text-[8px]">Xonalar</p>
    </button>
    <button on:click={() => { navigate('/mprofile')}} class="{mprofile} flex flex-col items-center gap-1 px-2 rounded-xl">
        <i class="bi bi-person-fill text-2xl"></i>
        <p class="text-[8px]">Profil</p>
    </button>
</nav>