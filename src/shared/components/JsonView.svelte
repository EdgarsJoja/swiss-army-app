<script lang="ts">
    import { json2html } from '../functions/json2html';

    export let collapseJson: boolean = false;
    export let json: string = '';

    let parsedJson: string;
    let initJsonElementsTimeout;

    $: {
       parsedJson = parseJsonInput(json);
       initJsonElementsTimeout = setTimeout(initJsonElements, 100);
    }

    $: toggleJsonCollapse(collapseJson);

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

        return parsedValue ?? {};
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
        document.querySelectorAll('.json-object-item')?.forEach(item => {
            item.addEventListener('click', event => {
                event.stopPropagation();

                const target: Element = event.currentTarget as Element;

                if (target.classList.contains('can-collapse')) {
                    target.classList.toggle('collapsed');
                }
            });
        });

        clearTimeout(initJsonElementsTimeout);
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
</script>

<div class="wrapper">
    {@html json2html(parsedJson)}
</div>

<style lang="scss">
    $color-key: #ccc;
    $color-key-active-background: #DAB785;
    $color-key-active: #343434;

    $color-number: #00B0FF;
    $color-string: #70A288;
    $color-boolean: #D5896F;
    $color-null: #BE5937;
    $color-undefined: #eee;

    .wrapper {
        :global(.json-root > .json-object) {
            padding: 0;
        }

        :global(.json-object) {
            list-style: none;
            margin: 0;
        }

        :global(.key) {
            color: $color-key;
            cursor: pointer;

            &:hover {
                color: $color-key-active;
                background: $color-key-active-background;
            }
        }

        :global(.json-literal.number) {
            color: $color-number;
        }

        :global(.json-literal.string) {
            color: $color-string;
        }

        :global(.json-literal.boolean) {
            color: $color-boolean;
        }

        :global(.json-literal.null) {
            color: $color-null;
        }

        :global(.json-literal.undefined) {
            color: $color-undefined;
        }

        :global(.collapsed .value) {
            display: none;
        }
    }
</style>
