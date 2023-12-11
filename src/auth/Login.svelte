<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint } from "../api";
    
    const userEndpoint = new UserEndpoint()
    const token = localStorage.getItem('token')
    if(token) {
        const checkToken = async () => {
            try {
                await userEndpoint.getTokenVerify(token)
                navigate('/')
            } catch (error) {}
        }; checkToken
    }

    import Alert from "../modalsAll/Alert.svelte";

    let show_alert: boolean = false
    let alert_title: string
    let alert_color: string
    let alert_text: string
    let alert_icon: string

    let password: HTMLInputElement
    let username: HTMLInputElement

    function showAlert(title: string, color: string, text: string, icon: string) {
        show_alert = true;
        alert_title = title;
        alert_text = text;
        alert_color = color;
        alert_icon = icon;
    }

    async function login() {
        try {
            const res = await userEndpoint.login(username.value, password.value)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            navigate('/')
        }  catch(error) {
            if (error.response.status == 404) { 
                showAlert('Xatolik', 'red-500', "Foydalanuchi topilmadi. Iltimos qaytadan urunib ko'ring", 'x')
            } else if (error.response.status == 401) {
                showAlert('Xatolik', 'red-500', "Foydalanuvchi nomi yoki parol noto'g'ri. Iltimos qaytadan urunib ko'ring", 'x')
            } else if(error.response.status >= 500) {
                showAlert('Xatolik', 'red-500', "Serverda xatolik. Iltimos dasturchi bilan bog'laning", 'x')
            }
        }
    }
</script>

<svelte:head>
    <title>Tizimga kirish</title>
</svelte:head>

<div class="flex justify-center items-center w-screen h-screen bg-indigo-500">
    <Alert show={show_alert} close={() => show_alert = false } color={alert_color} text={alert_text} title={alert_title} icon={alert_icon} />
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
