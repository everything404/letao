$(function() {
	let id = getParamsByUrl(location.href, 'id')
	$.ajax({
		url: '/product/queryProductDetail',
		type: 'get',
		data: {
			id: id
		},
		success: function(res) {
		 let html =	template('detailTemp',{
				data: res
			})
		 $('#contentWrapper').html(html)
		 mui('.mui-numbox').numbox()
		}
	})
})
