import Taro from '@tarojs/taro'

export const httprequest = (url: string): Promise<any> => {
    return Taro.request({
        url: 'http://wh.hellofqs.com' + url
    }).then(res => res.data.data)
}
