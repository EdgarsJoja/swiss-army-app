<script lang="ts">
    import { json2html } from '../functions/json2html';
    import { json } from '../stores/json';
    import { onDestroy } from 'svelte';

    export let collapseJson: boolean = false;

    let jsonInput;
    $: jsonInput = parseJsonInput($json);
    $: toggleJsonCollapse(collapseJson);

    const unsubscribe = json.subscribe(() => setTimeout(initJsonElements, 100));

    /**
     * Parse json.
     */
    function parseJsonInput(value: string): any {
        let parsedValue = {};

        try {
            parsedValue = JSON.parse(preprocessJSON(value));
        } catch (e) {
            console.log('Oh no! Anyway...');
        }

        return parsedValue;
    }

    /**
     * Create valid JSON string from given value.
     */
    function preprocessJSON(str): string {
        return str.replace(
            /("(\\.|[^"])*"|'(\\.|[^'])*')|(\w+)\s*:/g,
            function (all, string, strDouble, strSingle, jsonLabel) {
                if (jsonLabel) {
                    return '"' + jsonLabel + '": ';
                }
                return all;
            });
    }

    /**
     * Get list of json object item.
     */
    function initJsonElements(): void {
        // @todo: Find out how to do this via css (remove top level object padding).
        document.querySelector('.json-object').style.paddingLeft = 0;

        document.querySelectorAll('.json-object-item').forEach(item => {
            item.addEventListener('click', event => {
                event.stopPropagation();

                const target: Element = event.currentTarget as Element;

                if (target.classList.contains('can-collapse')) {
                    target.classList.toggle('collapsed');
                }
            });
        });
    }

    /**
     * Toggle json collapse state.
     *
     * @param collapse
     */
    function toggleJsonCollapse(collapse: boolean): void {
        document.querySelectorAll('.json-object-item.can-collapse').forEach(item => {
            if (collapse) {
                item.classList.remove('collapsed');
            } else {
                item.classList.add('collapsed');
            }
        });
    }

    onDestroy(unsubscribe);
</script>

<div class="wrapper">
    {@html json2html(jsonInput)}
</div>

<style lang="scss">
    $color-red: #D5896F;
    $color-red-light: #DAB785;
    $color-red-dark: #BE5937;
    $color-green: #70A288;
    $color-blue: #04395E;
    $color-blue-dark: #031D44;
    $color-grey: #999;

    .wrapper {
        :global(.json-object) {
            list-style: none;
        }

        :global(.key) {
            color: $color-blue-dark;
            cursor: pointer;

            &:hover {
                background: $color-red-light;
            }
        }

        :global(.json-literal.number) {
            color: $color-blue;
        }

        :global(.json-literal.string) {
            color: $color-green;
        }

        :global(.json-literal.boolean) {
            color: $color-red;
        }

        :global(.json-literal.null) {
            color: $color-red-dark;
        }

        :global(.json-literal.undefined) {
            color: $color-grey;
        }

        :global(.collapsed .value) {
            display: none;
        }
    }
</style>
