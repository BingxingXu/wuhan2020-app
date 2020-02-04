
export const isWeixin = (): boolean => {
    const ua = navigator.userAgent.toLowerCase();
    const isWeixin = ua.indexOf('micromessenger') != -1;
    return isWeixin
}

// export const toThousands = (num: number) => {
//     var result = '', counter = 0;
//     num = (num || 0).toString();
//     for (var i = num.length - 1; i >= 0; i--) {
//         counter++;
//         result = num.charAt(i) + result;
//         console.log('charat res'+result);
//         if (!(counter % 3) && i != 0) {
//             result = ',' + result;
//             console.log('IF zhongde  res'+result);
//         }
//     }
//     return result;
// }