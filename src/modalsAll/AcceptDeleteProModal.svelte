<script lang="ts">
    // endpoints
    import { ProductInOrderEndpoint } from "../api";
    // stores
    import { orderStore, productStore, categoryStore, productInOrderStore } from "../store";
    // types
    import type { Order, ProductInOrder } from "../store";
    const token = localStorage.getItem("token");

    const proInOrEndpoint = new ProductInOrderEndpoint();

    export let show: boolean;
    export let close: () => void;
    export let pro_id: number;

    async function deleteProduct() {
        let id = pro_id
        try {
            const res = await proInOrEndpoint.delete(id, token);
            location.reload()
        } catch (error) {
            location.reload()
        }
    }
</script>

<div
    class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " +
        (show ? "flex" : "hidden")}
>
    <div
        class="bg-white p-8 flex flex-col justify-between w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto"
    >
        <div class="flex flex-col gap-3">
            <p class="text-xl text-center font-bold">
                Mahsulotni bekor qilish
            </p>
            <div class="flex flex-col gap-3 justify-between">
                <p class="text-center text-sm md:text-md font-medium">Mahsulotni bekor qilishni tasdiqlaysizmi?</p>
                <div class="flex justify-between">
                    <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-500 font-semibold w-fit">Yopish</button>
                    <button on:click={deleteProduct} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold w-fit">Tasdiqlash</button>
                </div>
            </div>
        </div>
    </div>
</div>
