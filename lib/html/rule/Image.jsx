import React from 'react';

export const image = {
    serialize(node, children) {
        if (node.kind === 'block' && node.type === 'image') {
            const src = node.data.get('src');
            const alt = node.data.get('alt');
            return <img src={src} alt={alt} />;
        }
    },

    deserialize(element, next) {
        if (element.tagName === 'img') {
            return {
                kind: 'block',
                type: 'image',
                isVoid: true,
                data: element.attribs
            }
        }
    }
};
