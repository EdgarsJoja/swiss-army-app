<script lang="ts">
    import { getContext, onMount } from 'svelte';

    export let id: string;
    export let title: string;
    const { activeTabId, addTab } = getContext('tabs');

    onMount(() => {
        addTab({ id, title });
    });
</script>

{#if id === $activeTabId}
    <slot />
{/if}
