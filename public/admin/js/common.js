/**
 * 检测用户是否登录
 *
 */
	$.ajax({
		url:'/employee/checkRootLogin',
		type:'get',
		async: false,
		success:function(result){

			if(result.error && result.error == 400){

				location.href = "login.html";

			}

		}
	})

$(function(){
	
 
 // 侧栏切换
 slideToggle()


	// 登出
	logOut()






});



/**
 * 登出
 * 
 */
function logOut() {
	$('#loginOut').on('click', function() {
		$.ajax({
			url: '/employee/employeeLogout',
			type: 'get',
			success: function(res) {
				if(res.success) {
					location.href = 'login.html'
				}
			}
		})
	})
}

/**
 * 侧栏切换
 */
function slideToggle() {
		var navLi = $('.navs li')

	  navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});
}