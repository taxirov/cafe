<script lang="ts">
    export let show: boolean = false
    export let color: string
    export let title: string
    export let text: string
    export let icon: string
    export let close: () => {}
</script>

<div class={"w-screen h-screen bg-black fixed justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="flex flex-col items-center gap-3 bg-white rounded-2xl p-5 w-4/5 md:w-1/5">
        <span class={"w-[64px] h-[64px] flex items-center justify-center rounded-[100px] bg-" + color}><i class="bi bi-{icon} text-[40px] text-gray-100"></i></span>
        <p class="text-3xl font-semibold">{title}</p>
        <p class="text-sm font-medium text-center">{text}</p>
        <button on:click={close} class={"py-2 px-4 w-full rounded-2xl text-md font-semibold text-gray-100 bg-" + color}>Yopish</button>
    </div>
</div>