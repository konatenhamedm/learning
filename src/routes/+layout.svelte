<script lang="ts">
    import Footer from '$components/_includes/Footer.svelte';
    import Modale from '$components/_includes/Modale.svelte';
    import Side from '$components/_includes/Side.svelte';
	import '../app.css';
    import Header from '../components/_includes/Header.svelte';
	import { page } from '$app/stores';
    import { getAuthCookie } from '$lib/auth';

	import {Amplify} from 'aws-amplify';
	//import {signIn} from 'aws-amplify/auth';
	import awsmobile from "../lib/aws-exports"
    import { onMount } from 'svelte';

	//Amplify.configure(awsmobile);
	//let user: User =  getAuthCookie();



</script>


{#if $page.url.pathname != '/'}
<!-- Preloader start  -->
<div id="preloader" class="bg-white dark:bg-[#242424] p-0 m-0 h-full fixed z-[99999] w-full flex items-center justify-center">
	<div class="lds-ripple inline-block relative w-20 h-20">
		<div></div>
		<div></div>
	</div>
</div>
<!-- Preloader end -->
<div id="main-wrapper">
	<main>
		<Header />
		<Side />
		<div class="content-body" style="min-height: 1040px;">
			<slot />
		</div>
		<Modale />
		<Footer />
	</main>
</div>
{:else}
<!-- <main> -->

	<slot />
<!-- </main> -->
{/if}



