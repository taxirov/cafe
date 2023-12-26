<script lang="ts">
    import { categoryStore, type Category, type Product, productStore } from "../store"
    import { CategoryEndpoint, ProductEndpoint } from '../api'
    import Alert from "../modalsAll/Alert.svelte";

    const categoryEndpoint = new CategoryEndpoint()
    const productEndpoint =  new ProductEndpoint()
    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void
    export let category: Category

    let name: HTMLInputElement
    let desc: HTMLTextAreaElement
    let admin_key: string

    let show_alert: boolean = false
    let alert_title: string
    let alert_color: string
    let alert_text: string
    let alert_icon: string

    function showAlert(title: string, color: string, text: string, icon: string) {
        show_alert = true;
        alert_title = title;
        alert_text = text;
        alert_color = color;
        alert_icon = icon;
    }

    async function edit() {
        let id = category.id
        try {
            const res = await categoryEndpoint.put(id, name.value, desc.value, token, admin_key)
            const category: Category = res.data.category 
            categoryStore.update(cat => { return cat.filter(c => c.id != category.id)})
            categoryStore.update(cat => { return cat.concat([category])})
            const res_pro = await productEndpoint.get()
            const products: Product[] = res_pro.data.products
            productStore.set(products)
            close()
        } catch (error) {
            if (error.response.status == 409) {
                showAlert('Xatolik', 'red-500', name + " nomli kategoriya mavjud. Iltimos boshqa nomdan foydalaning", 'x')
            } else if(error.response.status == 403) {
                showAlert('Xatolik', 'red-500', "Admin parol kiritilmagan! Iltimos admin parolni kiritib qaytadan urining.", 'x')
            } else if(error.response.status == 401) {
                showAlert('Xatolik', 'red-500', "Admin parol noto'g'ri! Iltimos qaytadan urining.", 'x')
            } else if(error.response.status == 500 && error.response.status > 500) {
                showAlert('Xatolik', 'red-500', "Serverda xatolik. Iltimos admin bilan bog'laning", 'x')
            }
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <Alert show={show_alert} close={() => show_alert = false } color={alert_color} text={alert_text} title={alert_title} icon={alert_icon} />
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">

        <p class="text-xl text-center font-bold">Kategoriyani tahrirlash</p>

        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="category-name">Nomi*:</label>
                <input bind:this={name} value="{category.name}"  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="category-name" id="" placeholder="Ichimliklar">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="category-desc">Izoh*:</label>
                <textarea bind:this={desc} value="{category.desc}"  class="outline-0 border-2 px-3 py-1 rounded" name="category-desc" id="" rows="5" placeholder="Salqin ichimliklar, Soklar va boshqa ichimliklar"></textarea>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Admin parol*:</label>
                <input bind:value={admin_key}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-500">Yopish</button>
            <button on:click={edit} class="py-2 px-4 rounded-md text-white bg-green-500">Saqlash</button>
        </div>
    </div>
</div>