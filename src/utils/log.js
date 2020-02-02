function track(eventId, labelId) {
    // 埋点
    PALifeOpen.invoke(
        'device',
        'addRecord',
        {
            eventId: eventId, //必填，根据需求
            labelId: labelId, //必填，根据需求
            parameters: {
                // 扩展参数
                ext: JSON.stringify({
                    act_action: 'share'
                })
            }
        },
        function (res) {
            console.log('success', res)
        },
        function (e) {
            // 调用接口异常的回调函数
            console.log('failed ', e)
        })
}

export const share = () => {
    // 唤起 APP 的分享面板
    PALifeOpen.share(
        {
            title: '分享标题',
            content: '分享内容描述',
            extention: 'http://wuhan.90hub.com/', // 分享页面的链接地址
            imageUrl: 'https://elis-ecocdn.pingan.com.cn/lilith/rsrc/logo.png',
            shareTypes: 'WXHY|WXPYQ|XLWB|DX' // 分享渠道，以"|"为分隔符。WXHY:微信好友;WXPYQ:微信朋友圈;XLWB:新浪微博;DX:短信。
        },
        function success(rsp) {
            // alert(JSON.stringify(rsp))
        },
        function error(e) {
            // alert('share error')
        }
    )
}

export const logInit = () => {
    PALifeOpen.config({ debug: false, isProd: true })
    PALifeOpenH5.config({ debug: false, isProd: true, autoMergeRecord: true })
}

export const logEnter = () => {
    const a = [
        { event: "704-20200202-yq", label: "704-20200202-yq" },
        { event: "705-20200202-yq", label: "705-20200202-yq" },
        { event: "708-20200202-yq", label: "708-20200202-yq" },
    ]
    a.map(i => {
        PALifeOpenH5.addRecord(i.event, i.label)
        track(i.event, i.label)
    })
}

export const logContent = (id: string) => {
    PALifeOpenH5.addRecord("705-20200202-yq", `705-20200202-${id}-yq`)
    track("705-20200202-yq", `705-20200202-${id}-yq`)
}
