<script lang="ts">
    import { navigate } from 'svelte-navigator';

    // types
    import type { Order, ProductInOrder } from '../store';
    // stores
    import { orderStore, productInOrderStore } from '../store';

    // endpoints
    import { UserEndpoint, RoomEndpoint, ProductEndpoint, OrderEndpoint, ProductInOrderEndpoint } from '../api';

    // modals
    import AddOrderModal from "../modals/AddOrderModal.svelte";

    // components
    import OrderComponent from '../components/OrderComponent.svelte';
    import AdminNavbar from '../components/AdminNavbar.svelte';
    
    
    let show_add: boolean = false

    const orderEndpoint = new OrderEndpoint()
    const productInOrderEndpoint = new ProductInOrderEndpoint()

    const token: string = localStorage.getItem('token')

 
    // // get rooms
    // async function getRooms() {
    //     try{
    //         const res = await roomEndpoint.get(token)
    //         const rooms: Room[] = res.data.rooms
    //         roomStore.set(rooms)
    //     }
    //     catch(error) {
    //         console.log(error)
    //     }
    // }  getRooms()

    // get orders to do
    async function getTrueOrders() {
        try{
            const res = await orderEndpoint.getStatus(1, token)
            const orders: Order[] = res.data.orders
            orderStore.set(orders)
        }
        catch(error) {
            console.log(error)
        }
    }  getTrueOrders()

    

</script>


<svelte:head>
    <title>Buyurtmalar</title>
</svelte:head>


<section class="flex flex-col min-h-screen">
    <div class="grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-white p-3 h-fit">
        <h2  class="outline-none text-xl font-bold text-indigo-500"><i class="bi bi-clipboard-fill text-2xl text-indigo-500"></i> Buyurtmalar</h2>
        <div class="flex gap-1 items-center">
            <button on:click={() => show_add = true} class="px-2 py-1 text-xl rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-plus"></i></button>
        </div>
    </div>
    <AddOrderModal show={show_add} close={() => show_add = false}></AddOrderModal>
    <div class="grow flex flex-col gap-3 p-3 h-fit">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-start">
            {#if $orderStore.length == 0}
                <p class="text-center text-sm text-gray-400 font-medium">Sizda faol buyurtmalar mavjud emas</p>
            {:else}
                {#each $orderStore as order}
                    <OrderComponent order={order}></OrderComponent>
                {/each}
            {/if}
        </div>
    </div>
    <AdminNavbar current_page={"morders"}></AdminNavbar>
</section>
