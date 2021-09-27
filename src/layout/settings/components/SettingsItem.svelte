<script lang="ts">
    export let label: string;
</script>

<div class="settings-item">
    <div class="settings-item-label">{label}</div>
    <div class="settings-item-value">
        <slot name="value">-</slot>
    </div>
</div>

<style lang="scss">
    .settings-item {
        margin-top: 1em;
        display: flex;
        justify-content: space-between;
    }
</style>
