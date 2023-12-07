<script>
	import { Router, Route } from "svelte-navigator";

	// admin desktop sidebar
	import Admin from "./web/Admin.svelte";
	import Home from "./web/Home.svelte";
	
	// auth pages
    import Login from "./auth/Login.svelte";
	import Register from "./auth/Register.svelte";
	import Check from "./auth/Check.svelte";

	// admin mobile navbar
    import MobileHome from "./mobileAdmin/MobileHome.svelte";
    import MobileProfile from "./mobileAdmin/MobileProfile.svelte";
	import MobileOrders from "./mobileAdmin/MobileOrders.svelte";
    import MobileRooms from "./mobileAdmin/MobileRooms.svelte";
	import MobileAdd from "./mobileAdmin/MobileAdd.svelte";

	// waiter mobile navbar
	import WaiterOrders from "./mobileWaiter/WaiterOrders.svelte";
	import Products from "./mobileWaiter/Products.svelte"
	import WaiterAdd from "./mobileWaiter/WaiterAdd.svelte";
	import WaiterProfile from "./mobileWaiter/WaiterProfile.svelte"
    
</script>

<Router>
	<Route exact path='/'><Home/></Route>
	<Route exact path="/admin"><Admin/></Route>
	
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