
function parse(props) {
    const commonAttributes = {};
    commonAttributes['class'] = props['css'];

    for (const [key, value] of Object.entries(props['data'])) {
        commonAttributes['data-' + key] = value;
    }

    for (const [key, value] of Object.entries(props)) {
        if (!value || ['data', 'css'].indexOf(key) !== -1) {
            continue;
        }

        commonAttributes[key] = value;
    }

    return commonAttributes;
}

export const parseAttributes = parse;
