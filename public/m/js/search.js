//  搜索中心
$(function() {
 searchResult()
 clearHistory()
})

function searchResult() {
  let keyArr = JSON.parse(localStorage.getItem('historyWord')) || [] // 关键字历史数组
   $('#search-button').on('click', function() {
    // 获取用户输入的关键字
    let keyword = $(this).siblings('input').val()
    if(keyword) {
      // 将用户输入的关键字存储到数组中
      keyArr.push(keyword)
      localStorage.setItem('historyWord', JSON.stringify(keyArr))
      location.href = 'search-result.html?keyword=' + keyword 
    } else {
      mui.alert('请输入商品的关键字')
     }
   })
   /**
   * 实现历史关键字存储
   * 1. 准备一个储存关键字的数组
   * 2. 当用户点击搜索按钮的时候后，把关键字追加到这个数组中
   * 3. 将数组存储到本地存储中
   */
    if(keyArr) {
      let html =   template('his-word', {
        data: keyArr
      })
      $('#history-word').html(html)
    }
}

// 删除搜索历史
function clearHistory() {
  let keyArr = JSON.parse(localStorage.getItem('historyWord')) || [] // 关键字历史数组
   $('#clearButton').on('click', function() {
    $('#history-word').html('')
    localStorage.removeItem('historyWord')
  })
}

