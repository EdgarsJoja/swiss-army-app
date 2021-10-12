<script lang="ts">
    import { text } from '../stores/notepad';
    import EditorJS, { API, BlockAPI } from '@editorjs/editorjs';
    import Code from '@editorjs/code';
    import Checklist from '@editorjs/checklist';
    import { onMount } from 'svelte';

    let editor: EditorJS;

    onMount(() => {
        editor = new EditorJS({
            holder: 'editor',
            tools: {
                code: Code,
                checklist: {
                    class: Checklist,
                    inlineToolbar: true
                }
            },
            data: $text,
            onChange(api: API, block: BlockAPI) {
                editor.save().then((data) => {
                    text.set(data);
                });
            }
        });
    });
</script>

<div class="notepad" id="editor"></div>

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
