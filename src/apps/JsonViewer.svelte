<script lang="ts">
    import Viewer from './json-viewer/components/Viewer.svelte';
    import JsonInput from './json-viewer/components/JsonInput.svelte';

    let showInput: boolean = true;
    let collapseJson: boolean = true;
</script>

{#if showInput}
    <JsonInput/>
{/if}

<div class="actions">
    <button class="toggle-input" on:click={() => showInput = !showInput}>Toggle Input</button>
    <button class="toggle-collapse" on:click={() => collapseJson = !collapseJson}>Toggle Collapse</button>
</div>

<div class="json-viewer">
    <Viewer collapseJson={collapseJson}/>
</div>

<style lang="scss">
    .json-viewer {
        padding: 2em;
        background: #f5f5f5;
    }
</style>
