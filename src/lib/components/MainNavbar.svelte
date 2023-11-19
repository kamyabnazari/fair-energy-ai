<script lang="ts">
	// Icons imports
	import IconMoon from '~icons/solar/moon-outline';
	import IconSun from '~icons/solar/sun-2-outline';
	import IconMenu from '~icons/solar/hamburger-menu-outline';

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
	<div class="dropdown px-2 lg:hidden">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label tabindex="0" class="btn btn-ghost">
			<IconMenu class="fill-current" style="font-size: x-large" />
		</label>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul
			tabindex="0"
			class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
		>
			<li>
				<a href="/case-study/create" class:active={$page.url.pathname === '/case-study/create'}>
					Try it out
				</a>
			</li>
			<li>
				<a href="/documentation" class:active={$page.url.pathname === '/documentation'}>
					Documentation
				</a>
			</li>
			<li>
				<a href="/about-us" class:active={$page.url.pathname === '/about-us'}> About us </a>
			</li>
		</ul>
	</div>
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/">Fair Energy AI</a>
	</div>
	<div class="hidden flex-none lg:flex">
		<ul class="menu menu-horizontal gap-4">
			<li>
				<a href="/case-study/create" class:active={$page.url.pathname === '/case-study/create'}>
					Try it out
				</a>
			</li>
			<li>
				<a href="/documentation" class:active={$page.url.pathname === '/documentation'}>
					Documentation
				</a>
			</li>
			<li><a href="/about-us" class:active={$page.url.pathname === '/about-us'}> About us </a></li>
		</ul>
	</div>
	<label class="swap swap-rotate px-4">
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
