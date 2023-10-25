/**
 * Convert JSON to HTML.
 *
 * @param json
 * @param asRoot
 */
const json2html = (json, asRoot = true): string => {
    let result: string;

    switch (typeof json) {
        case 'object':
            if (json === null) {
                result = parseNull(json);
                break;
            }

            result = parseObject(json);
            break;
        case 'number':
        case 'boolean':
        case 'undefined':
            result = parseLiteral(json);
            break;
        case 'string':
            result = parseLiteral(parseString(json));
            break;
        default:
            result = '???';
            break;
    }

    return asRoot ? `<div class="json-root">${result}</div>` : result;
};

const parseLiteral = (json) => {
    return `<span class="json-literal ${typeof json}">${json}</span>`;
};

const parseString = (json) => {
    return `"${json}"`;
};

const parseObject = (json: object): string => {
    let html = '';
    for (const [key, value] of Object.entries(json)) {
        html += `<li class="json-object-item ${typeof value === 'object' && value !== null ? 'can-collapse' : ''}">
                    <span class="key">${key}:</span>
                    <span class="value">${json2html(value, false)}</span>
                 </li>`;
    }

    return `<ul class="json-object">${html}</ul>`
};

const parseNull = (json): string => {
    return `<span class="json-literal null">${json}</span>`;
}

export {
    json2html
};
