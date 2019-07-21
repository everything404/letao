/**
 * 检测用户是否登录
 * 
 */
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
		if(!res.isDelete) {
				mui.alert('账号有问题，请联系客服', function() {
					location.href = 'login.html'
					return
				})
	    }
	}
})
// 页码数
let page = 1
// 用来修改this 指向
let that = null
// 存储页面数据
let html = ''

$(function() {
 		// 初始化上拉加载更多--同时第一次获取购物车数据
	initPullRefresh()
	// 编辑商品
	editGoods()
})


/**
 * 初始化上拉加载更多
 * 
 */
function initPullRefresh() {
	mui.init({
	  pullRefresh : {
	    container:'#goodsContent',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
	    up : {
	      height:100,//可选.默认50.触发上拉加载拖动距离
	      auto:true,//可选,默认false.自动上拉加载一次
	      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
	      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
	      callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
	  }
	})
}

// 初始化上拉加载更多是，获取购物车数据
function getData() {

	if(!that) {
		that = this
	}
		$.ajax({
			url: '/cart/queryCartPaging',
			type: 'get',
			data: {
				page: page++,
				pageSize: 7
			},
			success: function(res) {
				if(res.data && res.data.length > 0) {
					html += template('artTempl', {
						data: res.data || []
					})
					$('#goodsList').html(html)
					that.endPullupToRefresh(false)
				} else {
					that.endPullupToRefresh(true)
				}
			}
		})
}

// 编辑商品
function editGoods() {
	$('#goodsList').on('tap', '.eidt-btn', function() {
		let allSize = this.getAttribute('data-allSize')
		let id = this.getAttribute('data-id')
    let html = template('artTempl2', {
    	allSize: allSize
    })
		mui.confirm(html, '请选择')
	})
}