<script>
	import { Router, Route } from "svelte-navigator";

	// admin desktop sidebar
	import Admin from "./web/Admin.svelte";
	import Home from "./web/Home.svelte";
	import Orders from "./web/Orders.svelte";
	import Add from "./web/Add.svelte";
	import Rooms from "./web/Rooms.svelte";
	import Profile from "./web/Profile.svelte";
	import Archive from "./web/Archive.svelte"
	import ProductInOrders from "./web/ProductInOrders.svelte";
	
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
	import Products from "./mobileWaiter/Products.svelte";
	import WaiterRooms from "./mobileWaiter/WaiterRooms.svelte";
	import WaiterProfile from "./mobileWaiter/WaiterProfile.svelte";
    
</script>

<Router>
	<!-- admin -->
	<Route primary={false} exact path='/'><Home/></Route>
	<Route primary={false} exact path="/admin"><Admin/></Route>
	<Route primary={false} exact path="/orders"><Orders/></Route>
	<Route primary={false} exact path='/add'><Add/></Route>
	<Route primary={false} exact path="/rooms"><Rooms/></Route>
	<Route primary={false} exact path="/profile"><Profile/></Route>
	<Route primary={false} exact path="/archive"><Archive/></Route>
	
	<!-- auth -->
	<Route primary={false} exact path='/login'><Login/></Route>
	<Route primary={false} exact path='/register'><Register/></Route>
	<Route primary={false} exact path='/check'><Check/></Route>

	<!-- mobile -->
	<Route primary={false} exact path='/m'><MobileHome/></Route>
	<Route primary={false} exact path='/mprofile'><MobileProfile/></Route>
	<Route primary={false} exact path='/morders'><MobileOrders/></Route>
	<Route primary={false} exact path='/mrooms'><MobileRooms/></Route>
	<Route primary={false} exact path="/madd"><MobileAdd/></Route>

	<!-- waiter -->
	<Route primary={false} exact path='/w'><WaiterOrders/></Route>
	<Route primary={false} exact path='/products'><Products/></Route>
	<Route primary={false} exact path='/wrooms'><WaiterRooms/></Route>
	<Route primary={false} exact path='/wprofile'><WaiterProfile/></Route>
	<Route primary={false} exact path='/pro'><ProductInOrders/></Route>
</Router>