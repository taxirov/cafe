<script lang="ts">
    import { navigate } from 'svelte-navigator';
    import { UserEndpoint } from "../api";
    import type { User } from '../store';

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

    // types
    import type { Order, ProductInOrder, Room } from '../store';
    // stores
    import { orderStore, productInOrderStore, roomStore } from '../store';
    // endpoints
    import { RoomEndpoint, ProductEndpoint, OrderEndpoint, ProductInOrderEndpoint } from '../api';
    const roomEndpoint = new RoomEndpoint()
    // modals
    import AddOrderModal from "../modalsAll/AddOrderModal.svelte";
    // components
    import OrderComponent from '../components/OrderComponent.svelte';
    
    let show_add: boolean = false

    const orderEndpoint = new OrderEndpoint()
    const productInOrderEndpoint = new ProductInOrderEndpoint()
 
    // // get rooms
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
                    <OrderComponent user_role={user.role} order={order}></OrderComponent>
                {/each}
            {/if}
        </div>
    </div>
    <div class="grow-0 h-fit grid grid-cols-5 bg-white px-2 py-2 sticky bottom-0 right-0 left-0">
        <button on:click={() => { navigate('/m')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
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
        <button on:click={() => { navigate('/mprofile')}} class="flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl">
            <i class="bi bi-person-fill text-2xl"></i>
            <p class="text-[10px] font-bold">Profil</p>
        </button>
    </div>
</section>
