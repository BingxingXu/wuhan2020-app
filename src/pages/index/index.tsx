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
import { logEnter, share, logContent, logLipei, logBaoquan, logWenzhen, logQifu, navigateUrl } from '../../utils/log';
import { isWeixin } from '../../utils/common';
import { CountTotal, News } from '../../store/types.d';
import lipei from '../../assets/images/lipei.png';
import baoquan from '../../assets/images/baoquan.png';
import mianfei from '../../assets/images/mianfei.png';
import wenzhen from '../../assets/images/wenzhen.png';
import location from '../../assets/images/loaction.png';

type PageStateProps = {
  indexStore: {
    currentTab: number,
    tabList: { title: string; }[],
    isActionOpen: boolean,
    banners: string[],
    actionList: [string],
    polularScience: News[],
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
    var p = document.getElementById('myframe');
    var onmessage = function(e){
      console.log(e)
      var data = e.data;
      //提取参数
      p.height = data || '1500px';
    }
    //监听postMessage消息事件
    if (typeof window.addEventListener != 'undefined') {
      window.addEventListener('message', onmessage, false);
    } else if (typeof window.attachEvent != 'undefined') {
      window.attachEvent('onmessage', onmessage);
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleClickAction = () => {
    this.props.indexStore.closeAction();
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
    const tabElm = document.getElementsByClassName('at-tabs__item');
    const activeTab = document.querySelector('div.at-tab-bar__item--active>div>div>div.at-tab-bar__title')
    document.onscroll = function () {
      var distance = document.body.scrollTop || document.documentElement.scrollTop;
      if (distance > 345) {
        setSticky(true)

        for (var i = 0; i < tabElm.length; i++) {
          tabElm[i].style.display = "none";
        }

      } else {
        setSticky(false)

        for (var i = 0; i < tabElm.length; i++) {
          tabElm[i].style.display = "block";
        }
      }
    }
  }

  navigate = (url: string) => {
    // window.open(url, '_blank')
    // window.location.href = url;
    // Taro.navigateTo({
    // url
    // })
    if(isWeixin()){
      window.location.href = url;
    } else {
      navigateUrl(url)
    }
  }
  wishClick = () =>{
    this.setState({

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
    // share()
    isWeixin() ? this.props.indexStore.setOpenShare(true) : share()
  }

  onClickNews = (i: News) => {
    this.navigate(i.url);
    logContent(i.id);
  }

  render() {
    const { indexStore: { currentTab,
      tabList, setCurrentTab, isActionOpen,
      openAction, closeAction, actionList,
      banners, polularScience,
      sticky, countTotal,
      openShare, setOpenShare
    } } = this.props
    console.log('tabList', tabList);
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
                src={'//' + i + '?id=2' }
                mode="aspectFill"
                lazyLoad
                className="banner-img"
              />
            </SwiperItem>
          )}
        </Swiper>
        <View className="banner-btns">
          <View onClick={() => {
            isWeixin()
              ? this.navigate("https://pingan.com/lpba")
              : this.navigate("https://m.lifeapp.pingan.com.cn/m/pss/index.html#/claim/index?claimType=newRegisterCase")
            logLipei();
          }}>
            <Image src={lipei} />
            <Text>理赔服务</Text>
          </View>
          <View onClick={() => {
            isWeixin() ?
              this.navigate("https://pingan.com/qbfw")
              :
              this.navigate("pars://pars.pingan.com/policy/manager")
            logBaoquan();
          }}>
            <Image src={baoquan} />
            <Text>保全服务</Text>
          </View>
          <View onClick={() => {
            isWeixin ?
              this.navigate("https://pingan.com/kjbd")
              :
              this.navigate("pars://pars.pingan.com/health_detail?url=https%3A%2F%2Fwww.jk.cn%2Fshop%2F%3Fapp%3DSHOUXIAN%26outBizType%3DGJK%23%2Fmarket%2F253280")
            logWenzhen();
          }}>
            <Image src={wenzhen} />
            <Text>健康问诊</Text>
          </View>
          <View className="banner-btns-icon" onClick={() => {
            isWeixin()
              ? this.navigate("https://m.lifeapp.pingan.com.cn/m/shop/index.html#/om/special/product/1024G?extInfo=%7B%22drainage%22%3A%22activityAPP%22%2C%22typeNo%22%3A%22SAT20200205%22%7D")
              : this.navigate("pars://pars.pingan.com/open_url?url=https%3A%2F%2Fm.lifeapp.pingan.com.cn%2Fm%2Fshop%2Findex.html%23%2Fom%2Fspecial%2Fproduct%2F1024G%3FextInfo%3D%257B%2522drainage%2522%253A%2522activityAPP%2522%252C%2522typeNo%2522%253A%2522SAT20200205%2522%257D&type=jssdk")
          }}>
            <Image
              src={mianfei} />
            <Text style={{textAlign:'center'}}>E路平安</Text>
          </View>
        </View>
        <View className="banner-hints">
          <Text>疫情严峻，减少人员聚集，平安人寿为您提供线上自助服务</Text>
        </View>
        {/* 按钮 */}
        {sticky ? <AtTabBar
          className="sticky-header"
          backgroundColor='#F6303B'
          color='#fff'
          tabList={tabList}
          onClick={this.onClickTab}
          current={currentTab}
        /> : null}
        {/* tabs */}
        <AtTabs current={currentTab} tabList={tabList} onClick={setCurrentTab}>
          <AtTabsPane current={currentTab} index={0} >
            <View className="map-source">
              <Text>数据来源： 卫健委/央视新闻，更新至：{format(new Date(), 'yyyy-MM-dd')} </Text>
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
              <img src={location} />
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
              id='myframe'
              name="myframe"
              allowTransparency="true"
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
              {polularScience.filter(i => i.type === 1).length === 0 ?
                <Loading /> :
                polularScience.filter(i => i.type === 1).map((i, index) =>
                  <View key={index} className="at-row news-item" onClick={() => this.onClickNews(i)}>
                    <View className="news-text">
                      <Text className="title">{i.title}</Text>
                      <Text className="hint">{i.fromName}</Text>
                    </View>
                    <img
                      className="news-img"
                      src={i.cover ? i.cover : "//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon7.png"}
                    />
                  </View>
                )}
            </AtList>
          </AtTabsPane>
          {/* 平安行动 */}
          <AtTabsPane current={currentTab} index={2}>
            {polularScience.filter(i => i.type === 2).length === 0 ?
              <Loading /> :
              polularScience.filter(i => i.type === 2).map((i, index) =>
                <View key={index} className="at-row news-item" onClick={() => this.onClickNews(i)}>
                  <View className="news-text">
                    <Text className="title">{i.title}</Text>
                    <Text className="hint">{i.fromName}</Text>
                  </View>
                  <img
                    className="news-img"
                    src={i.cover ? i.cover : "//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon7.png"}
                  />
                </View>
              )}
          </AtTabsPane>
          {/* 信息速递 */}
          <AtTabsPane current={currentTab} index={3}>
            <AtList>
              {polularScience.filter(i => i.type === 3).length === 0 ?
                <Loading /> :
                polularScience.filter(i => i.type === 3).map((i, index) =>
                  <View key={index} className="at-row news-item" onClick={() => this.onClickNews(i)}>
                    <View className="news-text">
                      <text className="title">{i.title}</text>
                      <Text className="hint">{i.fromName}</Text>
                    </View>
                    <img
                      className="news-img"
                      src={i.cover ? i.cover : "//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon7.png"}
                    />
                  </View>
                )}
            </AtList>
          </AtTabsPane>
        </AtTabs>
        {/* 祈福按钮 */}
        <View className='at-row bottom-view'>
          {isWeixin() ? <View className="at-col at-col-2" /> :
            <AtButton type='secondary' circle className="at-col at-col-3 button_share" onClick={this.onClickShare}>分享</AtButton>
          }
          <View className="at-col at-col-8 btn-primary">
            <AtButton className="button_jiayou" type='primary' circle onClick={() => {
              logQifu();
              openAction();
            }}>我要为中国战疫加油</AtButton>
            {/* <AtButton type='primary' circle circle onClick={() => {
              logQifu();
              openAction();}}>我要为中国战疫加油</AtButton> */}
            {/* <text className="btn-hint">930,010,010人参与了祈福</text> */}
          </View>
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
        {/* <Image
          className="fab"
          src="https://minx.oss-cn-shanghai.aliyuncs.com/wuhan/fab.png"
          onClick={() => this.navigate("https://b.pingan.com.cn/kuaizhan/page/brop/opt/20200131/h18372.html?campaignid=202001009017&source=Jinguanjia")}
        /> */}
        <View className="place-holder" />
        <AtCurtain
          isOpened={openShare}
          onClose={() => setOpenShare(false)}
        >
          <Image
            className="curtain"
            src={"https://minx.oss-cn-shanghai.aliyuncs.com/wuhan/share.png"}
            onClick={() => this.navigate("https://b.pingan.com.cn/kuaizhan/page/brop/opt/20200131/h18372.html?campaignid=202001009017&source=Jinguanjia")}
          />
        </AtCurtain>
      </View>
    )
  }
}

export default Index as ComponentType
