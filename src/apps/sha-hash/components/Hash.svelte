<script lang="ts">
    import { clipboard } from '@tauri-apps/api';

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
        navigator.clipboard.writeText(hashedHex).then(() => {
            console.log('copied!');
        });
    }
</script>

<div class="wrapper">
    <form on:submit|preventDefault={hash}>
        <div class="input-group">
            <label>Algorithm:</label>
            <select bind:value={selectedAlgorithm} name="algorithm" class="input-field algorithm-select">
                {#each algorithms as algorithm}
                    <option value={algorithm.id}>{algorithm.label}</option>
                {/each}
            </select>
        </div>

        <div class="input-group">
            <label>Input:</label>
            <input type="text" name="input" class="input-field" bind:value={input}/>
        </div>

        <button type="submit" class="submit-button">Hash</button>
    </form>
    <div class="display-block">
        <div class="hashed-result">{hashedHex}</div>
    </div>
    <button class="copy-button" on:click={copyHashToClipboard}>Copy</button>
</div>

<style lang="scss">
    @import "src/shared/styles/variables";

    .wrapper {
        label {
            color: $color-surface-contrast;
            opacity: .75;
            padding-bottom: .5em;
        }

        .algorithm-select {
            color: $color-surface;
        }

        .input-field {
            min-width: 20em;
        }

        .submit-button {
            background: $button-accent-background-color;
            color: $button-accent-text-color;
            margin-top: 1em;
            padding: {
                left: 2em;
                right: 2em;
            }
        }

        .display-block {
            background: $color-surface;
            color: $color-surface-contrast;
            padding: 1em;
            margin-top: 5em;
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
