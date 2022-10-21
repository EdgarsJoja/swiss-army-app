<script lang="ts">
    import { text } from '../stores/notepad';
</script>

<textarea bind:value={$text} class="notepad" placeholder="type here..." autofocus></textarea>

<style lang="scss">
    @import "src/shared/styles/variables";

    .notepad {
        background: $color-surface;
        color: $color-surface-contrast;
        padding: 1em;
        width: 100%;
        min-height: 100%;
        resize: none;
        border-radius: 5px;
        white-space: pre-wrap;

        &:focus {
            outline: 0;
        }
    }
</style>
