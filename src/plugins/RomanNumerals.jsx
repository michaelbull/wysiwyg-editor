/* http://www.selftaughtjs.com/algorithm-sundays-converting-roman-numerals */

export function toRoman(num) {
    const decimal = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ];
    const roman   = [ 'Ⅿ', 'ⅯⅭ', 'Ⅾ', 'ⅭⅮ', 'Ⅽ', 'ⅩⅭ', 'Ⅼ', 'ⅩⅬ', 'Ⅹ', 'Ⅸ', 'Ⅷ', 'Ⅶ', 'Ⅵ', 'Ⅴ', 'Ⅳ', 'Ⅲ', 'Ⅱ', 'Ⅰ' ];

    var result = '';

    for (var i = 0; i <= decimal.length; i++) {
        while (num % decimal[i] < num) {
            result += roman[i];
            num -= decimal[i];
        }
    }

    return result;
}
