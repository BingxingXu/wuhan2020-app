import { request } from './request';

interface Config {
    appId: string
    timestamp: number
    nonceStr: string
    signature: string
}

export const initWeixin = async () => {
    try {
        let url = location.href.split('?')[0];
        const res: Config = await request(`/weixin/config?url=${url}`);
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature,// 必填，签名
            jsApiList: [
                'updateAppMessageShareData',
                'onMenuShareAppMessage'
            ] // 必填，需要使用的JS接口列表
        });

        wx.error(function (res) {
            console.log('err', res)
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
        let currurl = location.href.split('?')[0];
        wx.ready(function () {
            wx.updateAppMessageShareData({
                title: '抗击新冠肺炎  共同守卫平安', // 分享标题
                desc: '汇总疫情动态，助您科学预防。武汉加油！中国平安！', // 分享描述
                link: currurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'https://minx.oss-cn-shanghai.aliyuncs.com/wuhan/share-weixin.png', // 分享图标
                success: function () {
                    console.log('success')
                    // 设置成功
                },
            })
        });

    } catch (err) {
        console.log('err', err)
    }
}
