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

function render(context) {
	this.objList = [];
	this.context = context;
	this.draw = function() {
		for(var i = 0; i < this.objList.length; i++) {
			this.objList[i].draw(this.context);
		}
	}
}

function animationProperty() {
	
}

/************************ Mouse Def ***********************************/

function mouse() {
	
}

/************************ Start Up Def ********************************/

function initTriangleCoords(width, height) {
	var margin = 10;
	var statusOffset = 100;
	
	var offsetHeight = height - statusOffset;
	var y = statusOffset + (offsetHeight / 2);
	
	var halfScreen = width / 2;
	var tempMag = ((offsetHeight / 2) - margin)
	
	var forward = {x: halfScreen / 2, y: statusOffset + margin, magnitude: tempMag, angle: 90};
	var back = {x: halfScreen / 2, y: height - margin, magnitude: tempMag, angle: 270};
	var left = {x: width - 2*tempMag - 2*margin, y: y, magnitude: tempMag, angle: 0};
	var right = {x: width - margin, y: y, magnitude: tempMag, angle: 180};
	
	return [forward,back,left,right];
}

function init(elementId) {
	var canvas = document.getElementById(elementId);
	canvas.width = getPageWidth();
	canvas.height = getPageHeight();
	var context = canvas.getContext('2d');
	
	var width = getWidth(canvas);
	var height = getHeight(canvas);
	
	var coords = initTriangleCoords(width, height);
	
	var renderer = new render(context);
	for (var i = 0; i < coords.length; i++) {
		renderer.objList[i] = new triangle;
		var temp = coords[i];
		renderer.objList[i].create(temp.x,temp.y,temp.magnitude,'black', toRadians(temp.angle));
	}
	
	renderer.draw();
	
	/*var tempTriangle = new triangle();
	tempTriangle.create(100, 200, 50, 'black', toRadians(0));
	tempTriangle.draw(context);
	
	var otherTriangle = new triangle();
	otherTriangle.create(200, 200, 50, 'black', toRadians(180));
	otherTriangle.draw(context);*/
}
