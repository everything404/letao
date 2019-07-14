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
	// 获取收货地址列表
  getAddress()
  // 删除收货地址
  deleteAddress()
  // 编辑收货地址
  eidtAddress()
})

/**
 * 查询用户的收货地址
 */
// 存储收货地址
let address = null
function getAddress() {
	$.ajax({
 		url: '/address/queryAddress',
 		type: 'get',
 		success: function(res) {
 			address = res
 			let html = template('template', {
 				result: address
 			})
 			$('#addressList').html(html)
 		}
	})
}

/**
 * 删除收货地址
 * 1. 给删除按钮添加点击事件
 * 2. 弹出一个删除确认框提示
 * 3. 用户若确认删除就调用删除接口，完成删除功能, 刷新当前页面，取消删除就关闭删除确认框提示
 */
function deleteAddress() {
	// 因为收货地址列表是通过art-template 模板渲染出来的 所以不能给删除按钮添加 id 然后通过添加点击事件，只能通过事件委托的方式来实现删除功能
  $('#addressList').on('tap', '.delete-btn', function() {
  	// getAttribute HTML DOM 方法 --- 获取元素自定义属性
  	let id = this.getAttribute('data-id')
  	// 原生方式获取 li 节点
  	let li = this.parentNode.parentNode
  	mui.confirm('确认要删除吗？', function(result) {
  		// 确认删除
  		if(result.index === 1) {
  			$.ajax({
  				url: '/address/deleteAddress',
  				type: 'post',
  				data: {
  					id: id
  				},
  				success: function(res) {
  					if(res.success) {
  						getAddress()
  					}
  				}
  			})
  		} else {
  			// 取消删除
  			// 关闭滑出效果
  			mui.swipeoutClose(li)
  		}
  	})
  })
}

/**
 * 编辑收货地址
 * 1. 给编辑按钮添加点击事件
 * 2. 跳转到编辑页面，把原来旧的信息传递到编辑页面，供用户修改
 * 3. 给确认按钮添加点击事件
 * 4. 调用编辑按钮，完成编辑功能，弹出提示框，提示用户编辑成功
 * 6. 跳转收货列表页面
 */
function eidtAddress() {
 $('#addressList').on('tap','.eidt-btn', function() {
 		let id = this.getAttribute('data-id')
 		for(let i = 0; i < address.length; i++) {
 			if(address[i].id === parseInt(id) ) {
 				localStorage.setItem('ltAddress', JSON.stringify(address[i]))
 				break // 找到后终止循环
 			}
 		}
 		// 这样跳转不了， 因为在html 结构中阻止的跳转 ， 要把HTML 结构中的 a标签 改成span标签
 		location.href = 'increadderss.html?isEdit=1'
 })
}