$(function() {
 // 获取一级分类
 getFirstCategory()
 // 获取下一页分类数据
 nextPageCategory()
 // 获取上一页数据
 prevPageCategory()
 // 添加一级分类
 addFirstCategory()
 // 编辑分类
 eidtCategory()

})

// 页码
let page = 1
// 每页的条数
let pageSize = 5

let totalPage = 0

/**
 * 获取一级分类数据
 * 
 */
function getFirstCategory() {
	$.ajax({
		url: '/category/queryTopCategoryPaging',
		type: 'get',
		data: {
			page: page,
			pageSize: pageSize
		},
		success: function(res) {
				totalPage = Math.ceil(res.total / pageSize)
				if(page <= totalPage) {

					let data = res.rows
				  let html = template('categoryTpl', {
					  data: data
				  })
				  $('#categoryWrapper').html(html)
				} else {
					$('#message').css('display', 'block')
				}

		}
	})
}

/**
 * 获取下一页一级分类数据
 */
function nextPageCategory() {
	$('#nextBtn').on('click', function() {
		$('#message').css('display', 'none')
		if(page === totalPage) {
			$('#message').css('display', 'block')
			return
		} else {
			page++
		}
		getFirstCategory()
	})
}
/**
 * 获取下一页数据
 *
 */
function prevPageCategory() {
	$('#prevBtn').on('click', function() {
		if(parseInt(page) === 1) {
			page = 1
			$('#message').css('display', 'block')
			return

		} else {
			$('#message').css('display', 'none')
			page--
		}
		getFirstCategory()
	})
}

/**
 * 添加一级分类
 * 1. 获取一级分类保存按钮
 * 2. 获取用户输入的分类名称，并校验
 * 3. 调用一级分类接口，实现功能
 * 4. 刷新页面
 */
function addFirstCategory() {
	$('#save').on('click', function() {
		let name = $.trim($("[name='categoryName']").val())
		if(!name) {
			$('#noCategory').css('display', 'block')
			return
		}
		// NProgress.start();
		$.ajax({
			url: '/category/addTopCategory',
			type: 'post',
			data: {
				categoryName: name
			},
			success: function(res) {
				if(res.success) {
					// location.reload()
					$('body').removeClass('modal-open')
					$('.category-first').css('display', 'none')
					$('div').remove('.modal-backdrop')
					$("[name='categoryName']").val('')
					getFirstCategory()
			    // NProgress.done()
				}
			}
		})
	})
}

/**
 * 编辑分类
 */
function eidtCategory() {
	let id = 0
	//获取id，因为编辑按钮是动态生成的，所以要用事件绑定的方式获取其身上的自定属性--data-id ，就是id
	$('#categoryWrapper').on('click', '.eidtCategory', function() {
		 id = $(this).attr('data-id')
     let $brotherText = $(this).parent().prev().text()
     $('#editDefaultName').val($brotherText)
     
	})
	$('#saveEidt').on('click', function() {
		let name = $("[name='editCategoryName']").val()
		let statu = $("[name='statu']").val()
		if(!name) {
			let html = `<div class="alert alert-warning"  style="margin-bottom: 0;">请输入分类的名称</div>`
			$('#Amessage').html(html)
			return
		}

		$.ajax({
			url: '/category/updateTopCategory',
			type: 'post',
			data: {
				id: id,
				categoryName: name,
				isDelete: statu
			},
			success: function(res) {
				if(res.success) {
					location.reload()
				}
			}
		})
		
	})
}