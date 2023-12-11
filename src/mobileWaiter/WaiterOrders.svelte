<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint, OrderEndpoint } from "../api";
    import type { User, Order } from "../store";
    import { orderStore } from "../store"

    const user: User = JSON.parse(localStorage.getItem('user'))
    const token: string = localStorage.getItem("token")
    const userEndpoint = new UserEndpoint()

    async function checkToken() {
        try {
            const res = await userEndpoint.getTokenVerify(token)
            if (res.status == 200) {
                localStorage.setItem("user", JSON.stringify(res.data.user))
                console.log("Verify success")
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

</script>

<svelte:head>
    <title>Ofisiant</title>
</svelte:head>

<section class="flex flex-col min-h-screen">
    <div class="grow">
        
    </div>
    <div class="grow-0 h-fit grid grid-cols-4 bg-white px-2 py-2 sticky bottom-0 right-0 left-0">
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