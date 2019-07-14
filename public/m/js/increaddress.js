$(function() {
   // 添加收货地址
   increAddress()
   // 初始化 picker 组件
   initPicker()
})
/**
 * 初始化 picker 组件
 */
function initPicker() {
  // 创建 picker 选择器
  let picker = new mui.PopPicker({layer:3})
  // 为 picker 选择器添加数据 cityData 在 HTML页面中 引入
  picker.setData(cityData)

  $('#selectCity').on('tap', function() {
    picker.show(function(selectItem) {
      $('#selectCity').val(selectItem[0].text + selectItem[1].text + selectItem[2].text)
    })
   })
}

/**
 * 添加收货地址
 */
function increAddress() {
  let isEdit = Number(getParamsByUrl(location.href, 'isEdit'))

  if(isEdit) {
    // 编辑
    if(localStorage.getItem('ltAddress')) {
      let address = JSON.parse(localStorage.getItem('ltAddress'))
      let html = template('editTempl',{
        data: address
      })
      $('#editForm').html(html)
    }
  } else {
      // 添加
      let html = template('editTempl', {
        data: {}
      })
      $('#editForm').html(html)
    }
 
  
  $('#increAdderss').on('tap', function() {
     let username = $("[name='username']").val()
     let postCode = $("[name='postCode']").val()
     let city = $("[name='city']").val()
     let detail = $("[name='detail']").val()
     
     if(!username) {
      mui.alert('请输入收货人姓名')
      return
     }
     if(!postCode) {
      mui.alert('请输入邮政编码')
      return
     }
     if(!city) {
      mui.alert('请输入省市区')
      return
     }
     if(!detail) {
      mui.alert('请输入详细地址')
      return
     }
      
     let data = {
                  address: city,
                  addressDetail: detail,
                  recipients: username,
                  postcode: postCode
                }

     if(isEdit) {
      // 编辑
      let url = '/address/updateAddress'
      let id = JSON.parse(localStorage.getItem('ltAddress')).id
      data.id = id
      $.ajax({
        url: url,
        type: 'post',
        data: data,
        success: function(res) {
           if(res.success) {
            mui.alert('修改收货地址成功', function() {
              location.href = 'address.html'
            })
          }
        }
      })

     } else {
       let url = '/address/addAddress'
      // 添加
       $.ajax({
        url: url,
        type: 'post',
        data: data,
        success: function(res) {
          if(res.success) {
            mui.alert('添加收货地址成功', function() {
              location.href = 'address.html'
            })
          }
        }
       })
     }
   })
 }
