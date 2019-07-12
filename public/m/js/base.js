$(function() {
	// 恢复a标签跳转
	$('body').on('tap', 'a', function() {
		mui.openWindow({
			url: $(this).attr('href')
		})
	})

	if($('#back')) {
		$('#back').on('tap', function() {
			window.history.back()
		})
	}
})