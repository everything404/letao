$.ajax({
	url: '/user/queryUserMessage',
	type: 'get',
	// 将异步改为同步
	async: false,
	success: function(res) {
		if(res.error && res.error === 400) {
			location.href = 'login.html'
		} 
	}
})
$(function() {
  getAddress()
})

/**
 * 查询用户的收货地址
 */

function getAddress() {
	$.ajax({
 		url: '/address/queryAddress',
 		type: 'get',
 		success: function(res) {
 			let html = template('template', {
 				result: res
 			})
 			$('#address-list').html(html)
 		}
	})
}