/**
 * 检测用户是否登录
 *
 */
	$.ajax({
		url:'/employee/checkRootLogin',
		type:'get',
		async: false,
		success:function(res){

			if(res.success){

				location.href = "user.html";

			}

		}
	})
$(function() {
	loGin()
})
/**
 * 登录
 * 1. 获取登录按钮并添加点击事件
 * 2. 获取用户输入的表单信息
 * 3. 对用户输入的表单信息进行验证
 * 4. 调用登录接口实现登录
 * 5. 登录成功，跳转到用户管理界面
 */
function loGin() {
	$('#loginBtn').on('click', function() {
		// 属性选择器
		let username = $.trim($("[name='username']").val()) 
		let password = $.trim($("[name='password']").val())
		if(!username) {
			let html = `<div class="alert alert-warning">请输入用户名</div>`
			$('#title').append(html)

		}
		if(!password) {
			let html = `<div class="alert alert-warning">请输入密码</div>`
			$('#title').append(html)
		}

		$.ajax({
			url: '/employee/employeeLogin',
			type: 'post',
			data: {
				username: username,
				password: password
			},
			success: function(res) {
				if(res.error && res.error === 1000) {
					let html = `<div class="alert alert-warning">密码或用户名错误</div>`
					$('#title').append(html)
				} else {
					location.href = 'user.html'
				}
				
			}

		})
	})
}