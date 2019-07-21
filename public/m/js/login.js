$(function() {
	getVcode()
  loGin()
})

/**
 * 用户登录
 */
function loGin() {
	/**
	 * 1. 获取登录按钮，并添加点击事件
	 * 2. 获取用户输入信息的表单
	 * 3. 调用登录接口
	 * 4. 登录成功跳转到会员中心
	 * 
	 * 
	 */
	$('#login-btn').on('click', function() {
		let username = $.trim($("[name='username']").val())
		let password = $.trim($("[name='password']").val())
		let againpass = $.trim($("[name='againpass']").val())
		let vCode = $.trim($('[name="vCode"]').val())
		let code = $.trim( $('#vcode-btn').text())
		
		if (!username || username.length < 3 || username.length > 12) {
			mui.alert('请正确输入用户名')
			return
	  }
	  if(!password || password.length < 6 || password.length > 12) {
			mui.alert('请正确输入密码')
			return
	  }
	  if(password && againpass && password !== againpass) {
	  	mui.alert('两次密码不一致')
			return
	  }
	  if(!againpass) {
	  	mui.alert('请输入确认密码')
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
    	url: '/user/login',
    	type: 'post',
    	data:{
    		username: username,
    		password: password
    	},
    	beforeSend: function() {
    		$('#login-btn').text('正在登录。。。。。')
    	},
    	success: function(res) {
    		if(res.error && res.error === 403) {
    			mui.alert('密码或用户名错误')
    			return
    		}
    		mui.alert('登录中', function() {
	    		$('#login-btn').text('登录')
	    		$.ajax({
							url: '/user/queryUserMessage',
							type: 'get',
							success: function(res) {
								if(res.error && res.error === 400) {
									mui.alert('未登录', function() {
										location.href = 'login.html'
									})
								} else if(res.isDelete && !res.isDelete) {
									mui.alert('账号有问题，请联系客服', function() {
										location.href = 'login.html'
									})
						    } else {
						    		location.href = 'user.html'
						    }
							}
						})
    		})
    	}
    })

	})
}

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
		url: '/user/vCode',
		type: 'get',
		success: (res) => {
			$(this).text(res.vCode)
		}

	})
	})
}