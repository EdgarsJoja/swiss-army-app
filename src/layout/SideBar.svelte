<script lang="ts">
    import { selectedApp } from '../shared/stores/selected-app.js';
    import { getTauriVersion, getVersion } from '@tauri-apps/api/app';

    let appsFilter: string = '';
    let appVersion: string = '';

    interface App {
        appCode: string;
        label: string;
    }

    const apps: App[] = [
        { appCode: 'json_viewer', label: 'Json Viewer' },
        { appCode: 'sha', label: 'Sha-X Hash' },
        { appCode: 'notepad', label: 'Notepad' },
        { appCode: 'whiteboard', label: 'Whiteboard' },
    ];

    let filteredApps: App[];
    $: filteredApps = filterApps(appsFilter);

    selectApp($selectedApp);

    if (window.rpc) {
        getVersion().then((version) => {
            appVersion = version;
        });
    }

    /**
     * Set global state for currently selected app.
     *
     * @param appCode App code.
     */
    function selectApp(appCode: string) {
        selectedApp.set(appCode);
    }

    /**
     * Return apps filtered by given string.
     *
     * @param filter
     */
    function filterApps(filter: string): App[] {
        return apps.filter((app) => app.label.toLowerCase().indexOf(appsFilter.toLowerCase()) !== -1);
    }
</script>

<div class="wrapper">
    <input class="app-filter" type="text" bind:value={appsFilter}/>
    {#each filteredApps as app}
        <div class="app"
             class:selected={app.appCode === $selectedApp}
             on:click={ () => selectApp(app.appCode) }
        >{app.label}</div>
    {/each}
</div>

{#if appVersion}
    <span class="app-version">v{appVersion}</span>
{/if}

<style lang="scss">
    @import "src/shared/styles/variables";

    .wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 1em 0;

        .app {
            padding: 1em;
            cursor: pointer;
            border-radius: 5px;

            &:hover {
                background: $color-tertiary;
            }

            &.selected {
                font-weight: bold;
                color: $color-primary;
            }
        }
    }

    .app-version {
        position: fixed;
        bottom: 1em;
        left: 1em;
    }
</style>
