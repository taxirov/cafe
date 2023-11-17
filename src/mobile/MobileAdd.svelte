<script lang="ts">
    // components
    import AdminNavbar from '../components/AdminNavbar.svelte';
    import AddProductModal from '../modals/AddProductModal.svelte';
    import AddCategoryModal from '../modals/AddCategoryModal.svelte';

    // endpoints
    import { CategoryEndpoint } from '../api/category.api';
    import { ProductEndpoint } from '../api/product.api';

    // stores
    import { categoryStore, type Category } from '../database/category.store';
    import { productStore, type Product } from "../database/product.store"

    const categoryEndpoint = new CategoryEndpoint()
    const productEndpoint = new ProductEndpoint()

    let showAddCategory: boolean = false
    let showAddProduct: boolean = false

    // get categories
    async function getCategories() {
        try{
            const res = await categoryEndpoint.get()
            const categories: Category[] = res.data.categories
            categoryStore.set(categories)
        }
        catch(error) {
            console.log(error)
        }
    }  getCategories()

    // get products
    async function getProducts() {
        try{
            const res = await productEndpoint.get()
            const products: Product[] = res.data.products
            productStore.set(products)
        }
        catch(error) {
            console.log(error)
        }
    } getProducts()

</script>

<svelte:head>
    <title>Buyurtma qo'shish</title>
</svelte:head>

<section class="grid grid-rows-2">
    <section class="flex flex-col gap-2 p-3">
        <div class="orders flex flex-col gap-3 p-3 border-t-8 border-pink-500 bg-white rounded-xl shadow-md">
            <div class="flex justify-between items-center">
                <h2  class="outline-none">Buyurtmaga mahsulot qo'shish</h2>
                <div class="flex gap-1 items-center">
                    <button class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-filter"></i></button>
                    <button class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-plus"></i></button>
                </div>
            </div>
            <div>
                <select name="orders" id="">
                    <option value="order1">32-buyurtma</option>
                    <option value="order2">33-buyurtma</option>
                    <option value="order3">34-buyurtma</option>
                </select>
            </div>
        </div>
        <div class="categories flex flex-col gap-3 p-3 border-t-8 border-green-500 bg-white rounded-xl shadow-md">
            <div class="flex justify-between items-center">
                <p>Kategoriyalar</p>
                <div class="flex gap-1 items-center">
                    <button class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-filter"></i></button>
                    <button on:click={() => (showAddCategory = true)} class="px-2 py-1 rounded-md bg-indigo-500 text-gray-100"><i class="bi bi-plus"></i></button>
                </div>
            </div>
            <table class="border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th class="border border-slate-600 text-center">ID</th>
                        <th class="border border-slate-600 text-center">Nomi</th>
                        <th class="border border-slate-600 text-center">Mah. soni</th>
                        <th class="border border-slate-600 text-center">O'zgartirish</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $categoryStore as category}
                        <tr>
                            <td class="border border-slate-600">{category.id}</td>
                            <td class="border border-slate-600">{category.name}</td>
                            <td class="border border-slate-600">{category.desc}</td>
                            <td class="border border-slate-600">
                                <div class="flex gap-1 items-center">
                                    <button on:click={() => {}} class="px-2 py-1 rounded-md bg-blue-500 text-gray-100"><i class="bi bi-pencil"></i></button>
                                    <button on:click={() => {}} class="px-2 py-1 rounded-md bg-red-500 text-gray-100"><i class="bi bi-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="products flex flex-col gap-3 p-3 border-t-8 border-indigo-500 bg-white rounded-xl shadow-md">
            <div class="flex justify-between items-center ">
                <p class="text-2xl font-semibold">Mahsulotlar</p>
                <div class="flex gap-2 items-center">
                    <button class="px-2 py-1 rounded-md bg-indigo-500 text-2xl text-gray-100"><i class="bi bi-filter"></i></button>
                    <button on:click={() => (showAddProduct = true)} class="px-2 py-1 rounded-md bg-indigo-500 text-2xl text-gray-100"><i class="bi bi-plus"></i></button>
                </div>
            </div>
            <table class="border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th class="border border-slate-600 text-center">ID</th>
                        <th class="border border-slate-600 text-center">Nomi</th>
                        <th class="border border-slate-600 text-center">Izoh</th>
                        <th class="border border-slate-600 text-center">O'zgartirish</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $productStore as product}
                        <tr>
                            <td class="border border-slate-600 text-center">{product.id}</td>
                            <td class="border border-slate-600 text-center">{product.name}</td>
                            <td class="border border-slate-600 text-center">{product.desc}</td>
                            <td class="border border-slate-600 text-center">
                                <div class="flex gap-1 items-center">
                                    <button on:click={() => {}} class="px-2 py-1 rounded-md bg-blue-500 text-gray-100"><i class="bi bi-pencil"></i></button>
                                    <button on:click={() => {}} class="px-2 py-1 rounded-md bg-red-500 text-gray-100"><i class="bi bi-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>
    <AddCategoryModal show={showAddCategory} close={() => (showAddCategory = false)}></AddCategoryModal>
    <AddProductModal show={showAddProduct} close={() => (showAddProduct = false)}></AddProductModal>
    <AdminNavbar></AdminNavbar>
</section>