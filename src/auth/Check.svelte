<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint } from "../api/user.api";

    const admin_key = localStorage.getItem('admin-key')
    const userEndpoint = new UserEndpoint()

    // get admin verify
    async function getAdminVerify() {
        try {
            const res = await userEndpoint.getAdminVerify(admin_key)
            if(res.status === 200) {
                navigate('/register')
            }
        }  catch(error) {
            console.log('verify admin failed')
        }
    } getAdminVerify()

    let password: HTMLInputElement

    async function login() {
        try {
            const res = await userEndpoint.getAdminVerify(password.value.toString())
            if(res.status === 200) {
                localStorage.setItem('admin-key', password.value.toString())
                navigate('/register')
            }
        }  catch(error) {
            alert(error.response.data.message)
            console.log(error)
        }
    }
</script>

<svelte:head>
    <title>Tizimga kirish</title>
</svelte:head>

<div class="flex justify-center items-center w-screen h-screen bg-indigo-500">
    <div class="flex flex-col gap-4 bg-white p-8 rounded-md">
        <h1 class="text-2xl font-bold outline-none">Admin parolni yozing</h1>
        <div class="flex flex-col gap-2">
            <label class="font-semibold" for="password">Admin key: <p class="text-red-500 inline">*</p></label>
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
        <button on:click={login} class="bg-indigo-500 text-white font-bold p-3 rounded-md">Tasdiqlash</button>
        <button on:click={() => { navigate('/login')}} class="text-sm font-medium py1 rounded-md">Kirish</button>
    </div>
</div>
