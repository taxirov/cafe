<script lang="ts">
    // endpoints
    import { ProductInOrderEndpoint } from '../api'
    // stores
    import { orderStore, productStore, categoryStore } from "../store";
    // types
    import type { Order, ProductInOrder } from "../store";
    const token  = localStorage.getItem("token")

    const proInOrEndpoint = new ProductInOrderEndpoint()

    export let show: boolean
    export let close: () => void
    export let productInOrder: ProductInOrder

    let category_id: number = productInOrder.product.category_id

    let category: HTMLSelectElement
    let product: number = productInOrder.product.id
    let count: number = productInOrder.count

    function onSelectCategory() {
        category_id = +category.value
    }

    async function editProduct() {
        try {
            const res  = await proInOrEndpoint.put(productInOrder.id, product, +count, token)
            const proInOrder: ProductInOrder = res.data.productInOrder
            let order = $orderStore.filter(o => o.id == proInOrder.order_id)[0]
            let products_filter = order.products.filter(p => p.id != proInOrder.id)
            products_filter.push(proInOrder)
            order.products = products_filter
            if (proInOrder.status == 1) {
                let order_total_price = order.total_price - productInOrder.total_price
                order_total_price += proInOrder.total_price
                order.total_price = order_total_price
            }
            orderStore.update(orders => { return orders.filter(o => o.id != order.id)})
            orderStore.update(orders => { return orders.concat([order]) })
            close()
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteProduct() {
        try {
            const res = await proInOrEndpoint.delete(productInOrder.id, token)
            const proInOrder_deleted: ProductInOrder = res.data.productInOrder
            let order = $orderStore.filter(o => o.id == proInOrder_deleted.order_id)[0]
            let products_filter = order.products.filter(p => p.id != proInOrder_deleted.id)
            order.products = products_filter
            if (proInOrder_deleted.status == 1) {
                let order_total_price = order.total_price - proInOrder_deleted.total_price
                order.total_price = order_total_price
            }
            orderStore.update(orders => { return orders.filter(o => o.id != order.id)})
            orderStore.update(orders => { return orders.concat([order]) })
            close()
        } catch(error) {
            if (error.response.status == 404) {
                let order = $orderStore.filter(o => o.id == productInOrder.order_id)[0]
                let products_filter = order.products.filter(p => p.id != productInOrder.id)
                order.products = products_filter
                orderStore.update(orders => { return orders.filter(o => o.id != order.id)})
                orderStore.update(orders => { return orders.concat([order]) })
                close()
            }
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col justify-between md:gap-4 w-screen h-screen md:h-fit md:w-fit rounded-md shadow-md overflow-y-auto">
        <div class="flex flex-col gap-3">
            <p class="text-xl text-center font-bold">Buyurtmadagi mahsulotni tahrirlash</p>
        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="room">Kategoriyani tanlang*:</label>
                <select bind:this={category} on:change={onSelectCategory} value="{category_id}" class="outline-0 border-2 px-3 py-1 rounded" name="room" id="">
                    {#each $categoryStore as category}
                        <option value="{category.id}">{category.name}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="product-id">Mahsulotni tanlang*:</label>
                <select bind:value={product}  class="outline-0 border-2 px-3 py-1 rounded" name="room" id="">
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
            <button on:click={editProduct} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold"><i class="bi bi-plus"></i> Saqlash</button>
        </div>
        </div>
        <button on:click={deleteProduct} class="py-2 px-4 rounded-md text-red-500 border-red-500 border-2 font-semibold"><i class="bi bi-trash"></i> Mahsulotni o'chirish</button>
    </div>

</div>