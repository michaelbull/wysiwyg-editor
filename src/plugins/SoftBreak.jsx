function splitParagraph (state) {
    return state.transform()
        .splitBlock()
        .setBlock('paragraph')
        .apply();
}

export function SoftBreak (options = {}) {
    return {
        onKeyDown(e, data, state) {
            if (data.key !== 'enter') {
                return false;
            }

            if (!data.isShift) {
                return splitParagraph(state);
            }

            const { startBlock } = state;
            const { type } = startBlock;

            if (options.onlyIn && !options.onlyIn.includes(type)) {
                return splitParagraph(state);
            }

            if (options.ignoreIn && options.ignoreIn.includes(type)) {
                return splitParagraph(state);
            }

            return state.transform()
                .insertText('\n')
                .apply()
        }
    }
}
