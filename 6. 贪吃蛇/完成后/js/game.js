// 游戏对象
(function() {
	var that; // 记录游戏对象
	function Game(map) {
		this.snake = new Snake();
		this.food = new Food();
		this.map = map;
		that = this;
	}
	// 开始游戏函数
	Game.prototype.start = function() {
		// 初始化食物和蛇
		this.food.render(this.map);
		this.snake.render(this.map);
		// 开始游戏
		// 测试move方法
		//this.snake.move();
		//this.snake.render(this.map);
		// 移动蛇
		runSnake();
		// 控制移动方向
		bindKey();
	}
	// 移动蛇的函数
    function runSnake() {
		var timeId = setInterval(function() {
			that.snake.move(that.food, that.map);
			that.snake.render(that.map);
			
			// 判断蛇是否越界
			var head = that.snake.body[0];
			var r = that.map.offsetWidth / that.snake.width; // 右边界
			var b = that.map.offsetHeight / that.snake.height; // 下边界
			if(head.x >= r || head.y >= b || head.x < 0 || head.y < 0) {
				clearInterval(timeId);
				alert('Game Over');
			}
			// 判断蛇是否碰撞到自己
			for(var i = that.snake.body.length - 1; i > 0; i--) {
				var box = that.snake.body[i];
				if(box.x === head.x && box.y === head.y) {
					clearInterval(timeId);
					alert('Game Over');
				}
			}
		}, 150);
    }
	// 通过键盘控制蛇的移动
	function bindKey() {
		// document.onkeydown = function() {}
		document.addEventListener('keydown', function(e) {
			// console.log(e);
			// left-37;
			// top-38;
			// right-39;
			// bottom-40;
			// 不能切换到与当前方向相反的方向
			var direction = that.snake.direction;
			switch(e.keyCode) {
				case 37:
					if(direction !== 'right') that.snake.direction = 'left';
					break;
				case 38:
					if(direction !== 'bottom') that.snake.direction = 'top';
					break;
				case 39:
					if(direction !== 'left') that.snake.direction = 'right';
					break;
				case 40:
					if(direction !== 'top') that.snake.direction = 'bottom';
					break;
			}
		}, false); // false 事件冒泡
	}
	window.Game = Game;
})()