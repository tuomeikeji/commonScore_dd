var app = getApp()

Page({
  data: {
    options: {},
    loading: false,
    disabled:false,
    items: [],
    levelId: "", //大题id
    shenQingFangShi: "", //申请方式 
    testStatus: "0", //是否已考核 
    assName: "",
    answerArr: []
  },

  onLoad(options) {
    console.log("上一级页面链接中带的参数",options)
    this.setData({
      levelId: options.levelId,
      assName: options.assName,
      shenQingFangShi: options.shenQingFangShi,
      testStatus: options.testStatus
    })
    
  },
  onShow() {
   dd.httpRequest({
      url: app.globalData.domain + '/Leveltitle/LevelTitleController/' + this.data.levelId,
      method: 'POST',
      dataType: 'json',
      data:{
        levelId : this.data.levelId,
        shenQingFangShi: this.data.shenQingFangShi,
        pageNum: 1,
        pageSize: 100
      },
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}

        console.log('successLevelDetails----', res)
        this.setData({
          'items': res.data.data.list
        })
      },
      fail: (res) => {
        console.log("httpRequestFailApps----", res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});

      }
    })
  },
  
  formSubmit(e) {
    console.log('formSubmit----', e.detail.value)

    this.setData({
      loading: true,
      disabled:true
    })

    var radioGroupJson = e.detail.value
    var radioGroupArr = []

    for (var prop in radioGroupJson) {
      var tIndex = radioGroupJson[prop].split("_")[0]
      var tId = radioGroupJson[prop].split("_")[1]

      var radioSingleAnswer = {"tEnd":tIndex,"tId":tId}
      radioGroupArr.push(radioSingleAnswer)
      
      this.setData({
        answerArr :radioGroupArr
      })
    }

    dd.httpRequest({
      url: app.globalData.domain + '/Leveltitle/servehotselectiveajax',
      method: 'POST',
      dataType: 'json',
      headers:{'Content-Type': 'application/json;charsetset=UTF-8'},
      data:JSON.stringify({
        modifyArr: this.data.answerArr,
        levelId: this.data.levelId,
        shenQingFangShi: this.data.shenQingFangShi
      }),
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}

        console.log('successApp----', res)
        dd.alert({
          title: '',
          content: '提交成功',
	        buttonText:"确定",
          success: () => {
              dd.navigateBack()
          }
        })
        
      },
      fail: (res) => {
        console.log("httpRequestFailApp----", res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});
      },
      complete: () => {
        this.setData({
          loading: false,
          disabled:false
        })
      }
    })
  }
})