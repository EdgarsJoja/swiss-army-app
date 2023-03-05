<script lang="ts">
    import { selectedApp } from '../shared/stores/selected-app.js';
    import JsonViewer from '../apps/JsonViewer.svelte';
    import type { SvelteComponent } from 'svelte';
    import ShaHash from '../apps/ShaHash.svelte';
    import Notepad from '../apps/Notepad.svelte';
    import Whiteboard from '../apps/Whiteboard.svelte';
    import JWT from '../apps/jwt.svelte';
    import Base64 from '../apps/Base64.svelte';

    const appMap: { appCode: string, entryComponent: SvelteComponent }[] = [
        { appCode: 'json_viewer', entryComponent: JsonViewer },
        { appCode: 'sha', entryComponent: ShaHash },
        { appCode: 'notepad', entryComponent: Notepad },
        { appCode: 'whiteboard', entryComponent: Whiteboard },
        { appCode: 'jwt', entryComponent: JWT },
        { appCode: 'base64', entryComponent: Base64 },
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
        min-height: 100%;
        height: 100%;
    }
</style>
