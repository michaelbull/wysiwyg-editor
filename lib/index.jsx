import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate';
import { html } from './html/Html.jsx';
import { plugins } from './plugins/Plugins.jsx';
import { schema } from './schema/Schema.jsx';

const DEFAULT_NODE = 'paragraph';
const LOCAL_STORAGE_KEY = 'mjb-blog';

export class App extends React.Component {
    state = {
        state: html.deserialize(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '<p></p>')
    };

    onChange = (state) => {
        this.setState({ state });
    };

    onKeyDown = (e, data, state) => {
        if (!data.isMod) {
            return false;
        }

        let mark;

        switch (data.key) {
            case 'b':
                mark = 'strong';
                break;
            case 'i':
                mark = 'emphasis';
                break;
            case 'u':
                mark = 'insert';
                break;
            case 's':
                mark = 'delete';
                break;
            case 'm':
                mark = 'mark';
                break;
            case 'k':
                mark = 'keyboard';
                break;
            case 'q':
                mark = 'quote';
                break;
            case '`':
                mark = 'code';
                break;
            default:
                return false;
        }

        e.preventDefault();

        return state
            .transform()
            .toggleMark(mark)
            .apply();
    };

    onDocumentChange (document, state) {
        const blocks = document.getBlocks();
        const last = blocks.last();

        if (last.type === 'image' || last.type === 'horizontal-rule') {
            const normalized = state.transform()
                .collapseToEndOf(last)
                .splitBlock()
                .setBlock({
                    type: 'paragraph',
                    isVoid: false,
                    data: {}
                })
                .apply({
                    snapshot: false
                });

            this.onChange(normalized);
        }

        const string = html.serialize(state);
        window.localStorage.setItem(LOCAL_STORAGE_KEY, string)
    }

    render = () => {
        return (
            <div>
                {this.renderToolbar()}
                {this.renderEditor()}
            </div>
        );
    };

    renderEditor = () => {
        return (
            <div className="single-column editor">
                <Editor
                    placeholder={'Enter some rich text...'}
                    schema={schema}
                    plugins={plugins}
                    state={this.state.state}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    onDocumentChange={(document, state) => this.onDocumentChange(document, state)}
                />
            </div>
        )
    };

    renderToolbar = () => {
        return (
            <div className="toolbar-menu-wrapper">
                <div className="toolbar-menu">
                    <span className="toolbar-menu-group">
                        {this.renderHeaderButton('heading-one', 1)}
                        {this.renderHeaderButton('heading-two', 2)}
                        {this.renderHeaderButton('heading-three', 3)}
                        {this.renderHeaderButton('heading-four', 4)}
                        {this.renderHeaderButton('heading-five', 5)}
                        {this.renderHeaderButton('heading-six', 6)}
                        {this.renderSubtitleButton()}
                    </span>
                    <span className="toolbar-menu-group">
                        {this.renderBlockButton('preformatted', 'fa fa-code', 'Pre-formatted')}
                        {this.renderBlockButton('blockquote', 'fa fa-quote-left', 'Blockquote')}
                        {this.renderBlockButton('unordered-list', 'fa fa-list-ul', 'Unordered list')}
                        {this.renderBlockButton('ordered-list', 'fa fa-list-ol', 'Ordered list')}
                        {this.renderImageButton()}
                    </span>
                    <span className="toolbar-menu-group">
                        {this.renderMarkButton('strong', 'fa fa-bold', 'Strong <ctrl+b>')}
                        {this.renderMarkButton('emphasis', 'fa fa-italic', 'Emphasis <ctrl+i>')}
                        {this.renderMarkButton('insert', 'fa fa-underline', 'Inserted <ctrl+u>')}
                        {this.renderMarkButton('delete', 'fa fa-strikethrough', 'Deleted <ctrl+s>')}
                        {this.renderMarkButton('superscript', 'fa fa-superscript', 'Superscript')}
                        {this.renderMarkButton('subscript', 'fa fa-subscript', 'Subscript')}
                        {this.renderMarkButton('cite', 'fa fa-plus', 'Cite')}
                        {this.renderMarkButton('quote', 'fa fa-quote-left', 'Quote <ctrl+q>')}
                        {this.renderMarkButton('mark', 'fa fa-pencil-square-o', 'Mark <ctrl+m>')}
                        {this.renderMarkButton('variable', 'fa fa-dollar', 'Variable')}
                        {this.renderMarkButton('code', 'fa fa-code', 'Code <ctrl+`>')}
                        {this.renderMarkButton('keyboard', 'fa fa-keyboard-o', 'Keyboard <ctrl+k>')}
                        {this.renderMarkButton('small', 'fa fa-compress', 'Small')}
                    </span>
                    <span className="toolbar-menu-group">
                        {this.renderDownloadButton()}
                    </span>
                </div>
            </div>
        );
    };

    renderIcon = (iconName) => {
        const icon = 'fa fa-' + iconName;

        return (
            <i className={icon} aria-hidden="true"></i>
        );
    }

    /* marks */

    hasMark = (type) => {
        const { state } = this.state;
        return state.marks.some(mark => mark.type === type);
    };

    onClickMark = (e, type) => {
        e.preventDefault();

        let { state } = this.state;

        state = state
            .transform()
            .toggleMark(type)
            .apply();

        this.setState({ state });
    };

    renderMarkButton = (type, icon, tooltip) => {
        const isActive = this.hasMark(type);
        const onMouseDown = e => this.onClickMark(e, type);

        return (
            <span className="toolbar-menu-button" title={tooltip} onMouseDown={onMouseDown} data-active={isActive}>
                {this.renderIcon(icon)}
            </span>
        );
    };

    /* blocks */

    hasBlock = (type) => {
        const { state } = this.state;
        return state.blocks.some(node => node.type === type);
    };

    onClickBlock = (e, type) => {
        e.preventDefault();
        let { state } = this.state;
        let transform = state.transform();
        const { document } = state;

        if (type !== 'ordered-list' && type !== 'unordered-list') {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if (isList) {
                transform = transform
                    .setBlock(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('ordered-list')
                    .unwrapBlock('unordered-list');
            } else {
                transform = transform
                    .setBlock(isActive ? DEFAULT_NODE : type);
            }
        } else {
            const isList = this.hasBlock('list-item');
            const isType = state.blocks.some((block) => {
                return !!document.getClosest(block, parent => parent.type === type)
            });

            if (isList && isType) {
                transform = transform
                    .setBlock(DEFAULT_NODE)
                    .unwrapBlock('ordered-list')
                    .unwrapBlock('unordered-list');
            } else if (isList) {
                transform = transform
                    .unwrapBlock(type === 'ordered-list' ? 'unordered-list' : 'ordered-list')
                    .wrapBlock(type);
            } else {
                transform = transform
                    .setBlock('list-item')
                    .wrapBlock(type);
            }
        }

        state = transform.apply();
        this.setState({ state });
    };

    renderBlockButton = (type, icon, tooltip) => {
        const isActive = this.hasBlock(type);
        const onMouseDown = e => this.onClickBlock(e, type);

        return (
            <span className="toolbar-menu-button" title={tooltip} onMouseDown={onMouseDown} data-active={isActive}>
                {this.renderIcon(icon)}
            </span>
        );
    };

    renderHeaderButton = (type, number) => {
        const isActive = this.hasBlock(type);
        const onMouseDown = e => this.onClickBlock(e, type);
        const tooltip = "Heading " + number;

        return (
            <span className="toolbar-menu-button" title={tooltip} onMouseDown={onMouseDown} data-active={isActive}>
                {this.renderIcon('header')}<sub>{number}</sub>
            </span>
        );
    };

    renderSubtitleButton = () => {
        const isActive = this.hasBlock('subtitle');
        const onMouseDown = e => this.onClickBlock(e, 'subtitle');

        return (
            <span className="toolbar-menu-button" title="Subtitle" onMouseDown={onMouseDown} data-active={isActive}>
                <sub>{this.renderIcon('header')}</sub>
            </span>
        );
    };

    renderImageButton = () => {
        const onMouseDown = e => this.imageDialog();

        return (
            <span className="toolbar-menu-button" title="Image" onMouseDown={onMouseDown}>
                {this.renderIcon('image')}
            </span>
        );
    };

    imageDialog = () => {
        const src = window.prompt('Enter the URL of the image:');
        const alt = window.prompt('Enter the alt text of the image:');

        if (!src || !alt) {
            return;
        }

        let { state } = this.state;
        state = this.insertImage(state, src, alt);
        this.onChange(state);
    };

    insertImage = (state, src, alt) => {
        return state
            .transform()
            .insertBlock({
                type: 'image',
                isVoid: true,
                data: {
                    src: src,
                    alt: alt
                }
            })
            .apply();
    };

    renderDownloadButton = () => {
        const onMouseDown = e => this.saveHtml();

        return (
            <span className="toolbar-menu-button" title="Download as HTML" onMouseDown={onMouseDown}>
                {this.renderIcon('download')}
            </span>
        );
    };

    saveHtml = () => {
        const download = document.createElement('a');
        const data = html.serialize(this.state.state);
        download.setAttribute('href', 'data:text/text;charset=utf-8,' + encodeURI(data));
        download.setAttribute('download', 'index.html');
        download.click();
    };
}

ReactDOM.render(<App />, document.getElementById('app'));
document.querySelector('[contenteditable]').focus();

