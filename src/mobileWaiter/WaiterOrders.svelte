<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint } from '../api';
    import type { User } from "../store";

    const user: User = JSON.parse(localStorage.getItem('user'))
    const token: string = localStorage.getItem("token")
    const userEndpoint = new UserEndpoint()

    async function checkToken() {
        try {
            const res = await userEndpoint.getTokenVerify(token)
            if (res.status == 200) {
                localStorage.setItem("user", JSON.stringify(res.data.user))
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
    
    // endpoints
    import { RoomEndpoint, OrderEndpoint, CategoryEndpoint, ProductEndpoint } from '../api';
    import { categoryStore, orderStore, roomStore, productStore } from "../store";
    import type { Order, Room, Category, Product } from "../store";
    // components
    import OrderComponent from '../components/OrderComponent.svelte';
    // modals
    import AddOrderModal from "../modalsAll/AddOrderModal.svelte";

    const orderEndpoint = new OrderEndpoint()
    const roomEndpoint = new RoomEndpoint()
    const categoryEndpoint = new CategoryEndpoint();
    const productEndpoint = new ProductEndpoint();
     
    let showAddOrder: boolean = false

    // get products
    async function getProducts() {
        try { 
            const res = await productEndpoint.get()
            const products: Product[] = res.data.products
            productStore.set(products)
        } catch (error) {
            console.log(error)
        }
    } getProducts()

    // get categories
    async function getCategories() {
        try { 
            const res = await categoryEndpoint.get()
            const categories: Category[] = res.data.categories
            categoryStore.set(categories)
        } catch (error) {
            console.log(error)
        }
    } getCategories()
 
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

    // get waiter orders
    async function getOrders() {
        try {
            const res = await orderEndpoint.getWaiterOrders(token)
            const orders: Order[] = res.data.orders
            orderStore.set(orders)
        } catch (error) {
            console.log(error)
        }
    } getOrders()

    setInterval(() => { getProducts(), getCategories(), getRooms(), getOrders()  }, 20000)

</script>

<svelte:head>
    <title>Buyurtmalar</title>
</svelte:head>

<section class="flex flex-col min-h-screen">
    <AddOrderModal show={showAddOrder} close={() => showAddOrder = false } />
    <div class="grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-white shadow-md p-3 h-fit">
        <h2  class="outline-none text-xl font-bold text-indigo-500"><i class="bi bi-clipboard-fill text-2xl text-indigo-500"></i> Buyurtmalar</h2>
        <button on:click={() => { showAddOrder = true }} class="flex items-center gap-1 shadow-sm bg-indigo-500 text-zinc-100 font-bold px-2 rounded-md">
            <p class="text-sm font-bold">Yangi buyurtma</p>
            <i class="bi bi-plus text-2xl"></i>
        </button>
    </div>
    <div class="grow flex flex-col gap-2 p-2">  
        {#each $orderStore as order}
            <OrderComponent order={order} user_role={user.role} />
        {/each}
    </div>
    <div class="grow-0 h-fit grid grid-cols-4 bg-white px-2 py-2 sticky bottom-0 right-0 left-0 shadow-md">
        <button on:click={() => { navigate('/w')}} class="flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl">
            <i class="bi bi-clipboard-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Buyurtmalar</p>
        </button>
        <button on:click={() => { navigate('/products')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-box-seam-fill text-2xl"></i>
            <p class="text-[10px] font-bold">Mahsulotlar</p>
        </button>
        <button on:click={() => { navigate('/wrooms')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-door-open-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Xonalar</p>
        </button>
        <button on:click={() => { navigate('/wprofile')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-person-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Profile</p>
        </button>
    </div>
</section>