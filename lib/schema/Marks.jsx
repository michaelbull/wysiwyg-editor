import React from 'react';

export const marks = {
    'strong': props => <strong {...props.attributes}>{props.children}</strong>,
    'code': props => <code {...props.attributes}>{props.children}</code>,
    'emphasis': props => <em {...props.attributes}>{props.children}</em>,
    'insert': props => <ins {...props.attributes}>{props.children}</ins>,
    'delete': props => <del {...props.attributes}>{props.children}</del>,
    'superscript': props => <sup {...props.attributes}>{props.children}</sup>,
    'subscript': props => <sub {...props.attributes}>{props.children}</sub>,
    'cite': props => <cite {...props.attributes}>{props.children}</cite>,
    'quote': props => <q {...props.attributes}>{props.children}</q>,
    'mark': props => <mark {...props.attributes}>{props.children}</mark>,
    'variable': props => <var {...props.attributes}>{props.children}</var>,
    'keyboard': props => <kbd {...props.attributes}>{props.children}</kbd>,
    'small': props => <small {...props.attributes}>{props.children}</small>,
    'abbreviation': (props) => {
        const title = props.mark.data.get('title');
        return (
            <abbr title={title} {...props.attributes}>{props.children}</abbr>
        )
    }
};
