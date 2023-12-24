<script lang="ts">
    import { categoryStore, type Category, type Product, productStore } from "../store"
    import { CategoryEndpoint, ProductEndpoint } from '../api'

    const categoryEndpoint = new CategoryEndpoint()
    const productEndpoint =  new ProductEndpoint()
    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void
    export let category_id: number

    let admin_key: string

    async function deleteCat() {
        let id = category_id
        try {
            const res = await categoryEndpoint.delete(id, token, admin_key)
            const category: Category = res.data.category 
            categoryStore.update(cat => { return cat.filter(c => c.id != category.id)})
            const res_pro = await productEndpoint.get()
            const products: Product[] = res_pro.data.products
            productStore.set(products)
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 w-4/5 md:w-fit h-fit rounded-md shadow-md overflow-y-auto">

        <p class="text-xl text-center font-bold">Kategoriyani o'chirish</p>

        <div class="flex flex-col gap-3">
            <p class="text-md font-medium text-center">Kategoriyani o'chirishni tasdiqlaysizmi?</p>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Admin parol*:</label>
                <input bind:value={admin_key}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-600">Yopish</button>
            <button on:click={deleteCat} class="py-2 px-4 rounded-md text-white bg-green-600">Tasdiqlash</button>
        </div>
    </div>
</div>