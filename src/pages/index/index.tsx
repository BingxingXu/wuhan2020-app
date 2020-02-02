import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text, Canvas } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtCurtain, AtDivider, AtTabBar, AtIcon, AtMessage, AtTabs, AtTabsPane, AtButton, AtActionSheet, AtActionSheetItem, AtCard, AtList, AtListItem, AtAccordion } from 'taro-ui'
import { CommonEvent } from '@tarojs/components/types/common'
import { format } from 'date-fns';

import './index.scss'
import { Barrage } from '../../components/barrage';
import { Area } from '../../components/table';
import { Loading } from '../../components/loading';
import { Danmu } from '../../components/danmu';
import { logEnter, share, logContent, logLipei, logBaoquan, logWenzhen, logQifu } from '../../utils/log';
import { isWeixin } from '../../utils/common';
import { CountTotal, News } from '../../store/types.d';

type PageStateProps = {
  indexStore: {
    currentTab: number,
    tabList: { title: string; }[],
    isActionOpen: boolean,
    banners: string[],
    actionList: [string],
    newsList: News[],
    loading3: boolean,
    loading4: boolean,
    sticky: boolean,
    countTotal: CountTotal,
    openShare: boolean,
    setLoading3: (v: boolean) => {},
    setLoading4: (v: boolean) => {},
    init: () => {},
    setCurrentTab: (index: number, event: CommonEvent) => {},
    openAction: () => {},
    closeAction: () => {},
    setSticky: (v: boolean) => {}
    setOpenShare: (v: boolean) => {}
  }
}

interface Index {
  props: PageStateProps;
}

@inject('indexStore')
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentWillReact() {
  }

  componentDidMount() {
    this.props.indexStore.init();
    // this.initBarrage();
    this.stickHead();
    logEnter();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleClickAction = () => {
    Taro.atMessage({
      'message': '发送成功',
      'type': 'success',
    })
  }

  onLoadMap = () => { }

  initBarrage = () => {
    let barrage = new Barrage('canvas');
    barrage.draw();

    const textList = ['弹幕', '666', '233333333',
      'javascript', 'html', 'css', '前端框架', 'Vue', 'React',
      'Angular', '测试弹幕效果'
    ];

    textList.forEach((t) => {
      barrage.shoot(t);
    })
  }

  stickHead = () => {
    const { indexStore: { setSticky } } = this.props
    document.onscroll = function () {
      var distance = document.body.scrollTop || document.documentElement.scrollTop;
      if (distance > 345) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
  }

  navigate = (url: string) => {
    Taro.navigateTo({
      url
    })
  }

  onClickTab = (i: number, e: CommonEvent) => {
    var distance = document.body.scrollTop || document.documentElement.scrollTop;
    if (distance > 345) {
      window.scrollTo(0, 346);
    }
    this.props.indexStore.setCurrentTab(i, e)
  }

  onClickShare = () => {
    share()
    this.props.indexStore.setOpenShare(true)
  }

  onClickNews = (i: News) => {
    this.navigate(i.url);
    logContent(i.sourceId);
  }

  render() {
    const { indexStore: { currentTab,
      tabList, setCurrentTab, isActionOpen,
      openAction, closeAction, actionList,
      newsList, banners, setLoading3, loading3,
      sticky, countTotal,
      openShare, setOpenShare
    } } = this.props
    return (
      <View style={{ width: "100%", overflowX: "hidden" }}>
        <AtMessage />
        <Danmu />
        <Swiper
          className="banner"
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
        >
          {banners.map((i, index) =>
            <SwiperItem key={index}>
              <Image
                src={'//' + i}
                mode="aspectFill"
                lazyLoad
                className="banner-img"
              />
            </SwiperItem>
          )}
        </Swiper>
        <View className="banner-btns">
          <View onClick={() => {
            this.navigate("https://pingan.com/lpba")
            logLipei();
          }}>
            <Image src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon1.png" />
            <Text>理赔服务</Text>
          </View>
          <View onClick={() => {
            this.navigate("https://pingan.com/qbfw")
            logBaoquan();
          }}>
            <Image src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon2.png" />
            <Text>保全服务</Text>
          </View>
          <View onClick={() => {
            this.navigate("https://pingan.com/kjbd")
            logWenzhen();
          }}>
            <Image src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon3.png" />
            <Text>健康问诊</Text>
          </View>
          {/* <View>
            <Image
              style={{
                marginTop: "16px",
                marginBottom: "4px"
              }}
              src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon4-1.png" />
            <Text>医护人员险</Text>
          </View> */}
        </View>
        <View className="banner-hints">
          <Text>疫情严峻，减少人员聚集，平安人寿为您提供线上自助服务</Text>
        </View>
        {/* 按钮 */}
        {sticky ? <AtTabBar
          className="sticky-header"
          backgroundColor='#287FFC'
          color='#fff'
          tabList={tabList}
          onClick={this.onClickTab}
          current={currentTab}
        /> : null}
        {/* tabs */}
        <AtTabs current={currentTab} tabList={tabList} onClick={setCurrentTab}>
          <AtTabsPane current={currentTab} index={0} >
            <View className="map-source">
              <Text>数据来源： 卫健委/央视新闻，更新至：2020-02-02 14:11 </Text>
            </View>
            <View className="virus-total">
              <View className="virus-col">
                <Text className="virus-number" style={{ color: "rgba(255,81,24,1)" }}>{countTotal.confirmCount}</Text>
                <Text className="virus-hint">确诊病例</Text>
              </View>
              <View className="virus-col">
                <Text className="virus-number" style={{ color: "#FF8718" }}>{countTotal.suspectCount}</Text>
                <Text className="virus-hint">疑似病例</Text>
              </View>
              <View className="virus-col">
                <Text className="virus-number" style={{ color: "#00BC56" }}>{countTotal.cure}</Text>
                <Text className="virus-hint">治愈病例</Text>
              </View>
              <View className="virus-col">
                <Text className="virus-number" style={{ color: "#666666" }}>{countTotal.deadCount}</Text>
                <Text className="virus-hint">死亡病例</Text>
              </View>
            </View>
            <AtDivider className="divider" />
            <View className="map-header">
              <img src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon6.png" />
              <Text className="title">全国疫情地图</Text>
            </View>
            <iframe
              frameborder={0}
              border="0"
              align='center'
              allowfullscreen='true'
              marginwidth="0"
              marginheight="0"
              ref="imap"
              seamless
              width="90%"
              height="1500px"
              scrolling="no"
              src="//map.90hub.com"
              className="map"
            />
            {/* <AtDivider className="divider" /> */}
            {/* <View className="virus-detail ">
              <Area />
            </View> */}
          </AtTabsPane>
          {/* 防护科普 */}
          <AtTabsPane current={currentTab} index={1}>
            <AtList>
              {newsList.length === 0 ?
                <Loading /> :
                newsList.map((i, index) =>
                  <View className="at-row news-item" onClick={() => this.onClickNews(i)}>
                    <View className="news-text">
                      <Text className="title">{i.title}</Text>
                      <Text className="hint">{i.fromName}</Text>
                    </View>
                    <img
                      className="news-img"
                      src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon7.png"
                    />
                  </View>
                )}
            </AtList>
          </AtTabsPane>
          <AtTabsPane current={currentTab} index={2}>
            <Loading />
          </AtTabsPane>
          <AtTabsPane current={currentTab} index={3}>
            <Loading />
          </AtTabsPane>
        </AtTabs>
        {/* 祈福按钮 */}
        <View className='at-row bottom-view'>
          <AtButton type='secondary' circle className="at-col at-col-3" onClick={this.onClickShare}>分享</AtButton>
          <AtButton type='primary' circle className="at-col at-col-8" onClick={() => {
            logQifu();
            openAction();
          }}>我要祈福</AtButton>
        </View>
        <AtActionSheet isOpened={isActionOpen} cancelText='取消' title='点击发送吉祥语' onClose={closeAction}>
          {actionList.map((i, index) =>
            <AtActionSheetItem
              className="action-item"
              key={index}
              onClick={this.handleClickAction}
            >
              <img src={i} />
              {/* <View className="action-item_text">
                <Text>发送</Text>
              </View> */}
            </AtActionSheetItem>
          )}
        </AtActionSheet>
        <AtDivider className="divider" />
        <View className="place-holder" />
        <AtCurtain
          isOpened={openShare}
          onClose={() => setOpenShare(false)}
        >
          <Image
            className="curtain"
            src={"https://minx.oss-cn-shanghai.aliyuncs.com/wuhan/share.png"}
          />
        </AtCurtain>
      </View>
    )
  }
}

export default Index as ComponentType
