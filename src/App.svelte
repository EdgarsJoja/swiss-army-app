<script lang="ts">
    import SideBar from './layout/SideBar.svelte';
    import Content from './layout/Content.svelte';
    import GlobalNotifications from './layout/utils/notifications/GlobalNotifications.svelte';
</script>

<div class="wrapper">
    <div class="sidebar">
        <SideBar/>
    </div>
    <div class="content">
        <Content/>
    </div>

    <div class="global-notifications">
        <GlobalNotifications/>
    </div>
</div>

<style lang="scss">
    @import "shared/styles/variables";

    .wrapper {
        height: 100%;

        display: flex;

        .sidebar {
            width: 20%;
        }

        .content {
            padding: 1em;
            width: 80%;
        }
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

    :global(button) {
        padding: .5em 1em;
        border: 0;
        color: $button-text-color;

        &:hover {
            opacity: .75;
        }
    }

    .global-notifications {
        position: fixed;
        right: 1em;
    }
</style>
