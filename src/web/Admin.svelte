<script lang="ts">
    import { navigate } from 'svelte-navigator';
    import { roomStore, type Room, type User, orderStore, userStore, type Order, type Product, type Category, categoryStore, productStore, type Book } from '../store';
    import { RoomEndpoint, UserEndpoint, OrderEndpoint, CategoryEndpoint, ProductEndpoint, BookEndpoint } from '../api';
    import OrderComponent from "../components/OrderComponent.svelte"
    import RoomComponent from '../components/RoomComponent.svelte';

    const user: User = JSON.parse(localStorage.getItem('user'))
    const token: string = localStorage.getItem("token")
    const userEndpoint = new UserEndpoint()

    async function checkToken() {
        try {
            const res = await userEndpoint.getTokenVerify(token)
            if (res.status == 200) {
                if (res.data.user.role == "waiter") {
                    navigate('/wrooms')
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
    } 
    else { checkToken() }
    
    const orderEndpoint = new OrderEndpoint()
    const categoryEndpoint = new CategoryEndpoint();
    const productEndpoint = new ProductEndpoint();
    
    if (screen.width < 500) {
        navigate('/m')
    }

    import OrderFake from "../components/OrderFake.svelte";
    const defaultOrders: Order[] = [
        { 
            id: 0, 
            title: 'Zakaz-1', 
            desc: "Anvarning tug'ilgan kuni", 
            user: { id: 0, name: "Sardor Olimov" }, 
            room: { id: 0, name: "Zal-12" }, 
            products: [], 
            total_price: 0, 
            status: 1, 
            create_date: "2023-12-25T11:17:54.016Z", 
            update_date: "2023-12-25T11:17:54.016Z" 
        },
        { 
            id: 1, 
            title: 'Zakaz-2', 
            desc: "Mahalladagi Bekmurod akaning 40 yillik yubileyi", 
            user: { id: 0, name: "Sardor Olimov" }, 
            room: { id: 0, name: "Zal-13" }, 
            products: [], 
            total_price: 0, 
            status: 1, 
            create_date: "2023-12-25T11:17:54.016Z", 
            update_date: "2023-12-25T11:17:54.016Z" 
        }
    ]

    const roomEndpoint = new RoomEndpoint()
    const bookEndpoint = new BookEndpoint()

    const day = new Date().toJSON()

    let totalOrderLastMonth: number = 0
    let totalOrderToday: number = 0
    let totalPriceLastMonth: number = 0
    let totalPriceToday: number = 0

    async function getTodayBrons() {
        let date = (new Date()).toLocaleDateString()
        try {
            const res = await bookEndpoint.date(date, token)
            const books: Book[] = res.data.books 
            if (books.length == 1) {
                await bookEndpoint.status(books, token)
            } else if (books.length == 2) {
                let bo: Book[] = []
                bo[0] = books.filter(b => b.booked_date.split(' ')[1] == 'abet')[0]
                bo[1] = books.filter(b => b.booked_date.split(' ')[1] == 'gech')[0]
                await bookEndpoint.status(bo, token)
            }
        } catch (e) {
            console.log(e)
        }
    } getTodayBrons()

    // get last month orders
    async function getLastMonthOrders() {
        try {
            const res = await orderEndpoint.getByYearMonthDay(day.slice(0,7), token)
            const orders: Order[] = res.data.orders
            totalOrderLastMonth = orders.length
            for (let i = 0; i < orders.length; i++) {
                totalPriceLastMonth += orders[i].total_price
            }
        } catch(e) {
            console.log(e)
        }
    } getLastMonthOrders()

    // get last month orders
    async function getTodayOrders() {
        try {
            const res = await orderEndpoint.getByYearMonthDay(day.slice(0,10), token)
            const orders: Order[] = res.data.orders
            totalOrderToday = orders.length
            for (let i = 0; i < orders.length; i++) {
                totalPriceToday += orders[i].total_price
            }
        } catch(e) {
            console.log(e)
        }
    } getTodayOrders()

    // get users
    async function getUsers() {
        try {
            const res = await userEndpoint.get(token)
            const users: User[] = res.data.users
            userStore.set(users)
        } catch(error) {
            console.log(error)
            navigate('/login')
        }
    } getUsers()
    
    // get orders to do
    async function getTrueOrders() {
        try{
            const res = await orderEndpoint.getStatus(1, 1, token)
            const orders: Order[] = res.data.orders
            orderStore.set(orders)
        }
        catch(error) {
            console.log(error)
        }
    }  getTrueOrders()

    // get rooms
    async function getRooms() {
        try{
            const res = await roomEndpoint.get(token)
            const rooms: Room[] = res.data.rooms
            roomStore.set(rooms)
        }
        catch(error) {
            console.log(error)
        }
    }  getRooms()

    // get categories
    async function getCategories() {
        try {
            const res = await categoryEndpoint.get();
            const categories: Category[] = res.data.categories;
            categoryStore.set(categories);
        } catch (error) {
            console.log(error);
        }
    }  getCategories();

    // get products
    async function getProducts() {
        try {
            const res = await productEndpoint.get()
            const products: Product[] = res.data.products
            productStore.set(products)
        } catch(error) {
            console.log(error)
        }
    } getProducts()

</script>

<svelte:head>
    <title>Asosiy sahifa</title>
</svelte:head>

<section class="flex min-h-screen md:h-screen">
    <div class="grow-0 bg-indigo-600 md:w-1/5 flex flex-col justify-between p-6 sticky bottom-0 top-0 left-0">
        <div class="flex flex-col gap-8">
            <p class="text-2xl font-black text-zinc-100 inline-block">Madat Ota Choyxonasi</p>
            <div class="flex flex-col gap-1">
                <button on:click={() => { navigate('/admin')}} class="flex items-center gap-3 bg-zinc-100 text-indigo-500 p-3 rounded-md shadow-md">
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
                <button on:click={() => { navigate('/profile')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                    <i class="bi bi-person-fill text-lg"></i>
                    <p class="text-md font-bold">Profile</p>
                </button>
                <button on:click={() => { navigate('/bron')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                    <i class="bi bi-bookmarks-fill text-lg"></i>
                    <p class="text-md font-bold">Bronlar</p>
                </button>
            </div>
        </div>
        <p class="text-center py-3 text-zinc-200">Created by <a href="https://saad.uz" target="_blank" class="font-semibold">Saad Takhir</a> </p>
    </div>
    <div class="w-4/5 left-0 flex flex-col h-screen">
        <div class="grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-indigo-500 px-3 py-4 h-fit">
            <h2  class="outline-none text-zinc-100 text-lg font-bold"><i class="bi bi-house-fill text-2xl"></i> Asosiy sahifa</h2>
        </div>
        <div class="grow flex flex-col gap-3 p-5 overflow-y-scroll">
            <div class="umumiy flex flex-col gap-2">
                <h1 class="outline-none font-semibold text-lg">Umumiy ma'lumotlar</h1>
                <div class="grid grid-cols-5 gap-2">
                    <span class="flex flex-col justify-between gap-1 bg-lime-500 text-zinc-100 p-3 rounded-xl relative">
                        <p class="text-lg">Bugungi daromad miqdori</p>
                        <span class="flex justify-between">
                            <span class="flex items-end gap-1">
                                {#if totalPriceToday.toString().length <= 4}
                                    <p class="text-3xl font-bold">
                                        {totalPriceToday.toString()}
                                    </p>
                                    <p class="">ming so'm</p>
                                {:else if totalPriceToday.toString().length == 5}
                                    <p class="text-3xl font-bold">
                                        {totalPriceLastMonth.toString().slice(0,2)}.{totalPriceToday.toString()[2]}
                                    </p>
                                    <p class="">ming so'm</p>
                                {:else if totalPriceToday.toString().length == 6}
                                    <p class="text-3xl font-bold">
                                        {totalPriceToday.toString().slice(0,3)}.{totalPriceToday.toString()[3]}
                                    </p>
                                    <p class="">ming so'm</p>
                                {:else if totalPriceToday.toString().length == 7}
                                    <p class="text-3xl font-bold">
                                        {totalPriceToday.toString()[0]}.{totalPriceToday.toString().slice(1,3)} 
                                    </p>
                                    <p class="">mln so'm</p>
                                {:else if totalPriceToday.toString().length == 8}
                                    <p class="text-3xl font-bold">
                                        {totalPriceToday.toString().slice(0,2)}.{totalPriceToday.toString().slice(2,4)} 
                                    </p>
                                    <p class="">mln so'm</p>
                                {/if}
                            </span>
                            <i class="bi bi-cash-stack absolute text-7xl right-0 bottom-0 opacity-30"></i>
                        </span>
                    </span>
                    <span class="flex flex-col justify-between gap-1 bg-teal-500 text-gray-100 p-3 rounded-xl relative">
                        <p class="text-lg">Bugungi buyurtmalar</p>
                        <span class="flex justify-between">
                            <span class="flex items-end gap-1">
                                <p class="text-3xl font-bold">{totalOrderToday}</p>
                                <p class="">ta</p>
                            </span>
                            <i class="bi bi-box-seam absolute text-7xl right-0 bottom-0 opacity-30"></i>
                        </span>
                    </span>
                    <span class="flex flex-col justify-between gap-1 bg-green-500 text-zinc-100 p-3 rounded-xl relative">
                        <p class="text-lg">Oxirgi oydagi daromad</p>
                        <span class="flex justify-between">
                            <span class="flex items-end gap-1">
                                {#if totalPriceLastMonth.toString().length <= 4}
                                    <p class="text-3xl font-bold">
                                        {totalPriceLastMonth.toString()}
                                    </p>
                                    <p class="">ming so'm</p>
                                {:else if totalPriceLastMonth.toString().length == 5}
                                    <p class="text-3xl font-bold">
                                        {totalPriceLastMonth.toString().slice(0,2)}.{totalPriceLastMonth.toString()[2]}
                                    </p>
                                    <p class="">ming so'm</p>
                                {:else if totalPriceLastMonth.toString().length == 6}
                                    <p class="text-3xl font-bold">
                                        {totalPriceLastMonth.toString().slice(0,3)}.{totalPriceLastMonth.toString()[3]}
                                    </p>
                                    <p class="">ming so'm</p>
                                {:else if totalPriceLastMonth.toString().length == 7}
                                    <p class="text-3xl font-bold">
                                        {totalPriceLastMonth.toString()[0]}.{totalPriceLastMonth.toString().slice(1,3)} 
                                    </p>
                                    <p class="">mln so'm</p>
                                {:else if totalPriceLastMonth.toString().length == 8}
                                    <p class="text-3xl font-bold">
                                        {totalPriceLastMonth.toString().slice(0,2)}.{totalPriceLastMonth.toString().slice(2,4)} 
                                    </p>
                                    <p class="">mln so'm</p>
                                {/if}
                            </span>
                            <i class="bi bi-cash-stack absolute text-7xl right-0 bottom-0 opacity-30"></i>
                        </span>
                    </span>
                    <span class="flex flex-col justify-between gap-1 bg-sky-500 text-gray-100 p-3 rounded-xl relative">
                        <p class="text-lg">Oxirgi oydagi buyurtmalar</p>
                        <span class="flex justify-between">
                            <span class="flex items-end gap-1">
                                <p class="text-3xl font-bold">{totalOrderLastMonth}</p>
                                <p class="">ta</p>
                            </span>
                            <i class="bi bi-box-seam absolute text-7xl right-0 bottom-0 opacity-30"></i>
                        </span>
                    </span>
                    <span class="flex flex-col justify-between gap-1 bg-purple-500 text-gray-100 p-3 rounded-xl relative">
                        <p class="text-lg">Ishchilar soni</p>
                        <span class="flex justify-between">
                            <span class="flex items-end gap-1">
                                <p class="text-3xl font-bold">{$userStore.length}</p>
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
                    <button on:click={() => { navigate('/orders')}} class="px-4 py-2 text-md rounded-md bg-indigo-500 text-zinc-100">Batafsil <i class="bi bi-arrow-right"></i></button>
                </div>
                <div class="grid grid-cols-1 gap-2">
                    {#if $orderStore.length == 0}
                        {#each defaultOrders as order, index}
                            <OrderFake order={order}></OrderFake>
                        {/each}
                    {:else}
                        {#each $orderStore as order, index}
                            {#if index < 2}
                                <OrderComponent user_role={user.role} order={order}></OrderComponent>
                            {/if}
                        {/each}
                    {/if}
                </div>
            </div>
            <div class="rooms flex flex-col gap-3">
                <div class="flex justify-between items-center">
                    <h1 class="outline-none font-semibold text-lg">Xonalar</h1>
                    <button on:click={() => { navigate('/rooms')}} class="px-4 py-2 text-md rounded-md bg-indigo-500 text-zinc-100">Batafsil <i class="bi bi-arrow-right"></i></button>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    {#each $roomStore as room, index}
                        {#if index < 4}
                            <RoomComponent room_booked={room.booked} room_name={room.name} room_capacity={room.capacity} room_desc={room.desc}></RoomComponent>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>