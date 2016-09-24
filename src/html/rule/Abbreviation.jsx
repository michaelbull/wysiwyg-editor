import React from 'react';

export const abbreviation = {
    serialize(node, children) {
        if (node.kind === 'mark' && node.type === 'abbreviation') {
            const title = node.data.get('title');
            return <abbr title={title}>{children}</abbr>;
        }
    },

    deserialize(element, next) {
        if (element.tagName === 'abbr') {
            return {
                kind: 'mark',
                type: 'abbreviation',
                data: element.attribs,
                nodes: next(element.children)
            }
        }
    }
};
