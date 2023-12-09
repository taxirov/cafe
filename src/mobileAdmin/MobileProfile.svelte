<script lang="ts">
    import { navigate } from 'svelte-navigator';
    import type { User } from '../store';
    import AdminNavbar from '../components/AdminNavbar.svelte';
    const user: User = JSON.parse(localStorage.getItem('user'))

    function logOut(){
        localStorage.clear()
        navigate('/login')
    }

    function copyEmail() {
        navigator.clipboard.writeText(user.email)
    }

</script>

<section class="flex flex-col min-h-screen">
    <div class="grow flex flex-col justify-start gap-2 p-3 h-fit">
        <div class="flex items-center gap-3 p-3 mx-3 bg-violet-500 rounded-xl text-zinc-100 shadow-sm">
            <div class="flex flex-col gap-3 p-2">
                <p class="text-md font-bold">Buyurtmalarim soni</p>
                <span class="flex items-end gap-2">
                    <p class="text-3xl font-semibold">{user.orders}</p>
                    <p class="text-md font-medium"> ta</p>
                </span>
            </div>
            <img class="w-1/2" src="https://cdni.iconscout.com/illustration/premium/thumb/online-order-2750347-2294212.png" alt="order-illustration"/>
        </div>
        <div class="flex flex-col gap-2 px-2">
            <div class="flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-at"></i> Username:</p>
                <p class="font-medium text-md">{user.username}</p>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-person"></i> Ism:</p>
                <p class="font-medium text-md">{user.name}</p>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-shield-check"></i> Rol:</p>
                <p class="font-medium text-md">{user.role.toLocaleUpperCase()}</p>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-phone"></i> Telefon:</p>
                <p class="font-medium text-md">{user.phone}</p>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-xl py-2 pl-4 pr-2 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-envelope"></i> Email:</p>
                <button on:click={copyEmail} class="font-medium text-sm bg-slate-200 px-2 py-1 rounded-xl">{user.email}</button>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-cash"></i> Oylik maosh:</p>
                <p class="font-medium text-md">{user.salary} so'm</p>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-xl py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-calendar-event"></i> Ro'yhatdan o'tgan sana:</p>
                <p class="font-medium text-md">{user.create_date.toString().split('T')[0]}</p>
            </div>
            <div class="flex justify-center items-center bg-red-500 text-white rounded-xl py-2 px-4 shadow-sm">
                <button on:click={logOut} class="font-bold text-sm"><i class="bi bi-box-arrow-left"></i>  Tizimdan chiqish</button>
            </div>
        </div>
    </div>
    <AdminNavbar current_page={'mprofile'}></AdminNavbar>
</section>