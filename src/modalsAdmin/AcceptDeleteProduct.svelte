<script lang="ts">
    import { categoryStore, productStore, type Product, type Category } from "../store"
    import { CategoryEndpoint, ProductEndpoint } from '../api'

    const categoryEndpoint = new CategoryEndpoint()
    const productEndpoint = new ProductEndpoint()

    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void
    export let product_id: number

    let admin_key: string

    async function deletePro() {
        let id = product_id
        try {
            const res = await productEndpoint.delete(id, token, admin_key)
            const product: Product = res.data.product
            productStore.update(pro => { return pro.filter(p => p.id != product.id) })
            const categories: Category[] = (await categoryEndpoint.get()).data.categories 
            categoryStore.set(categories)
            close()
        } catch (error) {
            console.log(error)
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">

        <p class="text-xl text-center font-bold">Mahsulot o'chirish</p>

        <div class="flex flex-col gap-3">
            <p class="text-md font-medium">Mahsulotni o'chirishni tasdiqlaysizmi?</p>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Admin parol*:</label>
                <input bind:value={admin_key}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-600">Yopish</button>
            <button on:click={deletePro} class="py-2 px-4 rounded-md text-white bg-green-600">Tasdiqlash</button>
        </div>
    </div>
</div>