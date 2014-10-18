/************************ Misc Stuff **********************************/
function getWidth(canvas) {
	return canvas.width;
}

function getHeight(canvas) {
	return canvas.height;
}

/************************ Triangle Def ********************************/

function point(x,y) {
	this.x = x;
	this.y = y;
}

function getOrient(x,y,height,orient) {
	
}

function triangle() {
	this.topPoint = null;
	this.midPoint = null;
	this.bottomPoint = null;
	this.create = function(x,y,height,orient) {
		var opajObjLen = height
		this.midPoint = new point(x,y);
		this.topPoint = new point(x + height * (3/4), y - height);
		this.bottomPoint = new point(x + height * (3/4), y + height);
	};
	this.draw = function(context) {
		
	};
}

function init(elementId) {
	var canvas = document.getElementById(elementId);
	var context = canvas.getContext('2d');
	
	var width = getWidth(canvas);
	var height = getHeight(canvas);
	
	
}
