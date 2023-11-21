<script lang="ts">
    import { navigate } from 'svelte-navigator';
    import type { User } from '../database/user.store';
    const user: User = JSON.parse(localStorage.getItem('user'))
</script>

<section class="flex flex-col min-h-screen">
    <div class="grow flex flex-col justify-start gap-2 p-3 h-fit">
        <div class="flex items-center gap-3 p-3 mx-3 bg-violet-500 rounded-xl text-zinc-100">
            <div class="flex flex-col gap-3 p-2">
                <p class="text-md font-bold">Buyurtmalarim soni</p>
                <span class="flex items-end gap-2">
                    <p class="text-3xl font-semibold">23</p>
                    <p class="text-md font-medium"> ta</p>
                </span>
            </div>
            <img class="w-1/2" src="https://cdni.iconscout.com/illustration/premium/thumb/online-order-2750347-2294212.png" alt="order-illustration"/>
        </div>
        <div class="flex flex-col gap-2 px-2">
            <div class="flex justify-between bg-white/80 rounded-xl py-2 px-4">
                <p class="font-semibold text-md">Username:</p>
                <p class="font-medium text-md">{user.username}</p>
            </div>
            <div class="flex justify-between bg-white/80 rounded-xl py-2 px-4">
                <p class="font-semibold text-md">Ism:</p>
                <p class="font-medium text-md">{user.name}</p>
            </div>
            <div class="flex justify-between bg-white/80 rounded-xl py-2 px-4">
                <p class="font-semibold text-md">Rol:</p>
                <p class="font-medium text-md">{user.role.toLocaleUpperCase()}</p>
            </div>
            <div class="flex justify-between bg-white/80 rounded-xl py-2 px-4">
                <p class="font-semibold text-md">Telefon:</p>
                <p class="font-medium text-md">{user.phone}</p>
            </div>
            <div class="flex justify-between bg-white/80 rounded-xl py-2 px-4">
                <p class="font-semibold text-md">Oylik maosh:</p>
                <p class="font-medium text-md">{user.salary} so'm</p>
            </div>
        </div>
    </div>
    <nav class="grow-0 grid grid-cols-5 bg-indigo-500 px-2 py-3 sticky bottom-0 right-0 left-0 rounded-t-2xl h-fit">
        <button on:click={() => { navigate('/m')}} class="flex flex-col items-center gap-1 bg-indigo-500 px-2 rounded-xl">
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
</section>