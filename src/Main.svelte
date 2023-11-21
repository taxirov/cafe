<script>
	import { Router, Route } from "svelte-navigator";

	// admin desktop sidebar
	import Admin from "./mobile/Admin.svelte";
    import Demo from "./mobile/Demo.svelte";
	import Home from "./mobile/Home.svelte";
	
	// auth pages
    import Login from "./auth/Login.svelte";
	import Register from "./auth/Register.svelte";
	import Check from "./auth/Check.svelte";

	// admin mobile navbar
    import MobileHome from "./mobile/MobileHome.svelte";
    import MobileProfile from "./mobile/MobileProfile.svelte";
	import MobileOrders from "./mobile/MobileOrders.svelte";
    import MobileRooms from "./mobile/MobileRooms.svelte";
	import MobileAdd from "./mobile/MobileAdd.svelte";

	// waiter mobile navbar
	import WaiterOrders from "./mobile/WaiterOrders.svelte";
	import Products from "./mobile/Products.svelte"
	import WaiterAdd from "./mobile/WaiterAdd.svelte";
	import WaiterProfile from "./mobile/WaiterProfile.svelte"
    
</script>

<Router>
	<Route exact path='/'><Home/></Route>
	<Route exact path="/admin"><Admin/></Route>
	<Route exact path='/demo'><Demo/></Route>
	
	<!-- auth -->
	<Route exact path='/login'><Login/></Route>
	<Route exact path='/register'><Register/></Route>
	<Route exact path='/check'><Check/></Route>

	<!-- mobile -->
	<Route exact path='/m'><MobileHome/></Route>
	<Route exact path='/mprofile'><MobileProfile/></Route>
	<Route exact path='/morders'><MobileOrders/></Route>
	<Route exact path='/mrooms'><MobileRooms/></Route>
	<Route exact path="/madd"><MobileAdd/></Route>

	<!-- waiter -->
	<Route exact path='/w'><WaiterOrders/></Route>
	<Route exact path='/products'><Products/></Route>
	<Route exact path='/wadd'><WaiterAdd/></Route>
	<Route exact path='/wprofile'><WaiterProfile/></Route>
</Router>