<script lang="ts">
	// Essential imports
	import '../app.css';
	import Navbar from '$lib/components/MainNavbar.svelte';
	import Footer from '$lib/components/MainFooter.svelte';
</script>

<div class="flex-none">
	<Navbar />
</div>
<div class="flex flex-grow flex-col p-8 py-16">
	<div class="flex-grow">
		<slot />
	</div>
</div>
<div class="flex-none">
	<Footer />
</div>
