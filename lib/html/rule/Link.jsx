import React from 'react';

export const link = {
    serialize(node, children) {
        if (node.kind === 'mark' && node.type === 'link') {
            const href = node.data.get('href');
            return <a href={href}>{children}</a>;
        }
    },

    deserialize(element, next) {
        if (element.tagName === 'link') {
            return {
                kind: 'mark',
                type: 'link',
                data: element.attribs,
                nodes: next(element.children)
            }
        }
    }
};
