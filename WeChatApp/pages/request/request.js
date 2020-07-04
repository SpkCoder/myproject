const config = require('../../config.js')

Page({
  makeRequest: function() {
    var self = this

    self.setData({
      loading: true
    })
    wx.request({
      url: config.loginUrl2 +'/python/user_list',
      method: "GET",
      data: {
        action:"findData",
        noncestr: Date.now()
      },
      success: function(result) {
        wx.showToast({
          title: result.data,
          icon: 'success',
          mask: true,
          duration: 2000
        })
        self.setData({
          loading: false
        })
        console.log('request success', result.data)
      },

      fail: function({errMsg}) {
        console.log('request fail', errMsg)
        wx.showToast({
          title: errMsg,
          icon: 'error',
          mask: true,
          duration: 2000
        })
        self.setData({
          loading: false
        })
      }
    })
  }
})
