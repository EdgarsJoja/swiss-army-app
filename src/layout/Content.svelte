<script lang="ts">
    import { selectedApp } from '../shared/stores/selected-app.js';
    import JsonViewer from '../apps/JsonViewer.svelte';
    import { SvelteComponent } from 'svelte';
    import ShaHash from '../apps/ShaHash.svelte';
    import Notepad from '../apps/Notepad.svelte';

    const appMap: { appCode: string, entryComponent: SvelteComponent }[] = [
        { appCode: 'json_viewer', entryComponent: JsonViewer },
        { appCode: 'sha', entryComponent: ShaHash },
        { appCode: 'notepad', entryComponent: Notepad },
    ];

    /**
     * Returns component object for the corresponding code.
     *
     * @param code App code.
     */
    function getAppEntryComponentByCode(code: string): SvelteComponent {
        return appMap.find(app => app.appCode === code)?.entryComponent;
    }

    let selectedAppComponent: SvelteComponent;
    $: selectedAppComponent = getAppEntryComponentByCode($selectedApp);
</script>

<div class="wrapper">
    <svelte:component this={selectedAppComponent}/>
</div>

<style lang="scss">
    .wrapper {
        height: 100%;
    }
</style>
