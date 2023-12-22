<script lang="ts">
    import { navigate } from 'svelte-navigator';
    // api endpoints
    import { UserEndpoint, OrderEndpoint } from '../api';

    // if(screen.width > 450){ navigate('/') }

    const userEndpoint = new UserEndpoint()
    const orderEndpoint = new OrderEndpoint()
    const token = localStorage.getItem('token')

    let orders_count: number = 0
    let users_count: number = 0

    // check token 
    async function getVerify() {
        try {
            const res = await userEndpoint.getTokenVerify(token)
            const user = res.data.user
            localStorage.setItem('user', JSON.stringify(user))
            if(res.status === 200) {
                console.log('Verify succes')
            } else {
                navigate('/login')
            }
        } catch(error) {
            console.log(error)
        }
    }
    getVerify()

    // get users
    async function getUsers() {
        try {
            const res = await userEndpoint.get(token)
            users_count = res.data.users.length
        } catch(error) {
        }
    } getUsers()

    async function getTrueOrders() {
        try{
            const res = await orderEndpoint.getStatus(1, 1, token)
            orders_count = res.data.orders.length
        } catch(error) {
        }
    } getTrueOrders()

</script>

<svelte:head>
    <title>Asosiy sahifa</title>
</svelte:head>

<section class="grid grid-rows-2 bg-indigo-500/10">
    <div class="grow flex flex-col gap-3 p-3 h-fit">
        <div class="umumiy flex flex-col gap-2">
            <h1 class="outline-none font-semibold text-lg">Umumiy ma'lumotlar</h1>
            <div class="grid grid-cols-3 gap-2">
                <span class="flex flex-col justify-between gap-1 bg-green-400 text-gray-100 p-3 rounded-xl relative">
                    <p class="text-sm">Oxirgi oydagi daromad</p>
                    <span class="flex justify-between">
                        <span class="flex items-end gap-1">
                            <p class="text-3xl font-bold">3.6</p>
                            <p class="">mln</p>
                        </span>
                        <i class="bi bi-cash-stack absolute text-7xl right-0 bottom-0 opacity-30"></i>
                    </span>
                </span>
                <span class="flex flex-col justify-between gap-1 bg-sky-400 text-gray-100 p-3 rounded-xl relative">
                    <p class="text-sm">Faol buyurtmalar</p>
                    <span class="flex justify-between">
                        <span class="flex items-end gap-1">
                            <p class="text-3xl font-bold">{orders_count}</p>
                            <p class="">ta</p>
                        </span>
                        <i class="bi bi-box-seam absolute text-7xl right-0 bottom-0 opacity-30"></i>
                    </span>
                </span>
                <span class="flex flex-col justify-between gap-1 bg-purple-400 text-gray-100 p-3 rounded-xl relative">
                    <p class="text-sm">Ishchilar soni</p>
                    <span class="flex justify-between">
                        <span class="flex items-end gap-1">
                            <p class="text-3xl font-bold">{users_count}</p>
                            <p class="">ta</p>
                        </span>
                        <i class="bi bi-people absolute text-7xl right-0 bottom-0 opacity-30"></i>
                    </span>
                </span>
            </div>
        </div>
        <div class="orders flex flex-col gap-3">
            <div class="flex justify-between items-center">
                <h1 class="outline-none font-semibold text-lg">Buyurtmalar</h1>
                <button on:click={() => { navigate('/morders')}} class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100">Batafsil <i class="bi bi-arrow-right"></i></button>
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
        <div class="rooms flex flex-col gap-3">
            <div class="flex justify-between items-center">
                <h1 class="outline-none font-semibold text-lg">Xonalar</h1>
                <button on:click={() => { navigate('/mrooms')}} class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100">Batafsil <i class="bi bi-arrow-right"></i></button>
            </div>
            <div class="grid grid-cols-2 gap-2">
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
    <div class="grow-0 h-fit grid grid-cols-5 bg-white px-2 py-2 sticky bottom-0 right-0 left-0">
        <button on:click={() => { navigate('/m')}} class="flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl">
            <i class="bi bi-house-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Asosiy</p>
        </button>
        <button on:click={() => { navigate('/morders')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-clipboard-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Buyurtmalar</p>
        </button>
        <button on:click={() => { navigate('/madd')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-plus text-2xl"></i>
            <p class="text-[9px] font-bold">Qo'shish</p>
        </button>
        <button on:click={() => { navigate('/mrooms')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-door-open-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Xonalar</p>
        </button>
        <button on:click={() => { navigate('/mprofile')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-person-fill text-2xl"></i>
            <p class="text-[10px] font-bold">Profil</p>
        </button>
    </div>
</section>
