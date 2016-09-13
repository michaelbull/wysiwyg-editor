import React from 'react';
import { leadingQuoteClass } from '../LeadingQuote.jsx';

export const subtitle = {
    serialize(node, children) {
        if (node.kind === 'block' && node.type === 'subtitle') {
            let className = 'subtitle';
            const leadingQuote = leadingQuoteClass(children);

            if (leadingQuote !== undefined) {
                className = leadingQuote + ' ' + className;
            }

            return <p className={className}>{children}</p>;
        }
    },

    deserialize(element, next) {
        if (element.tagName === 'p' && element.attribs && element.attribs.class && element.attribs.class.includes('subtitle')) {
            return {
                kind: 'block',
                type: 'subtitle',
                nodes: next(element.children)
            }
        }
    }
};
