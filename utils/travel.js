const apiURL = 'https://api.map.baidu.com/telematics/v3/travel_city?&ak=TueGDhCvwI6fOrQnLM0qmXxY9N0OkOiQ&output=json'


const app = getApp()
//获取推荐信息
const getTravelInfo = (params) =>{
	var location =  that.data.interestRegion[1];

    wx.request({
      url: 'https://api.map.baidu.com/telematics/v3/travel_city?&ak=TueGDhCvwI6fOrQnLM0qmXxY9N0OkOiQ&output=json&location=' + params.location,
      method: "GET",
      success(res) {
          console.log(res);
          app.globalData.rawRes = res.data.result;
      },
      fail(res) {
          console.log("Fail");
          console.log(res);
      },
      complete(res) {
        console.log("Complete");
      } 

    });
}
     