$(function() {
	// 获取二级分类的数据
	getSecondCategory()
})
// 页码
let page = 1

// 每页显示的数据
let pageSize = 5

// 获取二级分类的数据
function getSecondCategory() {
	$.ajax({
		url: '/category/querySecondCategoryPaging',
		type: 'get',
		data: {
			page: page,
			pageSize: pageSize
		},
		success: function(res) {
			let html = template('categoryTpl', {
				data: res
			})
			$('#categoryWrapper').html(html)
		}
	})
}