import React from 'react';
import { MARK_TAGS } from '../../tags/Marks.jsx';

export const mark = {
    serialize(node, children) {
        if (node.kind != 'mark') {
            return;
        }

        switch (node.type) {
            case 'strong':
                return <strong>{children}</strong>;
            case 'emphasis':
                return <em>{children}</em>;
            case 'insert':
                return <ins>{children}</ins>;
            case 'delete':
                return <del>{children}</del>;
            case 'code':
                return <code>{children}</code>;
            case 'superscript':
                return <sup>{children}</sup>;
            case 'subscript':
                return <sub>{children}</sub>;
            case 'cite':
                return <cite>{children}</cite>;
            case 'quote':
                return <q>{children}</q>;
            case 'mark':
                return <mark>{children}</mark>;
            case 'variable':
                return <var>{children}</var>;
            case 'keyboard':
                return <kbd>{children}</kbd>;
            case 'small':
                return <small>{children}</small>;
        }
    },

    deserialize(element, next) {
        const type = MARK_TAGS[element.tagName];

        if (!type || type === 'abbreviation') {
            return;
        }

        return {
            kind: 'mark',
            type: type,
            nodes: next(element.children)
        }
    }
};
