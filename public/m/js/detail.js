$(function() {
	getGoodsInfo()

  selectSize()
	
	addCart()
})
// 商品尺码
let size = 0
// 商品ID
let id = 0
/**
 * 获取商品信息
 */
function getGoodsInfo() {
  id = getParamsByUrl(location.href, 'id')
	$.ajax({
		url: '/product/queryProductDetail',
		type: 'get',
		data: {
			id: id
		},
		success: function(res) {
		  let html =	template('detailTemp', res)
		  $('#contentWrapper').html(html)
		 mui('.mui-numbox').numbox()
		  //获得slider插件对象 -- 因为动态生成的轮播图，所以要重新初始化
			var gallery = mui('.mui-slider');
			gallery.slider();
		}
	})
}

/**
 * 尺码选择
 */
function selectSize() {
	// 事件委托
	$('#contentWrapper').on('tap', '.size-wrapper .size-item', function() {
		$(this).addClass('active').siblings('span').removeClass('active')
		size = $(this).text()
	})

}

/**
 * 加入购物车 -- 需判断用户是否登录了
 * 1. 获取加入购物车按钮，并添加点击事件
 * 2. 判断用户是否选择了尺码
 * 3. 调用加入购物车接口
 * 4. 提示用户加入购物车成功,是否跳转到购物车页面
 */

function addCart() {
	$('#addCart').on('tap', function() {
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

		if(!size) {
			mui.alert('请选择尺码')
			return
		}
     
    let num = mui('.mui-numbox').numbox().getValue()
		$.ajax({
			url: ' /cart/addCart',
			type: 'post',
			data: {
				productId: id,
				num: num,
				size: size
			},
			success: function(res) {
				if(res.success) {
					mui.confirm('添加成功，去购车看看', function(res) {
						if(res.index === 1) {
							location.href = 'cart.html'
						}
					})
				} else {
					mui.alert('网络有误，请稍后。。。。')
				}
			}
		})
	})
}