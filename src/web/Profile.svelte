<script lang="ts">
    import { navigate } from 'svelte-navigator';
    import type { User } from '../store';
    import { UserEndpoint } from '../api';
    const user: User = JSON.parse(localStorage.getItem('user'))
    const token: string = localStorage.getItem("token")
    const userEndpoint = new UserEndpoint()

    async function checkToken() {
        try {
            const res = await userEndpoint.getTokenVerify(token)
            if (res.status == 200) {
                if (res.data.user.role == "waiter") {
                    navigate('/wprofile')
                } else {
                    localStorage.setItem("user", JSON.stringify(res.data.user))
                    console.log("Verify success")
                }
            }
        } catch (error) {
            navigate('/login')
        }
    }

    if (!token || !user) {
        localStorage.clear()
        navigate('/login')
    } else {
        checkToken()
    }

    if (screen.width < 500) {
        navigate('/mprofile')
    }
    
    function logOut(){
        localStorage.clear()
        navigate('/login')
    }

    function copyEmail() {
        navigator.clipboard.writeText(user.email)
    }

</script>

<svelte:head>
    <title>Profile</title>
</svelte:head>

<section class="flex min-h-screen md:h-screen">
    <div class="grow-0 bg-indigo-600 w-1/5 flex flex-col justify-between p-6 sticky bottom-0 top-0 left-0">
        <div class="flex flex-col gap-8">
            <p class="text-2xl font-black text-zinc-100">Madat Ota Choyxonasi</p>
            <div class="flex flex-col gap-1">
                <button on:click={() => { navigate('/admin')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                    <i class="bi bi-house-fill text-lg"></i>
                    <p class="text-md font-bold">Asosiy</p>
                </button>
                <button on:click={() => { navigate('/orders')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                    <i class="bi bi-clipboard-fill text-lg"></i>
                    <p class="text-md font-bold">Buyurtmalar</p>
                </button>
                <button on:click={() => { navigate('/add')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                    <i class="bi bi-database-fill-gear text-lg"></i>
                    <p class="text-md font-bold">Boshqarish</p>
                </button>
                <button on:click={() => { navigate('/rooms')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                    <i class="bi bi-door-open-fill text-lg"></i>
                    <p class="text-md font-bold">Xonalar</p>
                </button>
                <button on:click={() => { navigate('/archive')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                    <i class="bi bi-archive-fill text-lg"></i>
                    <p class="text-md font-bold">Arxiv</p>
                </button>
                <button on:click={() => { navigate('/profile')}} class="flex items-center gap-3 bg-zinc-100 text-indigo-500 p-3 rounded-md shadow-md">
                    <i class="bi bi-person-fill text-lg"></i>
                    <p class="text-md font-bold">Profile</p>
                </button>
            </div>
        </div>
        <p class="text-center py-3 text-zinc-200">Created by <button class="font-semibold">Saad Takhir</button> </p>
    </div>
    <div class="grow w-4/5 flex flex-col h-screen">
        <div class="grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-indigo-500 p-3 h-fit">
            <h2  class="outline-none text-lg font-bold text-zinc-100"><i class="bi bi-person-fill"></i> Profile</h2>
            <button on:click={logOut} class="font-bold text-sm text-slate-600 bg-zinc-100 py-2 px-4 rounded-md shadow-sm w-fit"><i class="bi bi-box-arrow-left"></i>  Tizimdan chiqish</button>
        </div>
        <div class="grow flex flex-col justify-between items-end p-5 overflow-y-auto">
            <div class="flex gap-5">
                <div class="flex flex-col gap-3 w-2/3">
                    <div class="flex justify-between items-center bg-white/80 rounded-xl py-3 px-4 shadow-sm">
                        <p class="font-bold md:text-lg"><i class="bi bi-at"></i> Username:</p>
                        <p class="font-medium md:text-lg">{user.username}</p>
                    </div>
                    <div class="flex justify-between items-center bg-white/80 rounded-xl py-3 px-4 shadow-sm">
                        <p class="font-bold md:text-lg"><i class="bi bi-person"></i> Ism Familiya:</p>
                        <p class="font-medium md:text-lg">{user.name}</p>
                    </div>
                    <div class="flex justify-between items-center bg-white/80 rounded-xl py-3 px-4 shadow-sm">
                        <p class="font-bold md:text-lg"><i class="bi bi-shield-check"></i> Rol:</p>
                        <p class="font-medium md:text-lg">{user.role.toLocaleUpperCase()}</p>
                    </div>
                    <div class="flex justify-between items-center bg-white/80 rounded-xl py-3 px-4 shadow-sm">
                        <p class="font-bold md:text-lg"><i class="bi bi-phone"></i> Telefon raqam:</p>
                        <p class="font-medium md:text-lg">{user.phone}</p>
                    </div>
                    <div class="flex justify-between items-center bg-white/80 rounded-xl py-3 pl-4 pr-2 shadow-sm">
                        <p class="font-bold md:text-lg"><i class="bi bi-envelope"></i> Email:</p>
                        <button on:click={copyEmail} class="font-medium text-md bg-slate-200 px-2 py-1 rounded-xl">{user.email}</button>
                    </div>
                    <div class="flex justify-between items-center bg-white/80 rounded-xl py-3 px-4 shadow-sm">
                        <p class="font-bold md:text-lg"><i class="bi bi-cash"></i> Oylik maosh:</p>
                        <p class="font-medium md:text-lg">{user.salary.toLocaleString('ja-JP')} so'm</p>
                    </div>
                    <div class="flex justify-between items-center bg-white/80 rounded-xl py-3 px-4 shadow-sm">
                        <p class="font-bold md:text-lg"><i class="bi bi-calendar-event"></i> Ro'yhatdan o'tgan sana:</p>
                        <p class="font-medium md:text-lg">{user.create_date.toString().split('T')[0]}</p>
                    </div>
                </div>
                <div class="flex flex-col h-full w-1/3">
                    <div class="mx-5 h-[6px] bg-violet-300 bottom-0 right-0 left-0 top-10 z-10 shadow-sm rounded-t-xl"></div>
                    <div class="mx-3 h-[8px] bg-violet-400 bottom-0 right-0 left-0 top-10 z-10 rounded-t-xl"></div>
                    <div class="flex flex-col items-center gap-3 p-3 bg-violet-500 rounded-xl text-stone-100 shadow-sm">
                        <div class="flex justify-between itmes-end gap-3 p-2">
                            <p class="text-xl w-2/3 font-bold">Buyurtmalarim jami soni</p>
                            <span class="flex items-end gap-2">
                                <p class="text-5xl font-semibold">{user.orders}</p>
                                <p class="text-md font-medium"> ta</p>
                            </span>
                        </div>
                        <img class="w-full" src="https://cdni.iconscout.com/illustration/premium/thumb/online-order-2750347-2294212.png" alt="order-illustration"/>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</section>
