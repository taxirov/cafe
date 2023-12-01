<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint } from "../api/user.api";

    const userEndpoint = new UserEndpoint();
    const token = localStorage.getItem("token");

    // check token
    async function checkToken() {
        if (token) {
            try {
                await userEndpoint.getTokenVerify(token);
                const role = JSON.parse(localStorage.getItem("user")).role;
                if (typeof role === "string" && role === "admin") {
                    if (screen.width < 500) {
                        navigate("/m");
                    } else {
                        navigate("/admin");
                    }
                } else {
                    navigate("/w");
                }
            } catch (error) {
                navigate("/login");
            }
        } else {
            navigate('/login')
        }
    }
    checkToken();
</script>
