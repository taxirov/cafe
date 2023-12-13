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
                if (res.data.user.role == "admin") {
                    navigate('/mprofile')
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

<section class="flex flex-col min-h-screen">
    <div class="grow  flex flex-col justify-start gap-2 p-2">
        <div class="flex flex-col">
            <div class="mx-5 h-[6px] bg-violet-300 bottom-0 right-0 left-0 top-10 z-10 shadow-sm rounded-t-xl"></div>
            <div class="mx-3 h-[8px] bg-violet-400 bottom-0 right-0 left-0 top-10 z-10 rounded-t-xl"></div>
            <div class="flex items-center gap-3 p-3 bg-violet-500 rounded-xl text-stone-100 shadow-sm z-20">
                <div class="flex flex-col gap-3 p-2">
                    <p class="text-md font-bold">Buyurtmalarim soni</p>
                    <span class="flex items-end gap-2">
                        <p class="text-3xl font-semibold">{user.orders}</p>
                        <p class="text-md font-medium"> ta</p>
                    </span>
                </div>
                <img class="w-1/2" src="https://cdni.iconscout.com/illustration/premium/thumb/online-order-2750347-2294212.png" alt="order-illustration"/>
            </div>
            
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-at"></i> Username:</p>
                <p class="font-medium text-md">{user.username}</p>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-person"></i> Ism:</p>
                <p class="font-medium text-md">{user.name}</p>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-shield-check"></i> Rol:</p>
                <p class="font-medium text-md">{user.role.toLocaleUpperCase()}</p>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-phone"></i> Telefon:</p>
                <p class="font-medium text-md">{user.phone}</p>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-lg py-2 pl-4 pr-2 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-envelope"></i> Email:</p>
                <button on:click={copyEmail} class="font-medium text-sm bg-slate-200 px-2 py-1 rounded-lg">{user.email}</button>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-cash"></i> Oylik maosh:</p>
                <p class="font-medium text-md">{user.salary} so'm</p>
            </div>
            <div class="flex justify-between items-center bg-white/80 rounded-lg py-2 px-4 shadow-sm">
                <p class="font-bold text-sm"><i class="bi bi-calendar-event"></i> Ro'yhatdan o'tgan sana:</p>
                <p class="font-medium text-md">{user.create_date.toString().split('T')[0]}</p>
            </div>
            <div class="flex justify-center items-center bg-red-500 text-white rounded-lg py-2 px-4 shadow-sm">
                <button on:click={logOut} class="font-bold text-sm"><i class="bi bi-box-arrow-left"></i>  Tizimdan chiqish</button>
            </div>
        </div>
    </div>
    <div class="grow-0 h-fit grid grid-cols-4 bg-white px-2 py-2 sticky bottom-0 right-0 left-0 shadow-xl">
        <button on:click={() => { navigate('/w')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-clipboard-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Buyurtmalar</p>
        </button>
        <button on:click={() => { navigate('/products')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-box-seam-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Mahsulotlar</p>
        </button>
        <button on:click={() => { navigate('/wrooms')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-door-open-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Xonalar</p>
        </button>
        <button on:click={() => { navigate('/wprofile')}} class="flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl">
            <i class="bi bi-person-fill text-2xl"></i>
            <p class="text-[10px] font-bold">Profile</p>
        </button>
    </div>
</section>