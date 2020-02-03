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
        const random = Math.floor(Math.random() * 3);
        const text = data[random];
        const elm = document.createElement('span')
        const group = document.getElementById("danmu-group")

        elm.className = "danmu-item"
        elm.innerHTML = text
        if (group) {
            group.appendChild(elm)
            // setTimeout(() => {
            // }, random * 500)
            setTimeout(() => {
                if (group) {
                    group.removeChild(elm)
                }
            }, 2000)
        }
    }, 2000)
    return (
        <View className="danmu-container">
            <View className="danmu-group" id="danmu-group">
                {/* {list.map((i, index) => (
                    <View className="danmu-item" key={index}>
                        {i}
                    </View>
                ))} */}
            </View>
        </View>
    )
}