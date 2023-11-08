<script lang="ts">
    let password: HTMLInputElement
</script>

<svelte:head>
    <title>Tizimga kirish</title>
</svelte:head>

<div class="flex justify-center items-center w-screen h-screen bg-indigo-500">
    <div class="flex flex-col gap-4 bg-white p-8 rounded-md">
        <h1 class="text-3xl font-bold outline-none">Tizimga kirish</h1>
        <div class="flex flex-col gap-2">
            <label class="font-semibold" for="username">Username:*</label>
            <input class="outline-none border-2 p-2 rounded-md" type="text" name="username" placeholder="username">
            <label class="font-semibold" for="password">Password:*</label>
            <input bind:this={password} class="outline-none border-2 p-2 rounded-md" type="password" name="password">
            <span class="flex gap-3">
                <input 
                type="checkbox" on:change={() => {
                    if(password.type === "password"){
                        password.type = "text";
                    } else {
                        password.type = "password";
                    }
                }} 
                name="show-password">
                <p>Show password</p>
            </span>
        </div>
        <button class="bg-indigo-500 text-white font-bold p-3 rounded-md">Kirish</button>
    </div>
</div>
