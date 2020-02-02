
export const isWeixin = (): boolean => {
    const ua = navigator.userAgent.toLowerCase();
    const isWeixin = ua.indexOf('micromessenger') != -1;
    return isWeixin
}