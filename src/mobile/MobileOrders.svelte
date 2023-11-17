<script lang="ts">
    import { navigate } from 'svelte-navigator';

    // stores
    import { roomStore } from '../database/room.store';
    import { orderStore } from '../database/order.store';
    import { userStore } from '../database/user.store';
    import { productStore } from '../database/product.store';

    // types
    import type { Room } from '../database/room.store';
    import type { Order } from '../database/order.store';
    import type { User } from '../database/user.store';
    import type { Product } from '../database/product.store';

    // endpoints
    import { RoomEndpoint } from '../api/room.api';
    import { OrderEndpoint } from '../api/order.api';
    import { UserEndpoint } from '../api/user.api';

    // modals
    import AddOrderModal from "../modals/AddOrderModal.svelte";
    import AcceptEndOrder from "../modals/AcceptEndOrder.svelte";

    // components
    import OrderComponent from '../components/OrderComponent.svelte';
    
    
    let show_add: boolean = false

    const roomEndpoint = new RoomEndpoint()
    const orderEndpoint = new OrderEndpoint()
    const userEndpoint = new UserEndpoint()

    const token: string = localStorage.getItem('token')
    let room: Room
    let products: Product[]

    let status_order = ''
    let room_id = ''

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

    // get users
    async function getUsers() {
        try {
            const res = await userEndpoint.get(token)
            const users: User[] = res.data.users
            userStore.set(users)
        } catch(error) {
            console.log(error)
        }
    } getUsers()

    // get orders to do
    async function getOrders() {
        try{
            const res = await orderEndpoint.get(token, status_order, room_id)
            const res_orders = res.data.orders
            let orders: Order[] = []
            for(let i in res_orders) {
                let user               
            }
            orderStore.set(orders)
        }
        catch(error) {
            console.log(error)
        }
    }  getOrders()

    

</script>


<svelte:head>
    <title>Xonalar</title>
</svelte:head>


<section class="flex flex-col min-h-screen">
    <div class="grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-white p-3 h-fit">
        <h2  class="outline-none text-xl font-bold text-indigo-500"><i class="bi bi-clipboard-fill text-2xl text-indigo-500"></i> Buyurtmalar</h2>
        <div class="flex gap-1 items-center">
            <button class="px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-filter"></i></button>
            <button on:click={() => show_add = true} class="px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-plus"></i></button>
        </div>
    </div>
    <AddOrderModal show={show_add} close={() => show_add = false}></AddOrderModal>
    <div class="grow flex flex-col gap-3 p-3 h-fit">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-start">
            {#if $orderStore.length == 0}
                <p class="text-center text-md text-gray-400 font-medium">Sizda faol buyurtmalar mavjud emas</p>
            {:else}
                {#each $orderStore as order}
                    <OrderComponent id={order.id} title={order.title} status={order.status} total_price={order.total_price} created_date={order.created_date}, room={room} products={products}></OrderComponent>
                {/each}
            {/if}
        </div>
    </div>

    <nav class="grow-0 h-fit grid grid-cols-5 bg-indigo-500 px-2 py-3 sticky bottom-0 right-0 left-0 rounded-t-2xl">
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
