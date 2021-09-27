<script lang="ts">
    import { selectedApp } from '../shared/stores/selected-app.js';
    import type { SidebarAction } from './sidebar/sidebar-action';
    import { SidebarActionOrientation } from './sidebar/sidebar-action';

    export let sidebarActions: SidebarAction[] = [];
    export let isCollapsed = false;

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
        { appCode: 'jwt', label: 'JWT' },
        { appCode: 'base64', label: 'Base64' },
    ];

    let filteredApps: App[];
    $: filteredApps = filterApps(appsFilter);

    let leftSidebarActions: SidebarAction[];
    $: leftSidebarActions = sidebarActions.filter(action => action.orientation === SidebarActionOrientation.Left);

    let rightSidebarActions: SidebarAction[];
    $: rightSidebarActions = sidebarActions.filter(action => action.orientation === SidebarActionOrientation.Right);

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
    {#if !isCollapsed}
        <input class="app-filter" type="text" bind:value={appsFilter}/>
    {/if}
    <div class="actions" class:collapsed={isCollapsed}>
        <div class="left">
            {#each leftSidebarActions as action}
                <button type="button" class="action-button" on:click={action.action}>
                    {@html !isCollapsed || !action.textCollapsed ? action.text : action.textCollapsed}
                </button>
            {/each}
        </div>
        <div class="right">
            {#each rightSidebarActions as action}
                <button type="button" class="action-button" on:click={action.action}>
                    {@html !isCollapsed || !action.textCollapsed ? action.text : action.textCollapsed}
                </button>
            {/each}
        </div>
    </div>

    {#if !isCollapsed}
        {#each filteredApps as app}
            <div class="app"
                 class:selected={app.appCode === $selectedApp}
                 on:click={ () => selectApp(app.appCode) }
            >{app.label}</div>
        {/each}
    {/if}
</div>

<style lang="scss">
    @import "src/shared/styles/variables";

    $app-hover-background-color: $color-surface;
    $app-text-color: $color-white;
    $app-selected-text-color: $color-accent;

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
            color: $app-text-color;

            &:hover {
                background: $app-hover-background-color;
            }

            &.selected {
                font-weight: bold;
                color: $app-selected-text-color;
            }
        }

        .actions {
            margin-bottom: .5em;
            display: flex;
            justify-content: space-between;

            &.collapsed {
                flex-direction: column-reverse;

                .action-button {
                    margin-bottom: .25em;

                    &:not(:first-of-type) {
                        margin-left: 0;
                    }
                }
            }

            .action-button {
                width: 1.5em;
                padding: .1em;
                font-size: 2em;
                margin-bottom: 0;

                &:not(:first-of-type) {
                    margin-left: .25em;
                }
            }
        }
    }
</style>
