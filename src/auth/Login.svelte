<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint } from "../api/user.api"

    const userEndpoint = new UserEndpoint()
    const token = localStorage.getItem('token')
    // async function checkToken() {
    //     if(token) {
    //         const res = await userEndpoint.verify(token)
    //         if(res.status === 200) {
    //             navigate('/')
    //         }
    //     }
    // } checkToken()
    let password: HTMLInputElement
    let username: HTMLInputElement

    async function login() {
        try {
            const res = await userEndpoint.login(username.value.toString(), password.value.toString())
            if(res.status === 200) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                navigate('/')
            }
        }  catch(error) {
            alert(await error.response.data.message)
            console.log(error)
        }
    }
</script>

<svelte:head>
    <title>Tizimga kirish</title>
</svelte:head>

<div class="flex justify-center items-center w-screen h-screen bg-indigo-500">
    <div class="flex flex-col gap-4 bg-white p-8 rounded-md">
        <h1 class="text-3xl font-bold outline-none">Tizimga kirish</h1>
        <div class="flex flex-col gap-2">
            <label class="font-semibold" for="username">Username: <p class="text-red-500 inline">*</p></label>
            <input bind:this={username} class="outline-none border-2 p-2 rounded-md" type="text" name="username" placeholder="username">
            <label class="font-semibold" for="password">Password: <p class="text-red-500 inline">*</p></label>
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
        <button on:click={login} class="bg-indigo-500 text-white font-bold p-3 rounded-md">Kirish</button>
        <button on:click={() => { navigate('/check')}} class="text-sm font-medium py1 rounded-md">Ro'yhatdan o'tish</button>
    </div>
</div>
