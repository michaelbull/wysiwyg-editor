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

    /* currency */
    ReplaceText('(euro)', '€'),
    ReplaceText('(yen)', '¥'),
    ReplaceText('(cent)', '¢'),

    /* keyboard */
    ReplaceText('(esc)', '⎋'),
    ReplaceText('(shift)', '⇧'),
    ReplaceText('(caps)', '⇪'),
    ReplaceText('(alt)', '⌥'),
    ReplaceText('(enter)', '↩'),
    ReplaceText('(ctrl)', '⌃'),
    ReplaceText('(cmd)', '⌘'),
    ReplaceText('(backspace)', '⌫'),
    ReplaceText('(delete)', '⌦'),
    ReplaceText('(tab)', '⇥'),
    ReplaceText('(space)', '␣'),
    ReplaceText('(home)', '⇱'),
    ReplaceText('(end)', '⇲'),
    ReplaceText('(pgup)', '⇞'),
    ReplaceText('(pgdown)', '⇟'),
    ReplaceText('(help)', '❓'),
    ReplaceText('(eject)', '⏏'),
    ReplaceText('(mail)', '✉'),
    ReplaceText('(undo)', '↺'),
    ReplaceText('(redo)', '↻'),
    ReplaceText('(refresh)', '⟳'),
    ReplaceText('(cut)', '✂'),

    /* symbols */
    ReplaceText('(c)', '©'),
    ReplaceText('(r)', '®'),
    ReplaceText('(tm)', '™'),
    ReplaceText('<--', '←'),
    ReplaceText('<..', '⇠'),
    ReplaceText('-->', '→'),
    ReplaceText('..>', '⇢'),
    ReplaceText('^--', '↑'),
    ReplaceText('<-->', '↔'),
    ReplaceText('<==', '⇐'),
    ReplaceText('==>', '⇒'),
    ReplaceText(':)', '☺'),
    ReplaceText('<3', '♡'),
    ReplaceText('(star)', '☆'),
    ReplaceText('(sect)', '§'),
    ReplaceText('(spades)', '♠'),
    ReplaceText('(hearts)', '♥'),
    ReplaceText('(diamonds)', '♦'),
    ReplaceText('(clubs)', '♣'),
    ReplaceText('(paragraph)', '¶'),
    ReplaceText('(music)', '♪'),
    ReplaceText('(check)', '✓'),
    ReplaceText('(cross)', '✗'),
    ReplaceText('(pencil)', '✎'),
    ReplaceText('(male)', '♂'),
    ReplaceText('(female)', '♀'),
    ReplaceText('(phone)', '☏'),
    ReplaceText('(tel)', '℡'),
    ReplaceText('(flag)', '⚐'),
    ReplaceText('(recycle)', '♺'),
    ReplaceText('(yinyang)', '☯'),
    ReplaceText('(peace)', '☮'),

    /* math */
    ReplaceText('(infin)', '∞'),
    ReplaceText('(pi)', 'π'),
    ReplaceText('(mu)', 'μ'),
    ReplaceText('(sigma)', 'σ'),
    ReplaceText('(chi)', 'χ'),
    ReplaceText('(bar)', '̄'),
    ReplaceText('(hat)', '̂'),
    ReplaceText('(deg)', '°'),
    ReplaceText('==', '≡'),
    ReplaceText('>=', '≥'),
    ReplaceText('<=', '≤'),
    ReplaceText('<<', '«'),
    ReplaceText('>>', '»'),
    ReplaceText('~=', '≅'),
    ReplaceText('~~', '≈'),
    ReplaceText('!=', '≠'),
    ReplaceText('+-', '±'),
    ReplaceText('%%', '‰'),
    ReplaceText('‰%', '‱'),
    ReplaceText('sqrt(', '√'),
    ReplaceText('cbrt(', '∛'),
    ReplaceText('qdrt(', '∜'),
    ReplaceText('intg(', '∫'),
    ReplaceText('diff(', '∂'),
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

    /* roman numerals */
    ReplaceText('roman(1)', 'Ⅰ'),
    ReplaceText('roman(2)', 'Ⅱ'),
    ReplaceText('roman(3)', 'Ⅲ'),
    ReplaceText('roman(4)', 'Ⅳ'),
    ReplaceText('roman(5)', 'Ⅴ'),
    ReplaceText('roman(6)', 'Ⅵ'),
    ReplaceText('roman(7)', 'Ⅶ'),
    ReplaceText('roman(8)', 'Ⅷ'),
    ReplaceText('roman(9)', 'Ⅸ'),
    ReplaceText('roman(10)', 'Ⅹ'),
    ReplaceText('roman(11)', 'Ⅺ'),
    ReplaceText('roman(12)', 'Ⅻ'),
    ReplaceText('roman(50)', 'Ⅼ'),
    ReplaceText('roman(100)', 'Ⅽ'),
    ReplaceText('roman(500)', 'Ⅾ'),
    ReplaceText('roman(1000)', 'Ⅿ'),

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

    /* sets */
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
];
