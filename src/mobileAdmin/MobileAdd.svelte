<script lang="ts">
    // components
    import AdminNavbar from "../components/AdminNavbar.svelte";
    import AddProductModal from "../modals/AddProductModal.svelte";
    import AddCategoryModal from "../modals/AddCategoryModal.svelte";
    // endpoints
    import { UserEndpoint, RoomEndpoint, CategoryEndpoint, ProductEndpoint } from "../api";
    // types and stores
    import type { User, Room, Category, Product } from "../store";
    import { userStore, roomStore, categoryStore, productStore } from "../store";

    const userEndpoint = new UserEndpoint();
    const roomEndpoint = new RoomEndpoint();
    const categoryEndpoint = new CategoryEndpoint();
    const productEndpoint = new ProductEndpoint();

    const token = localStorage.getItem('token');

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

    // get categories
    async function getCategories() {
        try {
            const res = await categoryEndpoint.get(token);
            const categories: Category[] = res.data.categories;
            categoryStore.set(categories);
        } catch (error) {
            console.log(error);
        }
    }  getCategories();

    // get products
    async function getProducts() {
        try {
            const res = await productEndpoint.get()
            const products: Product[] = res.data.products
            productStore.set(products)
        } catch(error) {
            console.log(error)
        }
    } getProducts()

    let showAddCategory: boolean = false;
    let showAddProduct: boolean = false;

</script>

<svelte:head>
    <title>Qo'shish</title>
</svelte:head>

<section class="grid grid-rows-2">
    <section class="flex flex-col gap-2 p-3">
        <div
            class="categories flex flex-col gap-3 p-3 border-t-8 border-green-500 bg-white rounded-xl shadow-md"
        >
            <div class="flex justify-between items-center">
                <p class="text-xl font-semibold">Kategoriyalar</p>
                <div class="flex gap-1 items-center">
                    <button
                        class="px-2 py-1 rounded-md bg-indigo-500 text-xl text-gray-100"
                        ><i class="bi bi-filter" /></button
                    >
                    <button
                        on:click={() => (showAddCategory = true)}
                        class="px-2 py-1 rounded-md bg-indigo-500 text-xl text-gray-100"
                        ><i class="bi bi-plus" /></button
                    >
                </div>
            </div>
            <table class="border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th class="border border-slate-600 text-center">ID</th>
                        <th class="border border-slate-600 text-center">Nomi</th
                        >
                        <th class="border border-slate-600 text-center"
                            >Mah. soni</th
                        >
                        <th class="border border-slate-600 text-center"
                            >O'zgartirish</th
                        >
                    </tr>
                </thead>
                <tbody>
                    {#each $categoryStore as category}
                        <tr>
                            <td class="border border-slate-600 text-center"
                                >{category.id}</td
                            >
                            <td class="border border-slate-600 text-center"
                                >{category.name}</td
                            >
                            <td class="border border-slate-600 text-center"
                                >{category.products.length}</td
                            >
                            <td class="border border-slate-600 text-center">
                                <div class="flex gap-1 items-center">
                                    <button
                                        on:click={() => {}}
                                        class="px-2 py-1 rounded-md bg-blue-500 text-gray-100"
                                        ><i class="bi bi-pencil" /></button
                                    >
                                    <button
                                        on:click={() => {}}
                                        class="px-2 py-1 rounded-md bg-red-500 text-gray-100"
                                        ><i class="bi bi-trash" /></button
                                    >
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div
            class="products flex flex-col gap-3 p-3 border-t-8 border-indigo-500 bg-white rounded-xl shadow-md"
        >
            <div class="flex justify-between items-center">
                <p class="text-xl font-semibold">Mahsulotlar</p>
                <div class="flex gap-2 items-center">
                    <button
                        class="px-2 py-1 rounded-md bg-indigo-500 text-xl text-gray-100"
                        ><i class="bi bi-filter" /></button
                    >
                    <button
                        on:click={() => (showAddProduct = true)}
                        class="px-2 py-1 rounded-md bg-indigo-500 text-xl text-gray-100"
                        ><i class="bi bi-plus" /></button
                    >
                </div>
            </div>
            <table class="border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th class="border border-slate-600 text-center">ID</th>
                        <th class="border border-slate-600 text-center">Nomi</th
                        >
                        <th class="border border-slate-600 text-center">Izoh</th
                        >
                        <th class="border border-slate-600 text-center"
                            >O'zgartirish</th
                        >
                    </tr>
                </thead>
                <tbody>
                    {#each $productStore as product}
                        <tr>
                            <td class="border border-slate-600 text-center"
                                >{product.id}</td
                            >
                            <td class="border border-slate-600 text-center"
                                >{product.name}</td
                            >
                            <td class="border border-slate-600 text-center"
                                >{product.desc}</td
                            >
                            <td class="border border-slate-600 text-center">
                                <div class="flex gap-1 items-center">
                                    <button
                                        on:click={() => {}}
                                        class="px-2 py-1 rounded-md bg-blue-500 text-gray-100"
                                        ><i class="bi bi-pencil" /></button
                                    >
                                    <button
                                        on:click={() => {}}
                                        class="px-2 py-1 rounded-md bg-red-500 text-gray-100"
                                        ><i class="bi bi-trash" /></button
                                    >
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>
    <AddCategoryModal
        show={showAddCategory}
        close={() => (showAddCategory = false)}
    />
    <AddProductModal
        show={showAddProduct}
        close={() => (showAddProduct = false)}
    />
    <AdminNavbar current_page={"madd"}></AdminNavbar>
</section>
