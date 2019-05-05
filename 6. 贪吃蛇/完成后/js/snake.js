// 蛇对象
// 自调用函数
(function() {
	var elements = [];
	function Snake(options) {
		// 初始化属性
		options = options || [];
		this.width = options.width || 20;
		this.height = options.height || 20;
		// 蛇的移动方向
		this.direction = options.direction || 'right';
		// 初始化蛇的身体
		this.body = [
			{x: 3, y: 2, color: 'red'},
			{x: 2, y: 2, color: 'blue'},
			{x: 1, y: 2, color: 'blue'}
		]
	}
	// 初始化函数
	Snake.prototype.render = function(map) {
		// 删除之前的蛇
		remove();
		// 渲染蛇的每一节到地图上
		for(var i = 0; i < this.body.length; i++) {
			var box = this.body[i];
			
			// 创建元素
			var div = document.createElement('div');
			// 设置元素属性
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.backgroundColor = box.color;
			div.style.position = 'absolute';
			div.style.left = box.x * this.width + 'px';
			div.style.top = box.y * this.height + 'px';
			
			// 添加元素到视图
			map.appendChild(div);
			elements.push(div);
		}
	}
	// 删除蛇的 body
	function remove() {
		for(var i = elements.length - 1; i >= 0; i--) {
			elements[i].parentNode.removeChild(elements[i]);
			elements.splice(i, 1);
		}
	}
	// 蛇的移动
	// 1.2 添加吃食物判断和重新生成食物
	Snake.prototype.move = function(food, map) {
		// 更新蛇身体的位置
		for(var i = this.body.length-1; i > 0; i--) {
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
		}
		// 更新蛇头的位置
		var head = this.body[0];
		switch(this.direction) {
			case 'top':
				head.y--;
				break;
			case 'bottom':
				head.y++;
				break;
			case 'left':
				head.x--;
				break;
			case 'right':
				head.x++;
				break;
		}
		// 判断蛇是否碰到食物
		var headX = head.x * this.width;
		var headY = head.y * this.height;
		if(headX === food.x && headY === food.y) {
			// 吃到食物
			// console.log('吃到食物')
			// 在蛇尾添加数据
			var last = this.body[this.body.length - 1];
			this.body.push({
				x: last.x,
				y: last.y,
				color: last.color
			})
			// 更新食物位置
			food.render(map);
		}
	}
	// 向外暴露对象
	window.Snake = Snake;
})()

// 测试函数
// var map = document.getElementById('map');
// var snake = new Snake();
// snake.render(map);