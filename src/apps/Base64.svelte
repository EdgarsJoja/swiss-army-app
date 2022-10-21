<script lang="ts">
    import { encode, decode } from '../shared/functions/base64';
    import { addNotification } from '../layout/utils/notifications';
    import { NotificationType } from '../shared/components/notification';

    let base64Input: string;
    let base64Output: string;

    function encodeInput() {
        base64Output = encode(base64Input || '');
    }

    function decodeInput() {
        try {
            base64Output = decode(base64Input || '');
        } catch (e) {
            base64Output = 'Cannot decode!';
            addNotification({
                type: NotificationType.Error,
                title: 'Decode error',
                message: `Cannot base64 decode: ${base64Input}`
            });
        }
    }
</script>

<div class="wrapper">
    <label class="input-label" for="base64_input">Input:</label>
    <input class="input-field" id="base64_input" bind:value={base64Input}/>

    <div class="actions">
        <button class="button-encode" on:click={encodeInput}>Encode</button>
        <button class="button-decode" on:click={decodeInput}>Decode</button>
    </div>

    {#if base64Output}
        <span class="output-label">Output:</span>
        <div class="output-field">{ base64Output || '' }</div>
    {/if}
</div>

<style lang="scss">
    @import 'src/shared/styles/variables';

    .wrapper {
        .input-label,
        .output-label {
            margin-bottom: .5em;
            display: block;
        }

        .input-field {
            width: 100%;
        }

        .actions {
            margin: 1em 0;
        }

        .output-field {
            background: $color-surface;
            padding: 1em;
            border-radius: 5px;
            color: $color-surface-contrast;
        }
    }
</style>
