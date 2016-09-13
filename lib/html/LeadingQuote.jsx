function contentFrom (children) {
    if (typeof children === 'undefined') {
        return undefined;
    }

    if (!children.first) {
        if (children instanceof Array) {
            return children[0]
        } else if (children.props && children.props.children instanceof Array) {
            return children.props.children[0];
        } else {
            return undefined;
        }
    }

    const first = children.first();

    if (typeof first === 'string') {
        return first;
    } else {
        return contentFrom(first);
    }
}

export function leadingQuoteClass (children) {
    const content = contentFrom(children);

    if (content === undefined) {
        return undefined;
    }

    const start = content.charAt(0);

    if (start === '“') {
        return 'leading-double-quote'
    } else if (start === '‘') {
        return 'leading-single-quote'
    } else {
        return undefined;
    }
}
