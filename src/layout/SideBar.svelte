<script lang="ts">
    import { selectedApp } from '../shared/stores/selected-app.js';

    let appsFilter: string = '';

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

<style lang="scss">
    .wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 1em 0;

        .app {
            padding: 1em;
            cursor: pointer;

            &:hover {
                background: #eee;
            }

            &.selected {
                font-weight: bold;
            }
        }
    }
</style>
