<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint } from "../api/user.api";

    const userEndpoint = new UserEndpoint();
    const token = localStorage.getItem("token");

    // check token
    async function checkToken() {
        if (token) {
            const res = await userEndpoint.getTokenVerify(token);
            if (res.status == 200) {
                const role = JSON.parse(localStorage.getItem("user")).role;
                if (role === "admin") {
                    if (screen.width < 500) {
                        navigate("/m");
                    } else {
                        navigate("/admin");
                    }
                } else {
                    navigate("/w");
                }
            } else {
                return navigate("/login");
            }
        } else {
            return navigate("/login");
        }
    }
    checkToken();
</script>
