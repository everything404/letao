/**
 * 检测用户是否登录
 * 
 */
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
 getVcode()
 changePass()
})

/**
 * 获取验证码
 * @return {[number]} 六位的数字
 */
function getVcode() {
	$('#vcode-btn').on('tap', function() {
    let num = 60
		let interVal = setInterval(() => {

			if (num > 0) {
				num--
				$(this).css('pointer-events', 'none')
			}else {
				clearInterval(interVal)
				$(this).text('点击获取验证码').css('pointer-events', 'auto')
			}
    }, 1000)
	$.ajax({
		url: '/user/vCodeForUpdatePassword',
		type: 'get',
		success: (res) => {
			$(this).text(res.vCode)
		}

	})
	})
}

/**
 * 修改密码
 * 1. 获取修改密码按钮并添加点击事件
 * 2. 获取用户输入的信息
 * 3. 对用户输入的信息进行校验
 * 4. 调用修改密码接口
 * 5. 修改成功跳转登录页面，重新登录
 */
function changePass() {
	$('#change-btn').on('tap', function() {
		let originPass = $.trim($("[name='originPass']").val())
		let newPass = $.trim($("[name='newPass']").val())
		let againpass = $.trim($("[name='againpass']").val())
		let vCode = $.trim($("[name='vCode']").val())
		let code = $.trim($('#vcode-btn').text())
		
		if(!originPass || originPass.length < 6 || originPass.length > 12) {
			mui.alert('原密码不正确')
			return
	  }
	  if(!newPass || newPass.length < 6 || newPass.length > 12) {
	  	mui.alert('新密码格式不正确')
	  	return
	  }

	  if(newPass && againpass && newPass !== againpass) {
	  	mui.alert('两次密码不一致')
			return
	  }
	  if(!vCode && vCode.length < 6) {
	  	mui.alert('请输入正确的验证码')
			return
	  }
	  if(code !== vCode) {
	  	mui.alert('验证码不正确')
	  	return
	  }
	  $.ajax({
	  	url: '/user/updatePassword',
	  	type: 'post',
	  	data: {
	  		oldPassword: originPass,
	  		newPassword: newPass,
	  		vCode: vCode
	  	},
	  	success: function(res) {
	  		if(res.error && res.error === 403) {
	  			mui.alert(res.message)
	  			return
	  		}

	  		mui.alert('修改密码成功', function() {
	  			location.href = 'login.html'
	  		})
	  	}
	  })
	})
}

/**
 * 返回上一页
 */

