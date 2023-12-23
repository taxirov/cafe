<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint } from "../api";

    const userEndpoint = new UserEndpoint();
    const token = localStorage.getItem("token");

    // check token
    async function checkToken() {
        if (token) {
            try {
                const res = await userEndpoint.getTokenVerify(token);
                const user = res.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                if (user.role === "admin") {
                    if (screen.width > 500) {
                        navigate('/admin')
                    } else {
                        navigate("/m");
                    }
                } else if(user.role == "waiter") {
                    navigate("/w");
                } else {
                    navigate('/pro')
                }
            } catch (error) {
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }
    checkToken();
</script>
