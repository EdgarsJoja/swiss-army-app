const json2html = (json): string => {
    switch (typeof json) {
        case 'object':
            if (json === null) {
                return parseNull(json);
            }

            return parseObject(json);
        case 'number':
        case 'boolean':
        case 'undefined':
            return parseLiteral(json);
        case 'string':
            return parseLiteral(parseString(json));
        default:
            return '???';
    }
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
        html += `<li class="json-object-item ${typeof value === 'object' ? 'can-collapse' : ''}">
                    <span class="key">${key}:</span>
                    <span class="value">${json2html(value)}</span>
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
