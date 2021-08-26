<script lang="ts">
    import Viewer from './json-viewer/components/Viewer.svelte';
    import JsonInput from './json-viewer/components/JsonInput.svelte';
</script>

<JsonInput/>
<div class="json-viewer">
    <Viewer/>
</div>

<style lang="scss">
    .json-viewer {
        padding: 2em;
        background: #f5f5f5;
    }
</style>
