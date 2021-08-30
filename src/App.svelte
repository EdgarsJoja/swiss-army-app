<script lang="ts">
    import SideBar from './layout/SideBar.svelte';
    import Content from './layout/Content.svelte';
</script>

<div class="wrapper">
    <div class="sidebar">
        <SideBar/>
    </div>
    <div class="content">
        <Content/>
    </div>
</div>

<style lang="scss">
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

    :global(input, textarea, select, button) {
        border-radius: 5px;
    }
</style>
