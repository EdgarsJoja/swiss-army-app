<script lang="ts">
    import SideBar from './layout/SideBar.svelte';
    import Content from './layout/Content.svelte';
    import GlobalNotifications from './layout/utils/notifications/GlobalNotifications.svelte';
    import type { SidebarAction } from './layout/sidebar/sidebar-action';
    import { SidebarActionOrientation } from './layout/sidebar/sidebar-action';
    import { sidebarState } from './layout/stores/sidebar';
    import { settings, Settings } from './layout/settings';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { appWindow } from '@tauri-apps/api/window';

    let collapsedSidebar: boolean;
    $: collapsedSidebar = $sidebarState === 'collapsed';

    let settingsOpen: boolean = false;

    const sidebarActions: SidebarAction[] = [
        {
            text: '&#9881;',
            action: openSettings,
            orientation: SidebarActionOrientation.Left
        },
        {
            text: '&laquo;',
            textCollapsed: '&raquo;',
            action: toggleSidebar,
            orientation: SidebarActionOrientation.Right
        },
    ];

    onMount(() => {
        if ($settings['window.maximized']) {
            appWindow.maximize();
        }
    });

    /**
     * Open settings view.
     */
    function openSettings(): void {
        settingsOpen = true;
    }

    /**
     * Close settings view.
     */
    function closeSettings(): void {
        settingsOpen = false;
    }

    /**
     * Toggle sidebar.
     */
    function toggleSidebar(): void {
        sidebarState.set($sidebarState === 'normal' ? 'collapsed' : 'normal');
    }

    /**
     * Refresh app.
     */
    function refreshApp(): void {
        // @todo: Implement.
    }
</script>

<div class="wrapper">
    <div class="sidebar" class:collapsed={collapsedSidebar}>
        <SideBar {sidebarActions} isCollapsed={collapsedSidebar}/>
    </div>
    <div class="content" class:wide={collapsedSidebar}>
        <Content/>
    </div>

    {#if settingsOpen}
        <div class="settings" transition:fade={{duration: 100}}>
            <Settings on:closeSettings={closeSettings} on:dataUpdate={refreshApp}/>
        </div>
    {/if}

    <div class="global-notifications">
        <GlobalNotifications/>
    </div>
</div>

<style lang="scss">
    @import "shared/styles/variables";

    .wrapper {
        min-height: 100%;
        display: flex;

        .sidebar {
            flex-basis: 20%;
            flex-grow: 2;

            &.collapsed {
                max-width: 3em;
            }
        }

        .content {
            padding: 1em;
            flex-basis: 80%;
            flex-grow: 8;
        }
    }

    :global(*) {
        box-sizing: border-box;
    }

    :global(body) {
        background: $background-color;
        font-family: monospace, monospace;
    }

    :global(input, textarea, select, button) {
        border-radius: 5px;
        background: $input-background-color;
        border: 0;
        color: $input-text-color;
    }

    :global(input, textarea) {
        padding: 0.75em;
    }

    :global(input[type="checkbox"]) {
        width: 18px;
        height: 18px;
    }

    :global(button) {
        padding: .5em 1em;
        border: 0;
        color: $button-text-color;

        &:hover {
            opacity: .75;
            cursor: pointer;
        }

        &:active {
            color: $button-text-color-active;
        }
    }

    .settings {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: $color-background;
    }

    .global-notifications {
        z-index: 10;
        position: fixed;
        right: 1em;
        max-width: 50vw;
    }
</style>
