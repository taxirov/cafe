<script lang="ts">
    import { navigate } from "svelte-navigator"
    import { UserEndpoint, CategoryEndpoint } from "../api";
    import type { Category, User } from "../store";
    import { categoryStore } from "../store"
    import CategoryComponent from "../components/CategoryComponent.svelte"

    const user: User = JSON.parse(localStorage.getItem('user'))
    const token: string = localStorage.getItem("token")
    const userEndpoint = new UserEndpoint()

    async function checkToken() {
        try {
            const res = await userEndpoint.getTokenVerify(token)
            if (res.status == 200) {
                localStorage.setItem("user", JSON.stringify(res.data.user))
                console.log("Verify success")
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

    const categoryEndpoint = new CategoryEndpoint()

    async function getCategories() {
        try { 
            const res = await categoryEndpoint.get()
            const categories: Category[] = res.data.categories
            categoryStore.set(categories)
        } catch (error) {
            console.log(error)
        }
    } getCategories()

</script>

<svelte:head>
    <title>Mahsulotlar</title>
</svelte:head>

<section class="flex flex-col min-h-screen">
    <div class="grow-0 flex justify-between items-center sticky top-0 left-0 right-0 bg-white p-3 h-fit">
        <h2  class="outline-none text-xl font-bold text-indigo-500"><i class="bi bi-door-open-fill text-2xl text-indigo-500"></i> Mahsulotlar</h2>
    </div>
    <div class="grow flex flex-col gap-2 p-2">
        {#each $categoryStore as category}
            <CategoryComponent category={category} />
        {/each}
    </div>
    {#if user.role == "waiter"}
        <div class="grow-0 h-fit grid grid-cols-4 bg-white px-2 py-2 sticky bottom-0 right-0 left-0">
            <button on:click={() => { navigate('/w')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
                <i class="bi bi-clipboard-fill text-2xl"></i>
                <p class="text-[9px] font-bold">Buyurtmalar</p>
            </button>
            <button on:click={() => { navigate('/products')}} class="flex flex-col items-center gap-1 text-violet-500 px-2 rounded-xl">
                <i class="bi bi-box-seam-fill text-2xl"></i>
                <p class="text-[10px] font-bold">Mahsulotlar</p>
            </button>
            <button on:click={() => { navigate('/wrooms')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
                <i class="bi bi-door-open-fill text-2xl"></i>
                <p class="text-[9px] font-bold">Xonalar</p>
            </button>
            <button on:click={() => { navigate('/wprofile')}} class="flex flex-col items-center gap-1 text-slate-400 px-2 rounded-xl">
                <i class="bi bi-person-fill text-2xl"></i>
                <p class="text-[9px] font-bold">Profile</p>
            </button>
        </div>
    {:else}
        <div class="grow-0 bg-white p-5 sticky bottom-0 right-0 left-0">
            <button on:click={() => { navigate('/madd') }} class="bg-indigo-500 text-stone-100 font-semibold w-full rounded-xl py-2"><i class="bi bi-arrow-left"></i> Ortga qaytish</button>
        </div>
    {/if}
</section>