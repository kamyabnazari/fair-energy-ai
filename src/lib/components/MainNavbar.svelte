<script lang="ts">
	// Icons imports
	import IconMoon from '~icons/solar/moon-outline';
	import IconSun from '~icons/solar/sun-2-outline';

	// Essential imports
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	// Variables
	const theme = writable('light');

	// OnMount function
	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			theme.set(savedTheme);
		} else {
			// Use browser's preference if no saved theme
			const prefersDark =
				window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
			const defaultTheme = prefersDark ? 'dark' : 'light';
			theme.set(defaultTheme);
		}
		document.documentElement.setAttribute('data-theme', $theme);
	});

	onDestroy(() => {
		theme.set('dark'); // Reset the theme to default on component destruction
	});

	$: isChecked = $theme === 'dark'; // Computed property for checkbox state

	function handleCheckboxChange() {
		isChecked;
		toggleTheme();
	}

	const toggleTheme = () => {
		theme.update((currentTheme) => {
			const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
			document.documentElement.setAttribute('data-theme', newTheme);
			localStorage.setItem('theme', newTheme);
			return newTheme;
		});
	};
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/">Fair Energy AI</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li>
				<a href="/documentation" class:active={$page.url.pathname === '/documentation'}>
					Documentation
				</a>
			</li>
			<li><a href="/about-us" class:active={$page.url.pathname === '/about-us'}> About us </a></li>
		</ul>
	</div>
	<label class="swap swap-rotate">
		<input
			type="checkbox"
			class="theme-controller"
			value="synthwave"
			bind:checked={isChecked}
			on:change={handleCheckboxChange}
		/>
		<IconSun class="swap-off text-primary fill-current" style="font-size: x-large" />
		<IconMoon class="swap-on text-warning fill-current" style="font-size: x-large" />
	</label>
</div>
