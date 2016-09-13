export function SoftBreak (options = {}) {
    return {
        onKeyDown(e, data, state) {
            if (data.key != 'enter') {
                return false;
            }

            if (data.isMod) {
                return state.transform()
                    .splitBlock()
                    .setBlock('paragraph')
                    .apply();
            }

            const { startBlock } = state;
            const { type } = startBlock;

            if (options.onlyIn && !options.onlyIn.includes(type)) {
                return false;
            }

            if (options.ignoreIn && options.ignoreIn.includes(type)) {
                return false;
            }

            return state.transform()
                .insertText('\n')
                .apply()
        }
    }
}
