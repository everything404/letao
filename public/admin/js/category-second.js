$(function() {
	// 获取二级分类的数据
	getSecondCategory()
	// 获取下一页二级分类数据
	nextPageCategory()
	// 获取上一页二级分类数据
	prevPageCategory()
	// 二级分类的添加
	addCategory()
})
// 页码
let page = 1

// 每页显示的数据
let pageSize = 3

// 总页数
let totalPage = 0

// 上传图片的路径
let imgPath = ''

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
			totalPage = Math.ceil(res.total / pageSize)
			let html = template('categoryTpl', {
				data: res
			})
			$('#categoryWrapper').html(html)
		}
	})
}

// 获取下一页二级分类数据
function nextPageCategory() {
	$('#nextBtn').on('click', function() {
		$('#noData').css('display', 'none').removeClass('in')
		if (page >= totalPage) {
			page = totalPage
			$('#noData').css('display', 'block').addClass('in')
			return
		}
		page++
		getSecondCategory()
	})
}

// 获取上一页二级分类的数据
function prevPageCategory() {
  $('#prevBtn').on('click', function() {
		$('#noData').css('display', 'none').removeClass('in')
		if(page <= 1) {
			page = 1
		  $('#noData').css('display', 'block').addClass('in')
			return
		}
		page--
		getSecondCategory()
  })
}

/**
 * 二级分类的添加
 * 1. 获取一级分类的数据并显示在选择框中
 * 2. 图片文件上传
 * 3. 调用接口， 实现二级分类数据的添加
 */
function addCategory() {
	// 获取一级分类名称
	$('#addCategory').on('click', function() {
		$.ajax({
			url: '/category/queryTopCategoryPaging',
			type: 'get',
			data: {
				page: 1,
				pageSize: 100
			},
			success: function(res) {
				let html = template('categoryFirstTpl', {
					data: res.rows.reverse()
				})
				$('#categoryFirst').html(html)
			}
		})
	})

	// 上传图片
	$('#fileUpload').fileupload({
		dataType: 'json',
		done: function (e, data) {
			imgPath = data.result.picAddr
			$('#showBrand').attr('src', data.result.picAddr)
   }
  })
  // 保存二级分类
  $('#save').on('click', function() {
  	$('#message').css('display', 'none')
  	let categoryId = $("[name='categoryId']").val()
  	let brandName = $("[name='brandName']").val()

  	if(categoryId && categoryId === "没有选择商品分类") {
  		let message = '请选择商品分类'
  		let html = template('noData', message)
  		$('#message').html(html).css('display', 'block')
  		return
  	}
  	if (!brandName) {
  		let message = '请输入商品名称'
  		let html = template('noData', message)
  		$('#message').html(html).css('display', 'block')
  		return
  	}

  	$.ajax({
  		url: '/category/addSecondCategory',
  		type: 'post',
  		data: {
  			brandName: brandName,
  			categoryId: categoryId,
  			brandLogo: imgPath,
  			hot: 1
  		},
  		error: function(request) {
  			if(request) {
  				let message = '添加失败'
		  		let html = template('noData', message)
		  		$('#message').html(html).css('display', 'block')
  			}
  		},
  		success: function(res) {
  			if(res.success) {
  				location.reload()
  				return
  			}
  		}
  	})
  })
}