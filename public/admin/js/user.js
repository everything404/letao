$(function(){

// 获取用户列表
getUserList()
// 更新用户状态
upDateUser()
});
/**
 * 获取用户列标
 *
 */
function getUserList() {
	$.ajax({
		url: '/user/queryUser',
		type: 'get',
		data: {
			page: 1,
			pageSize: 5
		},
		success: function(res) {
			let data = res.rows
		  let html = template('userTpl', {
		  	data: data
		  })
		  $('#user-wrapper').html(html)
		}
	})
}
/**
 * 更新用户状态
 * 1. 获取操作按钮，并添加点击事件
 * 2. 判断当前操作是启用操作还是禁用操作
 * 3. 根据当前操作，调用不同接口，传递不同参数
 * 4. 刷新页面
 */
function upDateUser() {
	$('#user-wrapper').on('click', '#deleteBtn', function() {
		let isDelete = $(this).attr('data-isDelete')
		let id = $(this).attr('data-id')
	
		$.ajax({
			url: '/user/updateUser',
			type: 'post',
			data: {
				id: id,
				isDelete: parseInt(isDelete) === 1 ? 0 : 1
			},
			success: function(res) {
				if(res.success) {
					$('#message').css('display', 'block').text('操作成功')
					location.reload()
				}
			}
		})
	})
}
