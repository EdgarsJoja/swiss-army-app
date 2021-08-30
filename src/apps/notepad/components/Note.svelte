<script lang="ts">
    import { text } from '../stores/notepad';
</script>

<textarea bind:value={$text} class="notepad-textarea" placeholder="type here..." autofocus></textarea>

<style lang="scss">
    .notepad-textarea {
        padding: 1em;
        border: 0;
        background: #f9f9f9;
        width: 100%;
        height: 100%;
        resize: none;

        &:focus {
            outline: 0;
        }
    }
</style>
