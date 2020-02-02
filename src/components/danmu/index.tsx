import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { useInterval } from '../../utils/useInterval'
import "./style.scss"

const data = [
    "向一线的勇士致敬",
    "不信谣，不传谣，我为中国加油",
    "一切安好！大家都要好好的",
]

export const Danmu = () => {
    const [list, setList] = useState(["向一线的勇士致敬"] as string[])
    useInterval(() => {
        const index = Math.floor(Math.random() * 4);
        const text = data[index];
        setList([text]);
    }, 1500)
    return (
        <View className="danmu-container">
            <View className="danmu-group">
                {data.map((i, index) => (
                    <View className="danmu-item" key={index}>
                        {i}
                    </View>
                ))}
            </View>
        </View>
    )
}