/**
 * 1. 给注册按钮添加点击事件
 * 2. 后去到用户注册的信息
 * 3. 对用户输入的信息进行验证
 * 4. 调用注册接口，实现注册
 * 5. 给出提示，告诉用户是否注册成功
 * 6. 跳转到登录页面
 */ 
$(function() {
	// 注册验证
	getRegister()
	getVcode()

})

/**
 * 获取验证码
 * @return {[type]} [description]
 *
 * 1. 给互殴验证码绑定点击事件
 * 2. 调用接口获取验证码
 * 3. 将验证码输出到控制台
 * 
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


/**
 * 获取验证码
 * @return {[number]} 六位的数字
 */
function getRegister() {
		$('#regi-btn').on('tap', function() {
		let username = $('[name="username"]').val()
		let mobile = $('[name="mobile"]').val()
		let password = $('[name="password"]').val()
		let againpass = $('[name="againpass"]').val()
		let vCode = $('[name="vCode"]').val()
		let code = $("#vcode-btn").text()
	  if (!username || username.length < 6 || username.length > 12) {
			mui.alert('请正确输入用户名')
			return
	  }
	  if(!password || password.length < 6 || password.length > 12) {
			mui.alert('请正确输入密码')
			return
	  }
	  if(!mobile || mobile.length < 11) {
	  	mui.alert('请输入合法的手机号码')
			return
	  }
	  if(!againpass) {
	  	mui.alert('请输入确认密码')
	  	return
	  }
	  if(password && againpass && password !== againpass) {
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
	  	url: '/user/register',
	  	type: 'post',
	  	data:{
	  		username: username,
	  		password: password,
	  		mobile: mobile,
	  		vCode: vCode
	  	},
	  	success: (res) => {
	  	 if(res.error) {
	  	 		mui.alert(res.message)
	  	 } else {
	  	 		mui.alert('注册成功' , function() {
	  	 			// 跳转到登录页面
	  	 			location.href = 'login.html'
	  	 		})
	  	 		
	  	 }
	  	}
	  })
	})
}

