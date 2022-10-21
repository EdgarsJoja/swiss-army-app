<script lang="ts">
    import { clipboard } from '@tauri-apps/api';
    import { addNotification } from '../../../layout/utils/notifications';
    import { NotificationType } from '../../../shared/components/notification';

    const algorithms: { id: string, label: string }[] = [
        { id: 'SHA-1', label: 'SHA-1' },
        { id: 'SHA-256', label: 'SHA-256' },
        { id: 'SHA-384', label: 'SHA-384' },
        { id: 'SHA-512', label: 'SHA-512' },
    ];

    let selectedAlgorithm = 'SHA-256';
    let input = '';

    let hashedHex = '';

    /**
     * Hash the input data.
     */
    async function hash() {
        const data = (new TextEncoder()).encode(input);

        const hash = await crypto.subtle.digest(selectedAlgorithm, data);

        const hashArray = Array.from(new Uint8Array(hash));
        // Convert to HEX string.
        hashedHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Copy hashed value to clipboard.
     */
    function copyHashToClipboard(): void {
        if (!(window as any).rpc) {
            addNotification({
                type: NotificationType.Info,
                message: 'Copy to clipboard is not supported'
            });
            return;
        }

        clipboard.writeText(hashedHex).then(() => {
            addNotification({
                type: NotificationType.Success,
                message: 'Result copied to clipboard!'
            });
        });
    }
</script>

<div class="wrapper">
    <form on:submit|preventDefault={hash}>
        <div class="input-group">
            <span class="input-label">Algorithm:</span>
            <select bind:value={selectedAlgorithm} name="algorithm" class="input-field algorithm-select">
                {#each algorithms as algorithm}
                    <option value={algorithm.id}>{algorithm.label}</option>
                {/each}
            </select>
        </div>

        <div class="input-group">
            <span class="input-label">Input:</span>
            <input type="text" name="input" class="input-field" bind:value={input}/>
        </div>

        <button type="submit" class="submit-button">Hash</button>
    </form>

    {#if hashedHex}
        <span class="result-label">Result:</span>
        <div class="display-block">
            <div class="hashed-result">{hashedHex}</div>
        </div>
        <button class="copy-button" on:click={copyHashToClipboard}>Copy</button>
    {/if}
</div>

<style lang="scss">
    @import "src/shared/styles/variables";

    .wrapper {
        .input-group {
            &:not(:first-of-type) {
                margin-top: 1em;
            }

            .input-label {
                display: block;
                padding-bottom: .5em;
            }

            .input-field {
                min-width: 20em;
            }
        }

        .submit-button {
            margin-top: 1em;
            padding: {
                left: 2em;
                right: 2em;
            }
        }

        .result-label {
            display: block;
            margin: 4em 0 .5em;
        }

        .display-block {
            background: $color-surface;
            color: $color-surface-contrast;
            padding: 1em;
            border-radius: 5px;

            .hashed-result {
                overflow-x: auto;
            }
        }

        .copy-button {
            margin-top: 1em;
            padding: {
                left: 2em;
                right: 2em;
            }
        }
    }
</style>
