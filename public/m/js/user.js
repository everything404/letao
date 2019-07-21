let userinfo = null

/**
 * 检测用户是否登录
 * 
 */
$.ajax({
  url: '/user/queryUserMessage',
  type: 'get',
  success: function(res) {
    if(res.error && res.error === 400) {
      mui.alert('未登录', function() {
        location.href = 'login.html'
        return
      })
    } 
    if(!res.isDelete) {
        mui.alert('账号有问题，请联系客服', function() {
          location.href = 'login.html'
          return
        })
      }
    userinfo = res
  }
})
$(function() {
  /**
   * 退出登录
   * 1. 获取退出登录按钮并添加点击事件
   * 2. 调用接口，告知用户退出成功，如果退出成功，跳转到首页
   */
  $('#logout-btn').on('tap', function() {
  	$.ajax({
  		url: '/user/logout',
  		type: 'get',
  		success: function(res) {
  			if(res.success) {
  				mui.alert('退出成功', function() {
  					location.href = 'index.html'
  				})
  			}
  		}
  	})
  })

  let html = template('ltuserinfo', {
    userinfo: userinfo || {}
  })
  $('#userinfo-list').prepend(html)
})