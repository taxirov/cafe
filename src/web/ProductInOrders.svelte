<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint } from "../api";

    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
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

    import { ProductInOrderEndpoint } from "../api";
    import { productInOrderStore, type ProductInOrder } from "../store";
    import ProComponent from "../components/ProComponent.svelte";

    const proInOrder = new ProductInOrderEndpoint()

    // get status 0 product in orders
    async function getZeroStatus() {
        try {
            const res = await proInOrder.get(token)
            const productInOrders = res.data.productInOrders
            productInOrderStore.set(productInOrders)
        } catch(e) {
            console.log(e)
        }
    } getZeroStatus()

    setInterval(() => { getZeroStatus() }, 5000)

</script>

<section class="flex flex-col">
    <div class="grow-0 h-fit bg-indigo-500 p-2 md:p-3">
        <p class="text-md md:text-lg text-center text-zinc-100 font-semibold">Berilmagan mahsulotlar</p>
    </div>
    <div class="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 p-3 md:p-8">
        {#each $productInOrderStore as proInOrder}
            <ProComponent proInOrder={proInOrder}></ProComponent>
        {/each}
    </div>
</section>