// 当页面DOM结构加载完毕之后，执行回调函数中的代码
$(function() {
	// 初始化区域滚动
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	})

	// 获取左侧数据
	$.ajax({
		url: '/category/queryTopCategory',
		type: 'get',
		success: function(response) {
		  let html =	template('cate-left', {
				data: response.rows
			})
			$('#links-wrapper').html(html)

			if(response.rows.length) {

        $('#links-wrapper').find('li').eq(0).addClass('active')

				let id = response.rows[0].id
        // 根据一级分类获取二级分类数据
				getSecondCategory(id)
			}
		}
	})

	// 通过左侧分类获取右侧分类的数据
	// 1. 以及分类添加点击事件
	// 2. 在事件处理函数中获取以及分类的Id
	// 3. 调用二级分类的接口获取对应的数据
	// 4. 将数据展示到对应的位置中
	// 5. 如果接口中没有数据，要在页面中显示暂无数据
	
	// 1. 给一级分类添加点击事件
	$('.links-wrapper').on('click','.link', function() {
		//2. 获取当前点击的一级分类的Id
		let id = $(this).attr('data-id')
		// 给当前点击的一级分类添加 active 样式，其兄弟元素去除 active 样式
		$(this).addClass('active').siblings().removeClass('active')

	  // 3. 调用二级分类的接口获取对应的数据
   getSecondCategory(id)
	})
})

// 根据一级分类获取二级分类数据
function getSecondCategory(id) {
	$.ajax({
    	url: '/category/querySecondCategory',
    	data: {
    		id: id
    	},
    	success: function(response) {
    		let data = response.rows
    	  let html =	template('cate-right', {
    			data: data
    		})
    		$('#brand-list').html(html)
    	}
    })
}