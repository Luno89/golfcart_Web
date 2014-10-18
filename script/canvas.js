/************************ Misc Stuff **********************************/
function getWidth(canvas) {
	return canvas.width;
}

function getPageWidth() {
  if (self.innerHeight) {
    return self.innerWidth;
  }

  if (document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientWidth;
  }

  if (document.body) {
    return document.body.clientWidth;
  }
}

function getHeight(canvas) {
	return canvas.height;
}

function getPageHeight() {
  if (self.innerHeight) {
    return self.innerHeight;
  }

  if (document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientHeight;
  }

  if (document.body) {
    return document.body.clientHeight;
  }
}
/************************ Triangle Def ********************************/

function point(x,y) {
	this.x = x;
	this.y = y;
}

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function getOrient(triObj,orientAngle) {
	var tempX = triObj.topPoint.x - triObj.midPoint.x;
	var tempY = triObj.topPoint.y - triObj.midPoint.y;
	triObj.topPoint.x = triObj.midPoint.x + (tempX * Math.cos(orientAngle) - tempY * Math.sin(orientAngle));
	triObj.topPoint.y = triObj.midPoint.y + (tempX * Math.sin(orientAngle) + tempY * Math.cos(orientAngle));
	
	tempX = triObj.bottomPoint.x - triObj.midPoint.x;
	tempY = triObj.bottomPoint.y - triObj.midPoint.y;
	triObj.bottomPoint.x = triObj.midPoint.x + (tempX * Math.cos(orientAngle) - tempY * Math.sin(orientAngle));
	triObj.bottomPoint.y = triObj.midPoint.y + (tempX * Math.sin(orientAngle) + tempY * Math.cos(orientAngle));
}

function triangle() {
	this.topPoint = null;
	this.midPoint = null;
	this.bottomPoint = null;
	this.color = 'red';
	this.create = function(x,y,height,color,orient) {
		var opajObjLen = height
		this.midPoint = new point(x,y);
		this.topPoint = new point(x + height * (7/8), y - height);
		this.bottomPoint = new point(x + height * (7/8), y + height);
		this.color = color;
		getOrient(this,orient);
	};
	this.draw = function(context) {
		context.beginPath();
		context.moveTo(this.midPoint.x,this.midPoint.y);
		context.lineTo(this.topPoint.x,this.topPoint.y);
		context.lineTo(this.bottomPoint.x,this.bottomPoint.y);
		context.lineTo(this.midPoint.x,this.midPoint.y);
		context.closePath();
		context.fillStyle = this.color;
		context.fill();
		context.fillStyle = 'black';
		context.stroke();
	};
}

/************************ Animation Def *******************************/

function render() {
	this.objList = null;
	this.
}

function animationProperty() {
	
}

/************************ Mouse Def ***********************************/

/************************ Start Up Def ********************************/

function init(elementId) {
	var canvas = document.getElementById(elementId);
	canvas.width = getPageWidth();
	canvas.height = getPageHeight();
	var context = canvas.getContext('2d');
	
	var width = getWidth(canvas);
	var height = getHeight(canvas);
	
	var tempTriangle = new triangle();
	tempTriangle.create(100, 200, 50, 'black', toRadians(0));
	tempTriangle.draw(context);
	
	var otherTriangle = new triangle();
	otherTriangle.create(200, 200, 50, 'black', toRadians(180));
	otherTriangle.draw(context);
}
