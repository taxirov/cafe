<script lang="ts">
    import { navigate } from "svelte-navigator";
    // components
    import AddProductModal from "../modalsAdmin/AddProductModal.svelte";
    import AddCategoryModal from "../modalsAdmin/AddCategoryModal.svelte";
    import AddUserModal from "../modalsAdmin/AddUserModal.svelte";
    import AddRoleModal from "../modalsAdmin/AddRoleModal.svelte";
    import AddRoomModal from "../modalsAdmin/AddRoomModal.svelte";
    import AcceptDeleteRoom from "../modalsAdmin/AcceptDeleteRoom.svelte";
    import EditRoomModal from "../modalsAdmin/EditRoomModal.svelte";
    import EditUserModal from "../modalsAdmin/EditUserModal.svelte";
    // endpoints
    import { UserEndpoint, RoomEndpoint, CategoryEndpoint, ProductEndpoint, RoleEndpoint } from "../api";

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

    if (screen.width < 500) {
        navigate('/madd')
    }

    // types and stores
    import type { User, Room, Category, Product, Role } from "../store";
    import { userStore, roomStore, categoryStore, productStore, roleStore } from "../store";
    import RoomInTable from "../components/RoomInTable.svelte";
    import UserInTable from "../components/UserInTable.svelte";
    import CategoryInTable from "../components/CategoryInTable.svelte";
    import ProductInTable from "../components/ProductInTable.svelte";
    import RoleInTable from "../components/RoleInTable.svelte";

    const roomEndpoint = new RoomEndpoint();
    const categoryEndpoint = new CategoryEndpoint();
    const productEndpoint = new ProductEndpoint();
    const roleEndpoint = new RoleEndpoint()

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
    <title>Xonalar</title>
</svelte:head>

<section class="flex min-h-screen md:h-screen">
    <div class="grow-0 bg-indigo-600 md:w-1/5 flex flex-col justify-between p-6 sticky bottom-0 top-0 left-0">
        <div class="flex flex-col gap-8">
            <p class="text-2xl font-black text-zinc-100">Madat Ota Choyxonasi</p>
        <div class="flex flex-col gap-1">
            <button on:click={() => { navigate('/admin')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                <i class="bi bi-house-fill text-lg"></i>
                <p class="text-md font-bold">Asosiy</p>
            </button>
            <button on:click={() => { navigate('/orders')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                <i class="bi bi-clipboard-fill text-lg"></i>
                <p class="text-md font-bold">Buyurtmalar</p>
            </button>
            <button on:click={() => { navigate('/add')}} class="flex items-center gap-3 bg-zinc-100 text-indigo-500 p-3 rounded-md  shadow-md">
                <i class="bi bi-database-fill-gear text-lg"></i>
                <p class="text-md font-bold">Boshqarish</p>
            </button>
            <button on:click={() => { navigate('/rooms')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                <i class="bi bi-door-open-fill text-lg"></i>
                <p class="text-md font-bold">Xonalar</p>
            </button>
            <button on:click={() => { navigate('/archive')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                <i class="bi bi-archive-fill text-lg"></i>
                <p class="text-md font-bold">Arxiv</p>
            </button>
            <button on:click={() => { navigate('/profile')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                <i class="bi bi-person-fill text-lg"></i>
                <p class="text-md font-bold">Profile</p>
            </button>
        </div>
        </div>
        <p class="text-center py-3 text-zinc-200">Created by <a href="https://saad.uz" target="_blank" class="font-semibold">Saad Takhir</a> </p>
    </div>
    <div class="w-4/5 left-0 flex flex-col h-screen">
        <div class="grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-indigo-500 px-3 py-4 h-fit">
            <h2  class="outline-none text-zinc-100 text-lg font-bold"><i class="bi bi-database-fill-gear"></i> Boshqarish</h2>
        </div>
        <div class="grow flex flex-col gap-3 p-5 overflow-y-scroll">
            <div class="categories flex flex-col gap-3 p-3 border-t-8 border-green-500 bg-white rounded-xl shadow-md">
                <AddCategoryModal show={showAddCategory} close={() => (showAddCategory = false)}/>
                <div class="flex justify-between items-center">
                    <p class="text-xl font-semibold">Kategoriyalar ({$categoryStore.length})</p>
                    <div class="flex gap-1 items-center">
                            {#if showCategories}
                                <button on:click={showHideCategories} class="px-2 py-1 rounded-md bg-green-500 text-xl text-gray-100"><i class="bi bi-chevron-up" /></button> 
                            {:else}
                                <button on:click={showHideCategories} class="px-2 py-1 rounded-md bg-green-500 text-xl text-gray-100"><i class="bi bi-chevron-down" /></button>
                            {/if}
                            <button on:click={() => { showAddCategory = true }} class="px-2 py-1 rounded-md bg-green-500 text-xl text-gray-100"><i class="bi bi-plus" /></button>
                    </div>
                </div>
                <table class="{categories_class}">
                    <thead>
                        <tr>
                            <th class="text-center">T/r</th>
                            <th class="text-center">Nomi</th>
                            <th class="text-center">Mah. soni</th>
                            <th class="text-center">Izoh</th>
                            <th class="text-center">Tahrirlash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $categoryStore as category, index}
                            <CategoryInTable index={index} category={category}></CategoryInTable>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="products flex flex-col gap-3 p-3 border-t-8 border-indigo-500 bg-white rounded-xl shadow-md">
                <AddProductModal show={showAddProduct} close={() => (showAddProduct = false)}/>
                <div class="flex justify-between items-center">
                    <p class="text-xl font-semibold">Mahsulotlar ({$productStore.length})</p>
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
                <table class="{products_class}">
                    <thead>
                        <tr>
                            <th class="text-center">T/r</th>
                            <th class="text-center">Nomi</th>
                            <th class="text-center">Narxi</th>
                            <th class="text-center">Izoh</th>
                            <th class="text-center">Tahrirlash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $productStore as product, index}
                            <ProductInTable index={index} product={product}></ProductInTable>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="roles flex flex-col gap-3 p-3 border-t-8 border-purple-500 bg-white rounded-xl shadow-md">
                <AddRoleModal show={showAddRole} close={() => (showAddRole = false)}/>
                <div class="flex justify-between items-center">
                    <p class="text-xl font-semibold">Rollar ({$roleStore.length})</p>
                    <div class="flex gap-1 items-center">
                        {#if showRoles}
                            <button on:click={showHideRoles} class="px-2 py-1 rounded-md bg-purple-500 text-xl text-gray-100"><i class="bi bi-chevron-up" /></button> 
                        {:else}
                            <button on:click={showHideRoles} class="px-2 py-1 rounded-md bg-purple-500 text-xl text-gray-100"><i class="bi bi-chevron-down" /></button>
                        {/if}
                         <button on:click={() => { showAddRole = true }} class="px-2 py-1 rounded-md bg-purple-500 text-xl text-gray-100"><i class="bi bi-plus" /></button>
                    </div>
                </div>
                <table class="{roles_class}">
                    <thead>
                        <tr>
                            <th class="text-center">T/r</th>
                            <th class="text-center">Nomi</th>
                            <th class="text-center">Ishchi soni</th>
                            <th class="text-center">Tahrirlash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $roleStore as role, index}
                            <RoleInTable index={index} role={role}></RoleInTable>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="users flex flex-col gap-3 p-3 border-t-8 border-blue-500 bg-white rounded-xl shadow-md">
                <AddUserModal show={showAddUser} close={() => (showAddUser = false)}/>
                <div class="flex justify-between items-center">
                    <p class="text-xl font-semibold">Ishchilar ({$userStore.length})</p>
                    <div class="flex gap-1 items-center">
                        {#if showUsers}
                            <button on:click={showHideUsers} class="px-2 py-1 rounded-md bg-blue-500 text-xl text-gray-100"><i class="bi bi-chevron-up" /></button> 
                        {:else}
                            <button on:click={showHideUsers} class="px-2 py-1 rounded-md bg-blue-500 text-xl text-gray-100"><i class="bi bi-chevron-down" /></button>
                        {/if}
                         <button on:click={() => { showAddUser = true }} class="px-2 py-1 rounded-md bg-blue-500 text-xl text-gray-100"><i class="bi bi-plus" /></button>
                    </div>
                </div>
                <table class="{users_class} ">
                    <thead>
                        <tr>
                            <th class="text-center">T/r</th>
                            <th class="text-center">Ismi</th>
                            <th class="text-center">Roli</th>
                            <th class="text-center">Jami b.</th>
                            <th class="text-center">Telefon</th>
                            <th class="text-center">O'zgartirish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $userStore as user, index}
                            <UserInTable index={index} user={user}></UserInTable>
                            <div class="h-[3px]"></div>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="rooms flex flex-col gap-3 p-3 border-t-8 border-pink-500 bg-white rounded-xl shadow-md">
                <AddRoomModal show={showAddRoom} close={() => (showAddRoom = false)}/>
                <div class="flex justify-between items-center">
                    <p class="text-xl font-semibold">Xonalar ({$roomStore.length})</p>
                    <div class="flex gap-1 items-center">
                        {#if showRooms}
                            <button on:click={showHideRooms} class="px-2 py-1 rounded-md bg-pink-500 text-xl text-gray-100"><i class="bi bi-chevron-up" /></button> 
                        {:else}
                            <button on:click={showHideRooms} class="px-2 py-1 rounded-md bg-pink-500 text-xl text-gray-100"><i class="bi bi-chevron-down" /></button>
                        {/if}
                         <button on:click={() => { showAddRoom = true }} class="px-2 py-1 rounded-md bg-pink-500 text-xl text-gray-100"><i class="bi bi-plus" /></button>
                    </div>
                </div>
                <table class="{rooms_class} text-medium">
                    <thead>
                        <tr>
                            <th class="text-center">T/r</th>
                            <th class="text-center">Ismi</th>
                            <th class="text-center">Holati</th>
                            <th class="text-center">Izoh</th>
                            <th class="text-center">Tahrir</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {#each $roomStore as room, index}
                            <RoomInTable index={index} room={room}></RoomInTable>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>