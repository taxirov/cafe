<script lang="ts">
    import { UserEndpoint } from '../api';
    import { navigate } from 'svelte-navigator';

    const userEndpoint = new UserEndpoint()
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    // check token
    async function getVerify() {
        try {
            const res = await userEndpoint.getTokenVerify(token)
            if(res.status == 200) {
                if(user.role === 'admin') {
                    if(screen.width < 500) {
                        navigate('/m')
                    } else {
                        console.log('verify success')
                    }
                } else {
                    navigate('/w')
                }
            } else {
                navigate('/login')
            }
        } catch(error) {
            console.log(error)
        }
    }   getVerify()
    
    // types
    import type { Category, Order, Product, Room } from '../store';
    // stores
    import { categoryStore, productStore, roomStore, archiveOrderStore, pageStore } from '../store';
    // endpoints
    import { CategoryEndpoint, RoomEndpoint, ProductEndpoint, OrderEndpoint } from '../api';
    // modals
    import AddOrderModal from "../modalsAll/AddOrderModal.svelte";
    // components
    import OrderComponent from '../components/OrderComponent.svelte';
    
    let show_add: boolean = false

    const orderEndpoint = new OrderEndpoint();
    const roomEndpoint = new RoomEndpoint();
    const categoryEndpoint = new CategoryEndpoint();
    const productEndpoint = new ProductEndpoint();

    let current_page: number = 1
    let pages: number[] = []
    let total_order_count: number = 0
    let total_page_count: number = 0
    let showFirstPage: boolean = false
    let showLastPage: boolean = true
    let showStartDots: boolean = false
    let showEndDots: boolean = false
    let prv_btn: boolean = true
    let nex_btn: boolean = true

    // generate pagination and pages
    function generatePages(page_count: number) {
        pages = []
        if (page_count > 5) {
            if (current_page == 1) {
                showFirstPage = false
                showLastPage = true
                showStartDots = false
                showEndDots = true
                for (let i = 1; i <= 3; i++) {
                    pages.push(i)
                }
                pageStore.set((pages))
            } else if (current_page == 2) {
                showFirstPage = false
                showLastPage = true
                showStartDots = false
                showEndDots = true
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pageStore.set((pages))
            } else if (current_page == 3) {
                showFirstPage = false
                showLastPage = true
                showStartDots = false
                showEndDots = true
                for (let i = 1; i <= 5; i++) {
                    pages.push(i)
                }
                pageStore.set((pages))
            } else if (current_page == total_page_count) {
                showFirstPage = true
                showLastPage = false
                showStartDots = true
                showEndDots = false
                for (let i = current_page - 2; i <= current_page; i++) {
                    pages.push(i)
                }
                pageStore.set((pages))
            } else if (current_page == total_page_count - 1) {
                showFirstPage = true
                showLastPage = false
                showStartDots = true
                showEndDots = false
                for (let i = total_page_count - 3; i <= total_page_count; i++) {
                    pages.push(i)
                }
                pageStore.set((pages))
            } else if (current_page == total_page_count - 2) {
                showFirstPage = true
                showLastPage = false
                showStartDots = true
                showEndDots = false
                for (let i = total_page_count - 4; i <= total_page_count; i++) {
                    pages.push(i)
                }
                pageStore.set((pages))
            } else {
                showFirstPage = true
                showLastPage = true
                showStartDots = true
                showEndDots = true
                for (let i = current_page - 2; i <= current_page + 2; i++) {
                    pages.push(i)
                }
                pageStore.set((pages))
            }
        } else {
            showFirstPage = false
            showLastPage = false
            showStartDots = false
            showEndDots = false
            for (let i = 1; i <= page_count; i++) {
                    pages.push(i)
                }
            pageStore.set((pages))
        }
    }

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

    // get orders false
    async function getFalseOrders() {
        try{
            const res = await orderEndpoint.getStatus(0, current_page, token)
            const orders: Order[] = res.data.orders
            archiveOrderStore.set(orders)
            current_page = res.data.current_page
            total_order_count = res.data.total_order_count
            total_page_count = res.data.total_page_count
            generatePages(total_page_count)
        }
        catch(error) {
            console.log(error)
        }
    }  getFalseOrders()

    // check pagination control buttons
    function checkButtons() {
        if (current_page == 1) {
            prv_btn = false
        } else {
            prv_btn = true
        }
        if (current_page == total_page_count) {
            nex_btn = false
        } else {
            nex_btn = true
        }
    } checkButtons()

</script>

<svelte:head>
    <title>Arxiv sahifasi</title>
</svelte:head>

<section class="flex min-h-screen md:h-screen">
    <div class="grow-0 bg-indigo-600 w-1/5 flex flex-col justify-between p-6 sticky bottom-0 top-0 left-0">
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
                <button on:click={() => { navigate('/add')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                    <i class="bi bi-database-fill-gear text-lg"></i>
                    <p class="text-md font-bold">Boshqarish</p>
                </button>
                <button on:click={() => { navigate('/rooms')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                    <i class="bi bi-door-open-fill text-lg"></i>
                    <p class="text-md font-bold">Xonalar</p>
                </button>
                <button on:click={() => { navigate('/archive')}} class="flex items-center gap-3 bg-zinc-100 text-indigo-500 p-3 rounded-md shadow-md">
                    <i class="bi bi-archive-fill text-lg"></i>
                    <p class="text-md font-bold">Arxiv</p>
                </button>
                <button on:click={() => { navigate('/profile')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                    <i class="bi bi-person-fill text-lg"></i>
                    <p class="text-md font-bold">Profile</p>
                </button>
                <button on:click={() => { navigate('/bron')}} class="flex items-center gap-3 hover:bg-indigo-500 text-zinc-100 p-3 rounded-md">
                    <i class="bi bi-bookmarks-fill text-lg"></i>
                    <p class="text-md font-bold">Bronlar</p>
                </button>
            </div>
        </div>
        <p class="text-center py-3 text-zinc-200">Created by <a href="https://saad.uz" target="_blank" class="font-semibold">Saad Takhir</a> </p>
    </div>
    <div class="grow w-4/5 flex flex-col h-screen">
        <div class="grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-indigo-500 p-3 h-fit">
            <h2  class="outline-none text-lg font-bold text-zinc-100"><i class="bi bi-clipboard-fill"></i> Buyurtmalar tarixi</h2>
            <!-- <button disabled class="bg-zinc-100 px-4 py-2 text-sm text-slate-600 font-bold rounded-md shadow-md">Filtrlash <i class="bi bi-filter"></i></button> -->
        </div>
        <AddOrderModal show={show_add} close={() => show_add = false}></AddOrderModal>
        <div class="grow flex flex-col gap-3 p-5 overflow-y-scroll">
            <div class="grid grid-cols-1 justify-start gap-5">
                {#if $archiveOrderStore.length == 0}
                    <p class="text-center text-sm md:text-xl text-gray-400 font-medium">Sizda faol buyurtmalar mavjud emas</p>
                {:else}
                    {#each $archiveOrderStore as order}
                        <OrderComponent user_role={user.role} order={order}></OrderComponent>
                    {/each}
                {/if}
                <div class="flex justify-center gap-2">
                    <!-- Previos button -->
                    {#if prv_btn}
                        <button on:click={() => { current_page -= 1; getFalseOrders(); checkButtons() }} class="bg-indigo-500 text-zinc-100 text-xl px-3 py-2 rounded-md"><i class="bi bi-chevron-left"></i></button>
                    {:else}
                        <button disabled class="bg-indigo-400 text-zinc-100 text-xl px-3 py-2 rounded-md"><i class="bi bi-chevron-left"></i></button>
                    {/if}
                    <!-- Show first page -->
                    {#if showFirstPage}
                        <button on:click={() => { current_page = 1; getFalseOrders(); checkButtons() }} class="px-3 py-2 bg-white text-xl rounded-md">1</button>
                    {/if}
                    <!-- Show start dots page -->
                    {#if showStartDots}
                        <button disabled class="px-3 py-2 bg-white text-xl rounded-md"><i class="bi bi-three-dots"></i></button>
                    {/if}
                    <!-- Show pages -->
                    {#each $pageStore as page}
                            {#if current_page == page}
                                <button on:click={() => { current_page = page; getFalseOrders(); checkButtons() }} class="{page.toString().length == 1 ? "px-4" : "px-3"} py-2 text-zinc-100 text-xl bg-indigo-500 rounded-md">{page}</button>
                            {:else}
                                <button on:click={() => { current_page = page; getFalseOrders(); checkButtons() }} class="{page.toString().length == 1 ? "px-4" : "px-3"} py-2 bg-white text-xl rounded-md">{page}</button>
                            {/if}
                    {/each}
                    <!-- Show end dots page -->
                    {#if showEndDots}
                        <button disabled class="px-3 py-2 bg-white text-xl rounded-md"><i class="bi bi-three-dots"></i></button>
                    {/if}
                    <!-- Show last page -->
                    {#if showLastPage}
                        <button on:click={() => { current_page = total_page_count; getFalseOrders(); checkButtons() }} class="px-3 py-2 bg-white text-xl rounded-md">{total_page_count}</button>
                    {/if}
                    <!-- Next button -->
                    {#if nex_btn}
                        <button on:click={() => { current_page += 1; getFalseOrders(); checkButtons() }} class="bg-indigo-500 text-zinc-100 text-xl px-3 py-2 rounded-md"><i class="bi bi-chevron-right"></i></button>
                    {:else}
                        <button disabled class="bg-indigo-400 text-zinc-100 text-xl px-3 py-2 rounded-md"><i class="bi bi-chevron-right"></i></button>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>
