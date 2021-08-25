<script lang="ts">
    import { selectedApp } from '../shared/stores/selected-app.js';
    import JsonViewer from '../apps/JsonViewer.svelte';
    import { SvelteComponent } from 'svelte';

    const appMap: { appCode: string, entryComponent: SvelteComponent }[] = [
        { appCode: 'json_viewer', entryComponent: JsonViewer }
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

<main>
    Selected app: {$selectedApp}
    <svelte:component this={selectedAppComponent}/>
</main>
