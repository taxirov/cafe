<script lang="ts">
    // components
    import AddProductModal from "../modalsAdmin/AddProductModal.svelte";
    import AddCategoryModal from "../modalsAdmin/AddCategoryModal.svelte";
    import AddUserModal from "../modalsAdmin/AddUserModal.svelte";
    import AddRoleModal from "../modalsAdmin/AddRoleModal.svelte";
    import AddRoomModal from "../modalsAdmin/AddRoomModal.svelte";
    import AcceptDeleteRoom from "../modalsAdmin/AcceptDeleteRoom.svelte";
    import EditRoomModal from "../modalsAdmin/EditRoomModal.svelte";
    // endpoints
    import { UserEndpoint, RoomEndpoint, CategoryEndpoint, ProductEndpoint, RoleEndpoint } from "../api";
    // types and stores
    import type { User, Room, Category, Product, Role } from "../store";
    import { userStore, roomStore, categoryStore, productStore, roleStore } from "../store";
    import { navigate } from "svelte-navigator";

    const userEndpoint = new UserEndpoint();
    const roomEndpoint = new RoomEndpoint();
    const categoryEndpoint = new CategoryEndpoint();
    const productEndpoint = new ProductEndpoint();
    const roleEndpoint = new RoleEndpoint()

    const token = localStorage.getItem('token');

    // get roles
    async function getRoles() {
        try {
            const res = await roleEndpoint.get()
            const roles: Role[] = res.data.roles
            roleStore.set(roles)
        } catch(error) {
            console.log(error)
        }
    } getRoles()

    // get users
    async function getUsers() {
        try {
            const res = await userEndpoint.get(token)
            const users: User[] = res.data.users
            userStore.set(users)
        } catch(error) {
            console.log(error)
            navigate('/login')
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
            navigate('/login')
        }
    }  getRooms()

    // get categories
    async function getCategories() {
        try {
            const res = await categoryEndpoint.get();
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

    // for category
    let showAddCategory: boolean = false;
    let showCategoryDelete: boolean = false;
    let showEditCategory: boolean = false;

    // for product
    let showAddProduct: boolean = false;
    let showProductDelete: boolean = false;
    let showEditProduct: boolean = false;

    // for user
    let showAddUser: boolean = false;
    let showUserDelete: boolean = false;
    let showEditUser: boolean = false;

    // for role
    let showAddRole: boolean = false;
    let showRoleDelete: boolean = false;
    let showEditRole: boolean = false;

    // for room
    let showAddRoom: boolean = false;
    let showRoomDelete: boolean = false;
    let showEditRoom: boolean = false;

    let showCategories: boolean = false;
    let categories_class = 'hidden'
    function showHideCategories() {
        if (showCategories) {
            showCategories = false
            categories_class = 'hidden'
        } else {
            showCategories = true
            categories_class = ''
        }
    }
    let showProducts: boolean = false;
    let products_class = 'hidden'
    function showHideProducts() {
        if (showProducts) {
            showProducts = false
            products_class = 'hidden'
        } else {
            showProducts = true
            products_class = ''
        }
    }
    let showUsers: boolean = false;
    let users_class = 'hidden'
    function showHideUsers() {
        if (showUsers) {
            showUsers = false
            users_class = 'hidden'
        } else {
            showUsers = true
            users_class = ''
        }
    }
    let showRoles: boolean = false;
    let roles_class = 'hidden'
    function showHideRoles() {
        if (showRoles) {
            showRoles = false
            roles_class = 'hidden'
        } else {
            showRoles = true
            roles_class = ''
        }
    }
    let showRooms: boolean = false;
    let rooms_class = 'hidden'
    function showHideRooms() {
        if (showRooms) {
            showRooms = false
            rooms_class = 'hidden'
        } else {
            showRooms = true
            rooms_class = ''
        }
    }

</script>

<svelte:head>
    <title>Qo'shish</title>
</svelte:head>

<section class="flex flex-col min-h-screen">
    <section class="grow flex flex-col gap-2 p-3">
        <div class="categories flex flex-col gap-3 p-3 border-t-8 border-green-500 bg-white rounded-xl shadow-md">
            <AddCategoryModal show={showAddCategory} close={() => (showAddCategory = false)}/>
            <div class="flex justify-between items-center">
                <p class="text-xl font-semibold">Kategoriyalar</p>
                <div class="flex gap-1 items-center">
                        {#if showCategories}
                            <button on:click={showHideCategories} class="px-2 py-1 rounded-md bg-green-500 text-xl text-gray-100"><i class="bi bi-chevron-up" /></button> 
                        {:else}
                            <button on:click={showHideCategories} class="px-2 py-1 rounded-md bg-green-500 text-xl text-gray-100"><i class="bi bi-chevron-down" /></button>
                        {/if}
                        <button on:click={() => { showAddCategory = true }} class="px-2 py-1 rounded-md bg-green-500 text-xl text-gray-100"><i class="bi bi-plus" /></button>
                </div>
            </div>
            <table class="{categories_class} border-collapse border border-slate-500">
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
        <div class="products flex flex-col gap-3 p-3 border-t-8 border-indigo-500 bg-white rounded-xl shadow-md">
            <AddProductModal show={showAddProduct} close={() => (showAddProduct = false)}/>
            <div class="flex justify-between items-center">
                <p class="text-xl font-semibold">Mahsulotlar</p>
                <div class="flex gap-1 items-center">
                    <button on:click={() => { navigate('/products') }} class="px-2 py-[6px] rounded-md bg-indigo-500 text-md font-bold text-gray-100">Ko'rish</button>
                    {#if showProducts}
                        <button on:click={showHideProducts} class="px-2 py-1 rounded-md bg-indigo-500 text-xl text-gray-100"><i class="bi bi-chevron-up" /></button> 
                    {:else}
                        <button on:click={showHideProducts} class="px-2 py-1 rounded-md bg-indigo-500 text-xl text-gray-100"><i class="bi bi-chevron-down" /></button>
                    {/if}
                    <button on:click={() => { showAddProduct = true }} class="px-2 py-1 rounded-md bg-indigo-500 text-xl text-gray-100"><i class="bi bi-plus" /></button>
                </div>
            </div>
            <table class="{products_class} border-collapse border border-slate-500">
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
        <div class="roles flex flex-col gap-3 p-3 border-t-8 border-purple-500 bg-white rounded-xl shadow-md">
            <AddRoleModal show={showAddRole} close={() => (showAddRole = false)}/>
            <div class="flex justify-between items-center">
                <p class="text-xl font-semibold">Rollar</p>
                <div class="flex gap-1 items-center">
                    {#if showRoles}
                        <button on:click={showHideRoles} class="px-2 py-1 rounded-md bg-purple-500 text-xl text-gray-100"><i class="bi bi-chevron-up" /></button> 
                    {:else}
                        <button on:click={showHideRoles} class="px-2 py-1 rounded-md bg-purple-500 text-xl text-gray-100"><i class="bi bi-chevron-down" /></button>
                    {/if}
                     <button on:click={() => { showAddRole = true }} class="px-2 py-1 rounded-md bg-purple-500 text-xl text-gray-100"><i class="bi bi-plus" /></button>
                </div>
            </div>
            <table class="{roles_class} border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th class="border border-slate-600 text-center">ID</th>
                        <th class="border border-slate-600 text-center">Ismi</th>
                        <th class="border border-slate-600 text-center">Ishchilar</th>
                        <th class="border border-slate-600 text-center">Tahrir</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $roleStore as role}
                        <tr>
                            <td class="border border-slate-600 text-center">{role.id}</td>
                            <td class="border border-slate-600 text-center">{role.name}</td>
                            <td class="border border-slate-600 text-center">{role.users}</td
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
        <div class="users flex flex-col gap-3 p-3 border-t-8 border-blue-500 bg-white rounded-xl shadow-md">
            <AddUserModal show={showAddUser} close={() => (showAddUser = false)}/>
            <div class="flex justify-between items-center">
                <p class="text-xl font-semibold">Ishchilar</p>
                <div class="flex gap-1 items-center">
                    {#if showUsers}
                        <button on:click={showHideUsers} class="px-2 py-1 rounded-md bg-blue-500 text-xl text-gray-100"><i class="bi bi-chevron-up" /></button> 
                    {:else}
                        <button on:click={showHideUsers} class="px-2 py-1 rounded-md bg-blue-500 text-xl text-gray-100"><i class="bi bi-chevron-down" /></button>
                    {/if}
                     <button on:click={() => { showAddUser = true }} class="px-2 py-1 rounded-md bg-blue-500 text-xl text-gray-100"><i class="bi bi-plus" /></button>
                </div>
            </div>
            <table class="{users_class} border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th class="border border-slate-600 text-center">ID</th>
                        <th class="border border-slate-600 text-center">Ismi</th>
                        <th class="border border-slate-600 text-center">Jami b.</th>
                        <th class="border border-slate-600 text-center">O'zgartirish</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $userStore as user}
                        <tr>
                                {#if user.status == 0}
                                    <td class="border bg-red-500 border-slate-600 text-center">{user.id}</td>
                                {:else}
                                    <td class="border bg-green-500 border-slate-600 text-center">{user.id}</td>
                                {/if}
                            <td class="border border-slate-600 text-center"
                                >{user.name}</td
                            >
                            <td class="border border-slate-600 text-center"
                                >{user.orders}</td
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
        <div class="rooms flex flex-col gap-3 p-3 border-t-8 border-pink-500 bg-white rounded-xl shadow-md">
            <AddRoomModal show={showAddRoom} close={() => (showAddRoom = false)}/>
            <div class="flex justify-between items-center">
                <p class="text-xl font-semibold">Xonalar</p>
                <div class="flex gap-1 items-center">
                    {#if showRooms}
                        <button on:click={showHideRooms} class="px-2 py-1 rounded-md bg-pink-500 text-xl text-gray-100"><i class="bi bi-chevron-up" /></button> 
                    {:else}
                        <button on:click={showHideRooms} class="px-2 py-1 rounded-md bg-pink-500 text-xl text-gray-100"><i class="bi bi-chevron-down" /></button>
                    {/if}
                     <button on:click={() => { showAddRoom = true }} class="px-2 py-1 rounded-md bg-pink-500 text-xl text-gray-100"><i class="bi bi-plus" /></button>
                </div>
            </div>
            <table class="{rooms_class} border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th class="border border-slate-600 text-center">ID</th>
                        <th class="border border-slate-600 text-center">Ismi</th>
                        <th class="border border-slate-600 text-center">Holati</th>
                        <th class="border border-slate-600 text-center">Tahrir</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $roomStore as room}
                        <AcceptDeleteRoom show={showRoomDelete} close={() => { showRoomDelete = false }} id={room.id} />
                        <EditRoomModal show={showEditRoom} close={() => { showEditRoom = false }} id={room.id} name={room.name} desc={room.desc} capacity={room.capacity} />
                        <tr>
                            <td class="border border-slate-600 text-center">{room.id}</td>
                            <td class="border border-slate-600 text-center">{room.name}</td>
                            {#if room.booked == 1}
                                <td class="border border-slate-600 bg-red-500 text-center">band</td>
                            {:else}
                                <td class="border border-slate-600 bg-green-500 text-center">ochiq</td>
                            {/if}
                            <td class="border border-slate-600 text-center">
                                <div class="flex gap-1 items-center">
                                    <button on:click={() => { showEditRoom = true }} class="px-2 py-1 rounded-md bg-blue-500 text-gray-100"><i class="bi bi-pencil" /></button>
                                    <button on:click={() => { showRoomDelete = true }} class="px-2 py-1 rounded-md bg-red-500 text-gray-100"><i class="bi bi-trash" /></button>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>    
    <div class="grow-0 h-fit grid grid-cols-5 bg-white px-2 py-2 sticky bottom-0 right-0 left-0">
        <button on:click={() => { navigate('/m')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-house-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Asosiy</p>
        </button>
        <button on:click={() => { navigate('/morders')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-clipboard-fill text-2xl"></i>
            <p class="text-[9px] font-bold">Buyurtmalar</p>
        </button>
        <button on:click={() => { navigate('/madd')}} class="flex flex-col items-center gap-1 text-indigo-700 px-2 rounded-xl">
            <i class="bi bi-plus text-2xl"></i>
            <p class="text-[9px] font-bold">Qo'shish</p>
        </button>
        <button on:click={() => { navigate('/mprofile')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
            <i class="bi bi-person-fill text-2xl"></i>
            <p class="text-[10px] font-bold">Profile</p>
        </button>
    </div>
</section>
