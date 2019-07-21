$(function(){

	// 获取产品列表
	getProductList()
  // 添加商品
  addCategory()
  // 下一页
  nextPage()
  // 上一页
  prevPage()
 

})

// 页数
let page = 1

// 每页的条数
let pageSize = 3

// 总页数
totalPage = 0

// 图片数组
let imgArr = []

/**
 * 获取产品列表
 */
function getProductList() {
	$.ajax({
		url: '/product/queryProductDetailList',
		type: 'get',
		data: {
			page: page,
			pageSize: pageSize
		},
		success: function(res) {
			totalPage = Math.ceil(res.total / pageSize)
			let html = template('productTpl', {
				data: res.rows
			})
			$('#productWrapper').html(html)
		}
	})
}
/**
 * 获取下一页商品数据
 */
function nextPage() {
	$('#nextBtn').on('click', function() {
		console.log(totalPage)
		if(page >= totalPage) {
			page = totalPage
		} else {
			page++
			getProductList()
		}
	})
}

function prevPage() {
	$('#prevBtn').on('click', function() {
		if(page <= 1) {
				page = 1
				return
		}
		page--
		getProductList()
	})
}

/**
 * 添加商品
 * 1. 获取添加分类按钮，并添加点击事件
 * 2. 调用二级分类接口，分类的名称，并渲染到页面上
 * 3. 获取用户输入的信息，并校验
 * 4. 调用添加商品接口，实现功能
 * 5. 刷新页面
 */
function addCategory() {

	$('#addCategory').on('click', function() {
		$.ajax({
			url: '/category/querySecondCategoryPaging',
			data: {
				page: 1,
				pageSize: 100
			},
			success: function(res) {
				let html = template('brandTpl', {
					data: res.rows
				})
				$('#brandWrapper').html(html)
			}
		})
	})

	$('#save').on('click', function() {
		$('#warnMessage').css('display', 'none')
		let proName = $.trim($("[name='productName']").val())
		let oldPrice = $.trim($("[name='productOriginPrice']").val())
		let price = $.trim($("[name='productPrice']").val())
		let proDesc = $.trim($("[name='description']").val())
		let size = $.trim($("[name='productSize']").val())
		let num = $.trim($("[name='productNum']").val())
		let brandId = $.trim($("[name='brandId']").val())


		if(!proName) {
			$('#warnMessage').css('display', 'block').text('请输入产品名称')
			return
		}
		if(!proDesc) {
			$('#warnMessage').css('display', 'block').text('请输入产品描述')
			return
		}
		if(!num) {
			$('#warnMessage').css('display', 'block').text('请输入产品数量')
			return
		}
		if(!size) {
			$('#warnMessage').css('display', 'block').text('请输入产品尺寸')
			return
		}
		if(!price) {
			$('#warnMessage').css('display', 'block').text('请输入产品价格')
			return
		}
		if(!oldPrice) {
			$('#warnMessage').css('display', 'block').text('请输入产品原价')
			return
		}
		if(!brandId) {
			$('#warnMessage').css('display', 'block').text('请输入选择品牌')
			return
		}

		$.ajax({
			url: '/product/addProduct',
			type: 'post',
			data: {
				proName: proName,
				oldPrice: oldPrice,
				price: price,
				proDesc: proDesc,
				size: size,
				num: num,
				brandId: brandId,
				statu: 1,
				pic: JSON.stringify(imgArr)
			},
			success: function(res) {
				if(res.success) {
					location.reload()
				}
			}
		})
    
		
	})



	 // 图片上传
  imgUpload('#fileUpload1', '#img1')
  imgUpload('#fileUpload2', '#img2')
  imgUpload('#fileUpload3', '#img3')

	


}
/**
 * 图片上传
 * @param  String id input标签的id
 */
function imgUpload(id, imgId) {
	$(id).fileupload({
		dataType: 'json',
		done: function (e, data) {
			// console.log(JSON.stringify(data.result))
			imgArr.push(data.result)
			$(imgId).attr('src', data.result.picAddr)
    }
  })
}