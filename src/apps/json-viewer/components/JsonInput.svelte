<script lang="ts">
    import { json } from '../stores/json.js';

    let jsonInput = $json;

    /**
     * Update JSON store value.
     */
    function updateJsonStore(): void {
        json.set(jsonInput.toString());
    }
</script>

<span class="label">JSON:</span>
<textarea class="json-input" bind:value={jsonInput} on:change={updateJsonStore}></textarea>

<style lang="scss">
    .json-input {
        width: 100%;
        height: 100%;
        margin-top: .5em;
    }
</style>
