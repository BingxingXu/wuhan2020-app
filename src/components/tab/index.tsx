import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Tabs, { TabPane } from "rc-tabs";


export const Tab = () => {
    return (
        <Tabs defaultActiveKey="2">
            <TabPane tab="tab 1" key="1">first</TabPane>
            <TabPane tab="tab 2" key="2">second</TabPane>
            <TabPane tab="tab 3" key="3">third</TabPane>
        </Tabs>
    )
}
