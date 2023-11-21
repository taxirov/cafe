<script lang="ts">
    // endpoints
    import { ProductInOrderEndpoint } from '../api/productinorder.api'

    // stores
    import { orderStore, type Order } from "../database/order.store";
    import { roomStore } from "../database/room.store";
    import { productStore } from "../database/product.store";
    import { categoryStore } from '../database/category.store';

    const proInOrEndpoint = new ProductInOrderEndpoint()
    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void
    export let order_id: number
    let category_id: number
    let product_id: number
    let count: number

    async function create() {
        try {
            const res  = await proInOrEndpoint.post(order_id, product_id, count, token)
            const order: Order = res.data.order
            orderStore.update((orders) => orders.concat(order))
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">

        <p class="text-xl text-center font-bold">Buyurtmaga mahsulot qo'shish</p>

        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="room">Kategoriyani tanlang*:</label>
                <select bind:value={category_id}  class="outline-0 border-2 px-3 py-1 rounded" name="room" id="">
                    {#each $categoryStore as category}
                        <option value="{category.id}">{category.name}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="product-id">Mahsulotni tanlang*:</label>
                <select bind:value={product_id}  class="outline-0 border-2 px-3 py-1 rounded" name="room" id="">
                    {#each $productStore.filter(p => p.category_id == category_id) as product}
                        <option value="{product.id}">{product.name}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="product-count">Mahsulotni miqdori*:</label>
                <input bind:value={count} class="outline-0 border-2 px-3 py-1 rounded" type="number" min="1" max="100" name="product-count" id="">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-400 font-semibold"><i class="bi bi-x"></i> Yopish</button>
            <button on:click={create} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold"><i class="bi bi-plus"></i> Yaratish</button>
        </div>
    </div>
</div>