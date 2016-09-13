import React from 'react';
import { leadingQuoteClass } from '../LeadingQuote.jsx';
import { BLOCK_TAGS } from '../../tags/Blocks.jsx';

export const block = {
    serialize(node, children) {
        if (node.kind !== 'block') {
            return;
        }

        let className = leadingQuoteClass(children);

        switch (node.type) {
            case 'paragraph':
                return <p className={className}>{children}</p>;
            case 'blockquote':
                return <blockquote className={className}>{children}</blockquote>;
            case 'horizontal-rule':
                return <hr />;
            case 'preformatted':
                return <pre>{children}</pre>;
            case 'bulleted-list':
                return <ul>{children}</ul>;
            case 'numbered-list':
                return <ol>{children}</ol>;
            case 'list-item':
                return <li>{children}</li>;
            case 'heading-one':
                return <h1 className={className}>{children}</h1>;
            case 'heading-two':
                return <h2 className={className}>{children}</h2>;
            case 'heading-three':
                return <h3 className={className}>{children}</h3>;
            case 'heading-four':
                return <h4 className={className}>{children}</h4>;
            case 'heading-five':
                return <h5 className={className}>{children}</h5>;
            case 'heading-six':
                return <h6 className={className}>{children}</h6>;
        }
    },

    deserialize(element, next) {
        const type = BLOCK_TAGS[element.tagName];

        if (!type || type === 'image' || type === 'subtitle') {
            return;
        }

        return {
            kind: 'block',
            type: type,
            nodes: next(element.children)
        }
    }
};
