//检测用户状态
$.ajax({
  url: '/user/queryUserMessage',
  type: 'get',
  async: false,
  success: function(res) {
    if(res.error && res.error === 400) {
      mui.alert('未登录', function() {
        location.href = 'login.html'
        return
      })
    }  
    if(res.isDelete && !res.isDelete) {
        mui.alert('账号有问题，请联系客服', function() {
          location.href = 'login.html'
          return
        })
      }
  }
})