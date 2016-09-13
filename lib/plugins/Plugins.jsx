import EditCode from 'slate-edit-code';
import Replace from 'slate-auto-replace';
import ReplaceText from 'slate-auto-replace-text';
import { SoftBreak } from './SoftBreak.jsx';

export const plugins = [
    EditCode({
        onlyIn: function (node) {
            return node.kind === 'block' && node.type === 'preformatted';
        }
    }),
    SoftBreak({
        onlyIn: ['blockquote']
    }),
    ReplaceText('==', '≡'),
    ReplaceText('>=', '≥'),
    ReplaceText('>>', '»'),
    ReplaceText('<=', '≤'),
    ReplaceText('<<', '«'),
    ReplaceText('~=', '≅'),
    ReplaceText('~~', '≈'),
    ReplaceText('!=', '≠'),
    ReplaceText('+-', '±'),
    ReplaceText('%%', '‰'),
    ReplaceText('sqrt(', '√'),
    ReplaceText('cbrt(', '∛'),
    ReplaceText('qdrt(', '∜'),
    ReplaceText('intg(', '∫'),
    ReplaceText('diff(', '∂'),
    ReplaceText('(~infin)', '∞'),
    ReplaceText('(~real)', 'ℝ'),
    ReplaceText('(~complex)', 'ℂ'),
    ReplaceText('(~natural)', 'ℕ'),
    ReplaceText('(~prime)', 'ℙ'),
    ReplaceText('(~rational)', 'ℚ'),
    ReplaceText('(~integer)', 'ℤ'),
    ReplaceText('(~forall)', '∀'),
    ReplaceText('(~complement)', '∁'),
    ReplaceText('(~exists)', '∃'),
    ReplaceText('(~notexists)', '∄'),
    ReplaceText('(~empty)', '∅'),
    ReplaceText('(~not)', '¬'),
    ReplaceText('(~and)', '∧'),
    ReplaceText('(~or)', '∨'),
    ReplaceText('(~xor)', '⊻'),
    ReplaceText('(~nand)', '⊼'),
    ReplaceText('(~nor)', '⊽'),
    ReplaceText('(~intersect)', '∩'),
    ReplaceText('(~union)', '∪'),
    ReplaceText('(~of)', '∈'),
    ReplaceText('(~notof)', '∉'),
    ReplaceText('(~contains)', '∋'),
    ReplaceText('(~notcontains)', '∌'),
    ReplaceText('(~subset)', '⊂'),
    ReplaceText('(~notsubset)', '⊄'),
    ReplaceText('(~superset)', '⊃'),
    ReplaceText('(~notsuperset)', '⊅'),
    ReplaceText('(mu)', 'μ'),
    ReplaceText('(sigma)', 'σ'),
    ReplaceText('(chi)', 'χ'),
    ReplaceText('(bar)', '̄'),
    ReplaceText('(hat)', '̂'),
    ReplaceText('(deg)', '°'),
    ReplaceText({
        trigger: /\*/,
        matchBefore: /[0-9]$/,
        replacement: '×'
    }),
    Replace({
        trigger: '/',
        before: /(\/)$/,
        transform: transform => transform.insertText('÷')
    }),
    Replace({
        trigger: '^',
        before: /[0-9]$/,
        transform: transform => transform.toggleMark('superscript')
    }),
    Replace({
        trigger: 'enter',
        before: /^(-{3})$/,
        transform: transform => transform.setBlock({
            type: 'horizontal-rule',
            isVoid: true
        })
    }),

    /* symbols */
    ReplaceText('(c)', '©'),
    ReplaceText('(r)', '®'),
    ReplaceText('(tm)', '™'),
    ReplaceText('<--', '←'),
    ReplaceText('-->', '→'),
    ReplaceText('<-->', '↔'),
    ReplaceText('<==', '⇐'),
    ReplaceText('==>', '⇒'),
    ReplaceText(':)', '☺'),
    ReplaceText('<3', '♡'),
    ReplaceText('(shift)', '⇧'),
    ReplaceText('(cmd)', '⌘'),
    ReplaceText('(del)', '⌫'),

    /* prevent double spaces */
    ReplaceText({
        trigger: ' ',
        matchBefore: / $/,
        replacement: ''
    }),

    /* fractions */
    ReplaceText('1/2', '½'),
    ReplaceText('0/3', '↉'),
    ReplaceText('1/3', '⅓'),
    ReplaceText('2/3', '⅔'),
    ReplaceText('1/4', '¼'),
    ReplaceText('3/4', '¾'),
    ReplaceText('1/5', '⅕'),
    ReplaceText('2/5', '⅖'),
    ReplaceText('3/5', '⅗'),
    ReplaceText('4/5', '⅘'),
    ReplaceText('1/6', '⅙'),
    ReplaceText('5/6', '⅚'),
    ReplaceText('1/7', '⅐'),
    ReplaceText('1/8', '⅛'),
    ReplaceText('3/8', '⅜'),
    ReplaceText('5/8', '⅝'),
    ReplaceText('7/8', '⅞'),
    ReplaceText('1/9', '⅑'),
    ReplaceText('1/10', '⅒'),

    /* endash */
    ReplaceText({
        trigger: /-/,
        matchBefore: /[0-9]$/,
        replacement: '–'
    }),

    /* emdash */
    ReplaceText('--', ' — '),
    ReplaceText(' - ', ' — '),

    /* ellipsis */
    ReplaceText('...', '…'),

    /* double quotes */
    ReplaceText({
        trigger: '"',
        matchBefore: /[a-zA-Z, ]$/,
        replacement: '”'
    }),
    ReplaceText({
        trigger: /^[a-zA-Z0-9]$/,
        matchBefore: /(?:^|[^a-zA-Z0-9])(")$/,
        replacement: char => `“${char}`
    }),

    /* single quotes */
    ReplaceText({
        trigger: '\'',
        matchBefore: /[a-zA-Z, ]$/,
        replacement: '’'
    }),
    ReplaceText({
        trigger: /^[a-zA-Z0-9]$/,
        matchBefore: /(?:^|[^a-zA-Z0-9])(')$/,
        replacement: char => `‘${char}`
    }),

    /* primes **/
    ReplaceText({
        trigger: '"',
        matchBefore: /[0-9]$/,
        replacement: '″'
    }),
    ReplaceText({
        trigger: '\'',
        matchBefore: /[0-9]$/,
        replacement: '′'
    }),
    ReplaceText({
        trigger: '\'',
        matchBefore: /[0-9](″)$/,
        replacement: '‴'
    }),

    /* numero */
    ReplaceText({
        trigger: /[0-9]$/,
        matchBefore: /(No.[ ]?)$/,
        replacement: char => `№${char}`
    }),
];
