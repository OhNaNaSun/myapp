/*
* 倒计时
* https://github.com/gomeplusFED/blog/blob/master/2016-04/do-you-really-understand-how-to-write-a-countdown-by-javascript.md
* */
(function(){
	//面向过程
	function countDown1(counts){
		//倒计时setTimeout
		if(counts > 0){
			$("#countDown").html(counts--);
			setTimeout(function(){
				countDown(counts)
			}, 1000);
		}else{
			$("#countDown").html("倒计时停止。。");
		}
	}

	function countDown2(counts){
		//倒计时setInterval
		var timer = setInterval(function(){
			if(counts > 0){
				$("#countDown").html(counts--);
			}else{
				$("#countDown").html("倒计时停止。。");
				clearInterval(timer);
			}
		},1000)
	}

	//countDown2(10);

	//面向对象：单例模式
	/*简单方便好理解，缺点是每次init都会拿一个新定时器，性能不好。继承和扩展能力一般，无法获取实例属性，导致了执行状态都是不可见的。*/
	var CountDown1 = {
		$: function(id){

		},
		init: function(startTime, endTime, el){

		},
		_timer: function(startTime, endTime, el){

		}
	}
	CountDown1.init("","","countDown1");
	//原型构造器
	function Countdown2(elem, startTime, endTime) {
		this.elem = elem;
		this.startTime = (new Date(startTime).getTime()) ? (new Date(startTime).getTime()) : (new Date().getTime());
		this.endTime = new Date(endTime).getTime();
	}
	Countdown2.prototype = {
		SetTime: function() {},
		leftPad: function(n) {},
		DownTime: function() {}
	}
	var test = new Countdown2("time", "2016/1/30,12:20:12", "2017/1/30,12:20:12");
	test.SetTime();

})();


//最优版
(function(){
	function timer(delay){
		this._queue = [];
		this.stop = false;
		this._createTimer(delay);
	}
	timer.prototype = {
		constructor: timer,
		_createTimer: function(delay){
			var self = this;
			var first = true;
			this.tag = 0;
			(function(){
				var s = new Date();
				for(var i = 0; i < self._queue.length; i++){
					self._queue[i]()
				}
				if(!self.stop){
					var cost = new Date() - s;
					delay = first ? delay : ((cost > delay) ? cost - delay : delay);
					setTimeout(arguments.callee, delay);
				}
			}())
			first = false;
		},
		add: function(cb){
			this._queue.push(cb);
			this.stop = false;
			return this._queue.length - 1;
		},
		remove: function(index){
			this._queue.splice(index - this.tag, 1);//去掉原数组中的某个元素
			this.tag++;
			if(!this._queue.length){
				this.stop = true;
			}
		}
	};
	function TimePool(){
		this._pool = {};
	}
	TimePool.prototype = {
		constructor: TimePool,
		getTimer: function(delayTime){
			var t = this._pool[delayTime];
			return t ? t : (this._pool[delayTime] = new timer(delayTime));
		},
		removeTimer: function(delayTime){
			if(this._pool[delayTime]){
				delete this._pool[delayTime];
			}
		}
	}

	//CountDown
	//var delayTime = 1000;
	var msTimePool = new TimePool();
	//var msInterval = msTimePool.getTimer(delayTime);
	function CountDown(config){
		var defaultOptions = {
			fixNow: 3*1000,
			fixNowDate: false,
			now: new Date().valueOf(),
			template: '{d}:{h}:{m}:{s}',
			delayTime:1000,
			render: function(outString){
				console.log(outString)
			},
			end: function(){
				console.log("the end!")
			},
			endTime: new Date().valueOf() + 1 * 1000 * 10
		};
		for (var i in defaultOptions) {
			if (defaultOptions.hasOwnProperty(i)) {
				this[i] = config[i] || defaultOptions[i];
			}
		}
		this.init();
	}

	CountDown.prototype = {
		constructor: CountDown,
		init: function(){
			var self = this;
			var msInterval = msTimePool.getTimer(self.delayTime);
			if(this.fixNowDate){
				//var fix = new timer(this.fixNow);
				var fix = msTimePool.getTimer(this.fixNow);
				var fixIndex = fix.add(function(){
					self.getNowTime(function(now){
						self.now = now;
					})
				})
			};
			var index = msInterval.add(function(){
				self.now += self.delayTime;
				if(self.now >= self.endTime){
					msInterval.remove(index);
					self.end();
					if(fix && fixIndex !== undefined){
						fix.remove(fixIndex);
					}
				}else{
					self.render(self.getOutString())
				}
			})

		},
		getBetween: function() {
			return _formatTime(this.endTime - this.now);
		},
		getOutString: function() {
			var between = this.getBetween();
			return this.template.replace(/{(\w*)}/g, function(m, key) {
				return between.hasOwnProperty(key) ? between[key] : "";
			});
		},
		getNowTime: function(cb) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', '/', true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 3) {
					var now = xhr.getResponseHeader('Date');
					cb(new Date(now).valueOf());
				}
			};
			xhr.send(null);
		}
	};
	function _cover(num) {
		var n = parseInt(num, 10);
		return n < 10 ? '0' + n : n;
	}

	function _formatTime(ms) {
		var s = ms / 1000,
			m = s / 60;
		return {
			d: _cover(m / 60 / 24),
			h: _cover(m / 60 % 24),
			m: _cover(m % 60),
			s: _cover(s % 60)
		};
	}

	var now = Date.now();
	new CountDown({
		fixNowDate: true,
		render: function(outString){
			$("#countDown1").html(outString)
		}
	});
	new CountDown({
		endTime: now + 1*20*1000,
		render: function(outString){
			$("#countDown2").html(outString)
		}
	});
	new CountDown({
		endTime: now + 1*25*1000,
		delayTime: 2000,
		render: function(outString){
			$("#countDown3").html(outString)
		}
	})
})()