<script lang="ts">
    import { selectedApp } from '../shared/stores/selected-app.js';

    const apps: { appCode: string, label: string }[] = [
        { appCode: 'json_viewer', label: 'Json Viewer' },
        { appCode: 'sha256', label: 'Sha256' },
    ];

    // @todo: Keep this in memory.
    selectApp('json_viewer');

    /**
     * Set global state for currently selected app.
     *
     * @param appCode App code.
     */
    function selectApp(appCode: string) {
        selectedApp.set(appCode);
    }
</script>

<div class="wrapper">
    {#each apps as app}
        <div class="app" on:click={ () => selectApp(app.appCode) }>{app.label}</div>
    {/each}
</div>

<style lang="scss">
    .wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;

        .app {
            padding: 1em;
            cursor: pointer;

            &:hover {
                background: #eee;
            }
        }
    }
</style>
