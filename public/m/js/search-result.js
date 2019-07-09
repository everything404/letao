/**
 * 根据用户输入的关键字获取搜索结果
 *
 * 1. 获取到地址栏用户输入的关键字
 * 2. 用关键字去调取搜索接口
 * 3. 将搜索结果显示到页面中
 */
let keyWord = getParamsByUrl(location.href, 'keyword')

// 页码数
let page = 1

// 页面中数据
let html = ''

// 价格排序--升序
let priSort = 1

// this 指向
let that = null

let numSort = 2


$(function() {
   mui.init({
			  pullRefresh : {
			    container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
			    up : {
			      height:50,//可选.默认50.触发上拉加载拖动距离
			      auto:true,//可选,默认false.自动上拉加载一次
			      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
			      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
			      callback : getData//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			    }
			  }
		})
 
 priceSort()
 numberSort()
 
})


function getData() {
	// 第一次调用时mui ,所以that = mui的this
	// 第二次价格排序调用的时候， that 不再重新 等于 window 
	// 所以that 会一直等于 mui 的 this
	 if(!that) {
		that = this
	 }

	  $.ajax({
    	url: '/product/queryProduct',
    	type:  'get',
    	data: {
    		page: page++,
    		pageSize: 2,
    		proName: keyWord,
    		price: priSort,
    		num: numSort
    	}, 
    	success: function(response) {
    		if(response.data.length > 0) {
    	   html += template('productlist', {
    			data: response.data
    		})
    		$('#products-content').html(html)
    		 that.endPullupToRefresh(false);
    		} else {
    			that.endPullupToRefresh(true);
    		}
    	}

    })
}



/**
*  按照价格对商品进行排序
*   1. 对价格按钮添加轻敲事件
*   2. 将价格排序滚则传递到接口中
*   3. 对之前的各种配置进行初始化
*       清空页面数据
*       页码恢复为1
*       重新开启上拉加载数据
*   4. 将排序后的结果重新展示在页面中
*   
* [getParamsByUrl description]
* @param  {[type]} url   [description]
* @param  {[type]} name) {	let        params [description]
* @return {[type]}       [description]
*/

function priceSort() {
	 $('#priceSort').on('tap', function() {
		// 更改价格排序
	  priSort = priSort === 1 ? 2: 1;

		html = ''
		page = 1
		numSort = 1
    // 重新开启上拉加载数据
		mui('#refreshContainer').pullRefresh().refresh(true);

		getData()
	})

}

function numberSort() {
	$('#numSort').on('tap', function() {
		console.log('num')
		priSort = 1
		html = ''
		numSort = numSort === 2 ? 1: 2
		page = 1
		mui('#refreshContainer').pullRefresh().refresh(true);
		getData()
	})
}

/**
 * 获取地址栏中的参数
 * @param {string} url 地址栏字符串
 * @param {string} name 要获取的参数名称
 * @return {string}     参数名称对应的参数值 
 */
function getParamsByUrl(url, name) {
	let params = url.substr(url.indexOf('?') + 1)

	let param = params.split('&')

	for(let i = 0; i < param.length; i++) {
		var current = param[i].split('=')
		if(current[0] === name) {
			return current[1]
		}
	}
	return null
}

