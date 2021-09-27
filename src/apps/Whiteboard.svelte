<script lang="ts">
    import DrawArea from './whiteboard/components/DrawArea.svelte';
    import type { SvelteComponent } from 'svelte';

    let drawAreaComponent: SvelteComponent;
</script>

<div class="wrapper">
    <div class="actions">
        <button type="button" class="clear-canvas" on:click={drawAreaComponent.clearCanvas}>Clear</button>
        <button type="button" class="download-image" on:click={drawAreaComponent.downloadImage}>Download</button>
    </div>
    <DrawArea bind:this={drawAreaComponent}/>
</div>

<style lang="scss">
    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
