/*
统计日志接口
fengjichuan
2015-11-23
*/

(function() {

	// 用户滚动屏幕的状态统计
	var userScroll = {
		// 页面的高度
		pageHeight: 0,
		// 屏幕的高度
		screenHeight: 0,
		// 用户滚动的最大高度
		scrollHeight: 0
	};

	// 滚动事件的监听
	// 统计用户
	$(window).on('scroll', function(e) {
		userScroll.screenHeight = $(window).height();
		userScroll.pageHeight = $(document).height();
		var sh = $(window).scrollTop() + userScroll.screenHeight;
		userScroll.scrollHeight = (sh > userScroll.scrollHeight) ? sh : userScroll.scrollHeight;
	});

	var log = {
		// 设置默认参数
		defaultParams: {},
		setDefaultParams: function(pars) {
			if(typeof pars == 'object') {
				this.defaultParams = pars;
			}
		},
		add: function(pars) {
			pars = pars ? pars : {};
			pars = $.extend(pars, this.defaultParams);
			if(typeof pars == 'object') {
				pars = (function() {
					var p = [];
					for(var key in pars) {
						p.push(key + '=' + pars[key]);
					}
					return p.join('&');
				})();
			}
			$.ajax({
				url: '/touch/appReversion/statis?' + pars,
				success: function(res) {

				}
			});
		},

		// 添加用户滚动屏幕的统计
		addUserScreen: function(pars) {
			pars = pars ? pars : {};
			pars = $.extend(userScroll, pars);
			this.add(pars);
		},

		getScreenHeight: function() {
			setTimeout(function() {
				userScroll.screenHeight = $(window).height();
				userScroll.pageHeight = $(document).height();
				userScroll.scrollHeight = userScroll.screenHeight;
			}, 400);
		}
	};

	// 初始化获取屏幕尺寸相关的统计信息
	log.getScreenHeight();

	window.log = log;

})();