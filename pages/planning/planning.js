const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    travelInfo: null,
    planning: null
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    this.setData({travelInfo: app.globalData.travelInfo

    });
    // this.setData({travelInfo: {
    //   "cityid": 163,
    //   "cityname": "南昌",
    //   "location": {
    //     "lng": 115.85794026163,
    //     "lat": 28.682020207417
    //   },
    //   "star": "5",
    //   "url": "http://lvyou.baidu.com/nanchang",
    //   "abstract": "特色美食很多，美味滋补的瓦罐汤、地道的米粉肉，让人胃口大开。",
    //   "description": "南昌，又名豫章、洪城，为江西省省会，全省政治、经济、文化、科技、交通中心。南昌地处江西省中部偏北，赣江、抚河下游，滨临鄱阳湖。南昌既是国家历史文化名城，又是革命英雄城市。 南昌自然风光秀丽，人文景观众多，拥有各类景观六大类538个单体，列入国家、省、市级重点文物保护单位50余处，拥有国家级森林公园一个、国家级重点风景名胜区一个。1986年被国务院命名为历史文化名城。 南昌城区非常繁华，位于市中心的八一广场绿草如茵；屹立在广场南端的八一南昌起义纪念塔，成为南昌革命历史的丰碑。南昌周边地区有著名的世界文化遗产庐山风景名胜区，鄱阳湖候鸟保护区、龙虎山国家风景名胜区、井冈山国家风景名胜区、三清山国家风景名胜区，使南昌成为前往江西旅游的必经之地。",
    //   "itineraries": 
    //   [
    //    {
    //     "name": "二日游",
    //     "description": "一日游览市内景点，一日去近郊的梅岭风景区，体味南昌的自然风光。",
    //     "itineraries": [{
    //       "path": [{
    //         "name": "滕王阁",
    //         "detail": "http://api.map.baidu.com/telematics/v3/travel_attractions?id=tengwangge&output=json&ak=TueGDhCvwI6fOrQnLM0qmXxY9N0OkOiQ"
    //       }, {
    //         "name": "佑民寺",
    //         "detail": "http://api.map.baidu.com/telematics/v3/travel_attractions?id=youminsi&output=json&ak=TueGDhCvwI6fOrQnLM0qmXxY9N0OkOiQ"
    //       }, {
    //         "name": "百花洲",
    //         "detail": "http://api.map.baidu.com/telematics/v3/travel_attractions?id=baihuazhou&output=json&ak=TueGDhCvwI6fOrQnLM0qmXxY9N0OkOiQ"
    //       }, {
    //         "name": "南昌起义纪念馆",
    //         "detail": "http://api.map.baidu.com/telematics/v3/travel_attractions?id=nanchangqiyijinianguan&output=json&ak=TueGDhCvwI6fOrQnLM0qmXxY9N0OkOiQ"
    //       }, {
    //         "name": "八一广场",
    //         "detail": "http://api.map.baidu.com/telematics/v3/travel_attractions?id=bayiguangchang&output=json&ak=TueGDhCvwI6fOrQnLM0qmXxY9N0OkOiQ"
    //       }, {
    //         "name": "绳金塔",
    //         "detail": "http://api.map.baidu.com/telematics/v3/travel_attractions?id=shengjinta&output=json&ak=TueGDhCvwI6fOrQnLM0qmXxY9N0OkOiQ"
    //       }],
    //       "description": "早饭后从滕王阁开始南昌市内一天的旅行。登上滕王阁，远眺之际轻吟《滕王阁序》，相信别有一番体验。 参观完乘27、30路到民德路中段的佑民寺，这是南昌市内唯一一座完整的寺庙。出寺步行至东湖百花洲，体味“豫章十景”中的 “东湖夜月”和“苏圃春蔬”，赏自然景观之精华。 午饭后乘坐1、2路返市中心区的八一广场，参观游览八一南昌起义纪念塔、八一南昌起义纪念馆，搭乘2路、7路、18路可至。 最后，乘坐30路公交车至绳金塔，这里是市内最高的古建筑，晚上灯火通明之时更加热闹。",
    //       "dinning": "中午可以在百花洲附近吃饭，也可以到八一广场周围吃饭，这两处都是市内比较繁华的地方，有很多饭店可供选择。 晚上在绳金塔小吃街品尝小吃，又能填饱肚子，又能尝到当地特色，是不错的选择。",
    //       "accommodation": "一天的景点都在南昌市区，因此可以随自己的喜好，选择一个舒服的地方住下，八一广场附近、东湖公园附近或者绳金塔周边都有不少宾馆可以选择。"
    //     }, {
    //       "path": [{
    //         "name": "梅岭",
    //         "detail": "http://api.map.baidu.com/telematics/v3/travel_attractions?id=meiling&output=json&ak=TueGDhCvwI6fOrQnLM0qmXxY9N0OkOiQ"
    //       }],
    //       "description": "梅岭素有“小庐山”之称，风景名胜区内经典人文景观众多，就算只呆在梅岭主峰的洗药湖度假村休息，也会让你远离城市身心舒畅。",
    //       "dinning": "因为在外面的景区，所以可以午饭自备吧，在山上找个舒服的地方边吃边欣赏风景也不错。晚上回到市区再大吃一顿然后结束愉快的南昌两日游吧！",
    //       "accommodation": ""
    //     }]
    //   }]
    // }//end 

    // });

    if (this.data.travelInfo.itineraries.length > 0){
       this.setData({
          planning: this.data.travelInfo.itineraries[0].itineraries
       });
    }else{
        this.setData({
          planning: {}
       });
    }
   

  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})