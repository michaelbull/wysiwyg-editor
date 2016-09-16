import React from 'react';

export const nodes = {
    'paragraph': props => <p {...props.attributes}>{props.children}</p>,
    'subtitle': props => <p className="subtitle" {...props.attributes}>{props.children}</p>,
    'blockquote': props => <blockquote {...props.attributes}>{props.children}</blockquote>,
    'horizontal-rule': props => <hr />,
    'preformatted': props => <pre {...props.attributes}>{props.children}</pre>,
    'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
    'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
    'list-item': props => <li {...props.attributes}>{props.children}</li>,
    'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
    'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
    'heading-three': props => <h3 {...props.attributes}>{props.children}</h3>,
    'heading-four': props => <h4 {...props.attributes}>{props.children}</h4>,
    'heading-five': props => <h5 {...props.attributes}>{props.children}</h5>,
    'heading-six': props => <h6 {...props.attributes}>{props.children}</h6>,
    'image': (props) => {
        const { node, state } = props;
        const isFocused = state.selection.hasEdgeIn(node);
        const src = node.data.get('src');
        const alt = node.data.get('alt');
        const className = isFocused ? 'focused' : undefined;
        return (
            <img src={src} className={className} alt={alt} {...props.attributes} />
        )
    }
};
