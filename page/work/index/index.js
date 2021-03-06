var app = getApp()

Page({
  data: {
    //管理应用
    listContent: [
      // {
      //   "icon": "/image/nothing.png",
      //   "text": "发布任务"
      // },
      // {
      //   "icon": "/image/manage.png",
      //   "text": "管理奖扣"
      // },
      // {
      //   "icon": "/image/scoreList.png",
      //   "text": "奖扣日志"
      // }
    ],
    //日常应用
    listMain: [],

    hidden: true,
    data: {},

    count: 0, // 任务数量标识
  },
  onShow() {
    console.log('level', app.globalData.level)
    if (app.globalData.level != 'common' && app.globalData.level != 'admin' && app.globalData.level != 'competentLevel') {
      //管理者账号登陆
      this.setData({
        hidden: false
      })

      dd.httpRequest({
      url: app.globalData.domain + '/deskIcon/find',
      method: 'POST',
      dataType: 'json',
       data: {
         type: 1, 
      },
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}
        console.log('successDesk1----', res)

        var listContent = []
        var lists = res.data.data
        lists.forEach((item) => {
          item.icon = item.yyImg
          item.text = item.yyTitle

          listContent.push(item)
        })
        this.setData({
          listContent: listContent
        })
      },
      fail: (res) => {
        console.log("httpRequestFailDesk----", res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});

      },
      complete: () => {
      }
    })
    }

    dd.httpRequest({
      url: app.globalData.domain + '/task/selectTaskNum',
      method: 'GET',
      dataType: 'json',
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}

        console.log('successNum----', res)
        this.setData({
          count: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailNum----", res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});

      },
      complete: () => {
      }
    })

    dd.showLoading({content: '加载中...'})
    dd.httpRequest({
      url: app.globalData.domain + '/work/countLogNun',
      method: 'POST',
      dataType: 'json',
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}

        console.log('successWork----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailWork----", res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});

      },
      complete: () => {
        dd.hideLoading()
      }
    })

    // 员工动态图标 type: 0, 
    dd.httpRequest({
      url: app.globalData.domain + '/deskIcon/find',
      method: 'POST',
      dataType: 'json',
       data: {
         type: 0, 
      },
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}
        console.log('successDesk0----', res)

        var listMain = []
        var lists = res.data.data
        lists.forEach((item) => {
          item.icon = item.yyImg
          item.text = item.yyTitle

          listMain.push(item)
        })
        this.setData({
          listMain: listMain
        })
      },
      fail: (res) => {
        console.log("httpRequestFailDesk----", res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});

      },
      complete: () => {
      }
    })

    this.getTopImage()
  },

  onContentClick(e) {
    console.log(e.detail)

    switch (e.detail.index) {
      case 1:
        dd.navigateTo({url: '../take/index'})
        break;
      case 0:
        dd.navigateTo({url: '../publish/index'})
        break;
      case 2:
        // dd.alert({ content: '正在测试，敬请期待', buttonText: '确定' })
        dd.navigateTo({url: '../leaderRewardList/index'})
        break;
      case 3:
        break;
    }
  },
  onMainClick(e) {
    console.log(e.detail)

    switch (this.data.listMain[e.detail.index].text) {
      case '申报积分':
        dd.navigateTo({url: '../declare/index'})
        break;
      case '积分商城':
        dd.navigateTo({url: '../market/index'})
        break;
      case '自由奖励':
        dd.navigateTo({ url: '../award/index' })
        break;
      case '积分抽奖':
        // dd.navigateTo({ url: '../levelTest/index' })
        break;
      case '水平考核':
        dd.navigateTo({ url: '../levelTest/index' })
        break;
      case '爱心点赞':
        dd.navigateTo({ url: '../like/index' })
        break;
      case '悬赏任务':
        dd.navigateTo({ url: '../bounty/index' })
        break;
      case '积分申诉':
        dd.navigateTo({ url: '../callto/index' })
        break;
      case '积分支票':
        dd.navigateTo({ url: '../praise/index' })
        break;
    }
  },
  logs() {
    dd.navigateTo({ url: './logs/index' })
  },
  wait() {
    dd.navigateTo({ url: './wait/index' })
  },
  initiate() {
    dd.navigateTo({ url: './from/index' })
  },
  copy() {
    dd.navigateTo({ url: './to/index' })
  },
  getTopImage(){
    dd.httpRequest({
      url: app.globalData.domain + '/home/picture',
      method: 'POST',
      dataType: 'json',
      data: {
        location: 1  //location 0:首页，1:工作台，2：积分商城
      },
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}
        console.log('successWorkTopImage----', res)
        if(res.data.data.list.length > 0){
          this.setData({
            topImage: res.data.data.list[0].picUrl
          })
        }
      },
      fail: (res) => {
        console.log('failWorkTopImage---', res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});

      },
      complete: () => {
        
      }
    })
  }
})