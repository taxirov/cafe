<script>
    import { UserEndpoint } from '../api/user.api';
    import { navigate } from 'svelte-navigator';
    import MobileNavbar from '../components/MobileNavbar.svelte';

    if(screen.width > 450){ navigate('/') }

    const userEndpoint = new UserEndpoint()
    const token = localStorage.getItem('token')
    if(!token) {
        navigate('/login')
    }
    async function getVerify() {
        try {
            const res = await userEndpoint.verify(token)
            if(res.status === 401 && res.status === 403) {
                navigate('/login')
            } else {
                console.log('Verify succes')
            }
        } catch(error) {
            console.log(error)
        }
    }
    getVerify()

</script>

<svelte:head>
    <title>Asosiy sahifa</title>
</svelte:head>

<section class="grid grid-rows-2 bg-indigo-500/10">
    <div class="flex flex-col gap-3 p-3 h-fit">
        <div class="umumiy flex flex-col gap-2">
            <h1 class="outline-none">Umumiy ma'lumotlar</h1>
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
                            <p class="text-3xl font-bold">3</p>
                            <p class="">ta</p>
                        </span>
                        <i class="bi bi-box-seam absolute text-7xl right-0 bottom-0 opacity-30"></i>
                    </span>
                </span>
                <span class="flex flex-col justify-between gap-1 bg-purple-400 text-gray-100 p-3 rounded-xl relative">
                    <p class="text-sm">Ishchilar soni</p>
                    <span class="flex justify-between">
                        <span class="flex items-end gap-1">
                            <p class="text-3xl font-bold">5</p>
                            <p class="">ta</p>
                        </span>
                        <i class="bi bi-people absolute text-7xl right-0 bottom-0 opacity-30"></i>
                    </span>
                </span>
            </div>
        </div>
        <div class="orders flex flex-col gap-3 p-3">
            <div class="flex justify-between items-center">
                <h2  class="outline-none">Buyurtmalar</h2>
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
        <div class="rooms flex flex-col gap-3 p-3">
            <div class="flex justify-between items-center">
                <h2  class="outline-none">Xonalar</h2>
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
    <MobileNavbar></MobileNavbar>
</section>
