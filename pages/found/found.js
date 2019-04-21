// 定位以及发现去处
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');


var qqmapsdk = new QQMapWX({
  key: 'WXMBZ-25YCW-I7PRJ-OMPRS-FUMTV-GVFJN'
});

const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    planingDays: 1,
    suggestion:{
      sceneTitle: "test"
    },
    isMapDisplay: true,
    location: '',
    markers: [],
    region: [],
    travelInfo: {}
  },
  //弹出窗口和隐藏窗口
  showModal(e) {
    this.setData({
      isMapDisplay: false,
      modalName: e.currentTarget.dataset.target
    });
  },
  hideModal(e) {
    this.setData({
      isMapDisplay: true,
      modalName: null
    });
  },
  //游玩天数处理
  radioChange(e){
    this.data.planingDays = e.detail.value;
    console.log('radio发生change事件，携带value值为：', e.detail.value);
  },
  //带参跳转
  toTravel(){
    this.hideModal();
    app.globalData.travelInfo = this.data.travelInfo;
    console.log("trans data to global");

    wx.navigateTo({
      url: '../planning/planning'
    });

  },
  RegionChange(event){
    console.log("改变地区");
    console.log(event);
    this.setData({
      region: event.detail.value
    });
    this.getTravelInfo();
  },
  getTravelInfo () {

    var _this = this;
    var location = this.data.region[1] || '南昌';
    var day = this.data.planingDays || "2";
    wx.request({
      url: 'https://api.map.baidu.com/telematics/v3/travel_city?&ak=TueGDhCvwI6fOrQnLM0qmXxY9N0OkOiQ&output=json&location=' + location + "&day=" + _this.data.planingDays,
      method: "GET",
      success(res) {
          console.log(res);
          if (res.data.error < 0){
            console.log(res);
          }else if (res.data.status == 1){
              console.log("服务器内部错误");
          }else{
            _this.setData({
              travelInfo: res.data.result
            });
          }
          
      },
      fail(res) {
          console.log("Fail");
          console.log(res);
      },
      complete(res) {
        console.log("Complete");
      } 

    });
},
  /**
  * Lifecycle function
  */
  onLoad: function (options) {
    var _this = this;
    //刷新地图
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        _this.setData({
          "latitude": res.latitude,
          "longitude": res.longitude
        });
      }
    })

    //判断位置
    qqmapsdk.reverseGeocoder({
      //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
      //get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
      success: function (res) {//成功后的回调
        console.log("Location: ");
        var res = res.result;
        console.log(res);

        var mks = [];
        //设置当前位置为兴趣点
        _this.setData({
          region: [res.address_component.province, res.address_component.city, res.address_component.district]
        });        
        //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
        mks.push({ // 获取返回结果，放到mks数组中
          title: res.ad_info.district,
          id: 0,
          latitude: res.ad_info.location.lat,
          longitude: res.ad_info.location.lng,
          iconPath: '/images/paper-plane.png',//图标路径
          width: 20,
          height: 20
        });
        _this.setData({ markers: mks })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log("Complete");
        // console.log(res);
      }
    })//QQ Map

    // this.setData({travelInfo:
    //     {
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
    //   "itineraries": [{
    //     "name": "一日游",
    //     "description": "南昌一日游，自然景观、历史文化遗迹最完美的结合。",
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
    //       "description": "早饭后从滕王阁开始南昌市内一天的旅行。登上滕王阁，远眺之际轻吟《滕王阁序》，相信别有一番体验。 参观完乘27、30路到民德路中段的佑民寺，这是南昌市内唯一一座完整的寺庙。出寺步行至东湖百花洲，体味“豫章十景”中的 “东湖夜月”和“苏圃春蔬”，赏自然景观之精华。 午饭后乘坐1、2路返市中心区的八一广场，参观游览八一南昌起义纪念塔、八一南昌起义纪念馆，搭乘2路、7路、18路可以到达。 最后，乘坐30路公交车至绳金塔，这里是市内最高的古建筑，晚上灯火通明之时更加热闹。",
    //       "dinning": "中午可以在百花洲附近吃饭，也可以到八一广场周围吃饭，这两处都是市内比较繁华的地方，有很多饭店可供选择。 晚上在绳金塔小吃街品尝小吃，又能填饱肚子，又能尝到当地特色，是不错的选择。",
    //       "accommodation": "一天的景点都在南昌市区，因此可以随自己的喜好，选择一个舒服的地方住下，八一广场附近、东湖公园附近或者绳金塔周边都有不少宾馆可以选择。"
    //     }]
    //   }, {
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

    this.getTravelInfo();



  },
  onShow: function () {
    
  },
})

