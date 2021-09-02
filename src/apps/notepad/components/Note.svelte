<script lang="ts">
    import { text } from '../stores/notepad';
</script>

<textarea bind:value={$text} class="notepad-textarea" placeholder="type here..." autofocus></textarea>

<style lang="scss">
    @import "src/shared/styles/variables";

    .notepad-textarea {
        padding: 1em;
        background: $color-bg;
        width: 100%;
        height: 100%;
        resize: none;

        &:focus {
            outline: 0;
        }
    }
</style>
