<script lang="ts">
    import type { Tab } from './tab';
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';

    const tabs: Tab[] = [];
    const activeTabId = writable('');

    setContext('tabs', { activeTabId, addTab });

    function addTab(tab: Tab): void {
        tabs.push(tab);

        if (!$activeTabId) {
            activeTabId.set(tab.id);
        }
    }
</script>

<div class="tabs">
    <div class="tabs-header">
        {#each tabs as tab}
            <div class="tab" on:click={ () => activeTabId.set(tab.id) } class:selected={ tab.id === $activeTabId }>
                { tab.title }
            </div>
        {/each}
    </div>
    <div class="tabs-content">
        <slot />
    </div>
</div>

<style lang="scss">
    @import 'src/shared/styles/variables';

    $tab-text-color: $color-grey;
    $tab-text-color-selected: $color-red;

    .tabs {
        display: flex;
        flex-direction: column;
        height: 100%;

        &-header {
            display: flex;
            justify-content: space-around;
            flex-grow: 0;
            flex-shrink: 0;

            .tab {
                padding: .75em;
                flex-grow: 1;
                text-align: center;
                cursor: pointer;
                color: $tab-text-color;
                border: 1px solid transparent;
                transition: all .2s ease-in-out;

                &:hover {
                    border-bottom: 1px solid $color-grey;
                    opacity: .75;
                }

                &.selected {
                    color: $tab-text-color-selected;
                }
            }
        }

        &-content {
            flex-grow: 1;
            padding: 2em 1em;
        }
    }
</style>
