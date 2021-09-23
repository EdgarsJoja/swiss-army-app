<script lang="ts">
    import JsonInput from './json-viewer/components/JsonInput.svelte';
    import JsonView from '../shared/components/JsonView.svelte';
    import { json } from './json-viewer/stores/json';

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
    <JsonView collapseJson={collapseJson} json={$json}/>
</div>

<style lang="scss">
    @import 'src/shared/styles/variables';

    .json-viewer {
        padding: 1em;
        border-radius: 5px;
        background: $color-surface;
    }
</style>
