// 食物对象
// 自调用函数: 避免命名冲突
(function() {
	// 记录生产的食物
	var elements = [];
	function Food(options) {
		// 设置属性
		options = options || {};
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.color = options.color || 'green';
	}
	// 渲染食物的函数
	Food.prototype.render = function(map) {
		// 删除之前记录的食物
		remove();
		
		// 创建元素
		var div = document.createElement('div');
		// 获取新的食物位置
		this.x = Tools.getRandom(0, map.offsetWidth/this.width - 1) * this.width;
		this.y = Tools.getRandom(0, map.offsetHeight/this.height -1) * this.height;
		// 设置食物元素属性
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
		div.style.left = this.x + 'px';
		div.style.top = this.y + 'px';
		div.style.position = 'absolute';
		div.style.backgroundColor = this.color;
		// 添加到父元素和数组中
		map.appendChild(div);
		elements.push(div);
	}
	// 移除食物的函数
	function remove() {
		for(var i = elements.length -1; i >= 0; i--) {
			// 移除元素
			elements[i].parentNode.removeChild(elements[i]);
			// 移除数组中元素
			elements.splice(i, 1);
		}
	}
	
	// 暴露给外部使用
	window.Food = Food;
})()

// 测试
// var map = document.getElementById('map');
// var food = new Food();
// food.render(map);