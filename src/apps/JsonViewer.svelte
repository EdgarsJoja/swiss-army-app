<script lang="ts">
    import JsonInput from './json-viewer/components/JsonInput.svelte';
    import JsonView from '../shared/components/JsonView.svelte';
    import { json } from './json-viewer/stores/json';
    import Tabs from '../shared/components/tabs/Tabs.svelte';
    import Tab from '../shared/components/tabs/Tab.svelte';

    let collapseJson: boolean = true;
</script>

<Tabs>
    <Tab id="json-input" title="Input">
        <JsonInput/>
    </Tab>
    <Tab id="json-output" title="Output">
        <div class="actions">
            <button class="toggle-collapse" on:click={() => collapseJson = !collapseJson}>Toggle Collapse</button>
        </div>

        <div class="json-viewer">
            <JsonView collapseJson={collapseJson} json={$json}/>
        </div>
    </Tab>
</Tabs>

<style lang="scss">
    @import 'src/shared/styles/variables';

    .json-viewer {
        padding: 1em;
        border-radius: 5px;
        background: $color-surface;
    }
</style>
