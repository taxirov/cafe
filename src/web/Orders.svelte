<script lang="ts">
    import { CategoryEndpoint, RoleEndpoint, UserEndpoint } from '../api';
    import { navigate } from 'svelte-navigator';

    const userEndpoint = new UserEndpoint()
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    // check token
    async function getVerify() {
        try {
            const res = await userEndpoint.getTokenVerify(token)
            if(res.status == 200) {
                if(user.role === 'admin') {
                    if(screen.width < 500) {
                        navigate('/m')
                    } else {
                        console.log('verify success')
                    }
                } else {
                    navigate('/w')
                }
            } else {
                navigate('/login')
            }
        } catch(error) {
            console.log(error)
        }
    }   getVerify()

    if (screen.width < 500) {
        navigate('/morders')
    }
    
    // types
    import type { Category, Order, Product, ProductInOrder, Role, Room, User } from '../store';
    // stores
    import { categoryStore, orderStore, productInOrderStore, productStore, roleStore, roomStore, userStore } from '../store';
    // endpoints
    import { RoomEndpoint, ProductEndpoint, OrderEndpoint, ProductInOrderEndpoint } from '../api';
    // modals
    import AddOrderModal from "../modalsAll/AddOrderModal.svelte";
    // components
    import OrderComponent from '../components/OrderComponent.svelte';
    
    let show_add: boolean = false

    const orderEndpoint = new OrderEndpoint();
    const roomEndpoint = new RoomEndpoint();
    const categoryEndpoint = new CategoryEndpoint();
    const productEndpoint = new ProductEndpoint();
    
    // get rooms
    async function getRooms() {
        try{
            const res = await roomEndpoint.get(token)
            const rooms: Room[] = res.data.rooms
            roomStore.set(rooms)
        }
        catch(error) {
            console.log(error)
            navigate('/login')
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

    // get orders to do
    async function getTrueOrders() {
        try{
            const res = await orderEndpoint.getTrueStatus(1, 1, token)
            const orders: Order[] = res.data.orders
            orderStore.set(orders)
        }
        catch(error) {
            console.log(error)
        }
    }  getTrueOrders()

    setInterval(() => { getTrueOrders(), getRooms(), getCategories(), getProducts() }, 30000)

</script>

<svelte:head>
    <title>Buyurtmalar sahifasi</title>
</svelte:head>

<section class="flex min-h-screen md:h-screen">
    <div class="grow-0 bg-indigo-600 md:w-1/5 flex flex-col justify-between p-6 sticky bottom-0 top-0 left-0">
        <div class="flex flex-col gap-8">
            <p class="text-2xl font-black text-zinc-100">Madat Ota Choyxonasi</p>
        <div class="flex flex-col gap-1">
            <button on:click={() => { navigate('/admin')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                <i class="bi bi-house-fill text-lg"></i>
                <p class="text-md font-bold">Asosiy</p>
            </button>
            <button on:click={() => { navigate('/orders')}} class="flex items-center gap-3 bg-zinc-100 text-indigo-500 p-3 rounded-md shadow-md">
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
        </div>
        </div>
        <p class="text-center py-3 text-zinc-200">Created by <button class="font-semibold">Saad Takhir</button> </p>
    </div>
    <div class="grow left-0 flex flex-col h-screen">
        <div class="grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-indigo-500 p-3 h-fit">
            <h2  class="outline-none text-lg font-bold text-zinc-100"><i class="bi bi-clipboard-fill"></i> Buyurtmalar</h2>
            <button on:click={() => show_add = true} class="bg-zinc-100 px-4 py-2 text-md text-slate-600 font-bold rounded-md shadow-md">Buyurtma yaratish <i class="bi bi-plus"></i></button>
        </div>
        <AddOrderModal show={show_add} close={() => show_add = false}></AddOrderModal>
        <div class="grow flex flex-col gap-3 p-5 overflow-y-scroll">
            <div class="grid grid-cols-1 justify-start gap-5">
                {#if $orderStore.length == 0}
                    <p class="text-center text-sm md:text-xl text-gray-400 font-medium">Sizda faol buyurtmalar mavjud emas</p>
                {:else}
                    {#each $orderStore as order}
                        <OrderComponent user_role={user.role} order={order}></OrderComponent>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</section>
