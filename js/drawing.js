// pixel view
var canvas = document.getElementById('canvas-demo');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.addEventListener("wheel", wheelUpdate);

function wheelUpdate(e){
	if(!con.autoHeight){
		let newHeight = con.fontHeight - e.deltaY;
		con.fontHeight = Math.min(Math.max(newHeight,conFontHeight.__min),conFontHeight.__max);
		main();
	}
}

var point = new obelisk.Point(canvas.width/2, canvas.height/2);
var pixelView = new obelisk.PixelView(canvas, point);

// input off canvas
var offCanvas = document.getElementById('canvas-txt');
var ctx = offCanvas.getContext("2d");


function hexTo0x(s){
	return parseInt('0x' + s.substr(1),16);
}
function hexToHSL(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max == min){
      h = s = 0; // achromatic
    }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  var HSL = new Object();
  HSL['h']=h;
  HSL['s']=s;
  HSL['l']=l;
  return HSL;
}
function hslToHex(hsl) {
  let r, g, b;
  let h = hsl.h;
  let s = hsl.s;
  let l = hsl.l;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// initialize variables
var gain = 5;
var brick, cube, colorBrick, dimensionBrick, colorCube, dimensionCube
// build method
function buildPrimitive() {
	// automatic changes
	if(con.autoHeight){
		let newHeight = con.fontHeight + gain;
		if(newHeight > conFontHeight.__max || newHeight < conFontHeight.__min){
			gain *= -1;
		}
		con.fontHeight += gain;
		//requestAnimationFrame( main );
		setTimeout(main, 1000/30);

	}
	
    // parameters
	var fontColor = hexTo0x(con.fontColor);
	var fontSize = con.fontSize;
	var gridSize = con.gridSize;
    var fontHeight = con.fontHeight;
	
	var fontCustomEnable = con.fontCustomEnable;
	var fontSideColor = hexTo0x(con.fontSideColor);
	var fontFrontColor = hexTo0x(con.fontFrontColor);
	var fontTopColor = hexTo0x(con.fontTopColor);

	var gridLineColor = hexTo0x(con.gridLineColor);
	var gridBackColor = hexTo0x(con.gridBackColor);
	
	// canvas
	ctx.font = fontSize + "px Helvetica";
	canvas.style.backgroundColor = con.backColor; 
	
    // floor
    colorBrick = new obelisk.SideColor(gridLineColor,gridBackColor);
    dimensionBrick = new obelisk.BrickDimension(gridSize,gridSize);
    brick = new obelisk.Brick(dimensionBrick, colorBrick);

    // cube
	if(fontCustomEnable){
		//var colorCube = new obelisk.CubeColor(0xFFFFFF, 0xFFFFFF, 0x161f47, 0x182352, 0x243473);
		colorCube = new obelisk.CubeColor(0xFFFFFF, 0xFFFFFF,fontSideColor, fontFrontColor, fontTopColor);		
	}else{
		let fontColorHSL = hexToHSL(con.fontColor);
		fontColorHSL.l = fontColorHSL.l - 0.07;
		let fontFrontColor = hexTo0x(hslToHex(fontColorHSL));
		fontColorHSL.l = fontColorHSL.l - 0.14;
		let fontSideColor = hexTo0x(hslToHex(fontColorHSL));
		//var colorCube = new obelisk.CubeColor().getByHorizontalColor(fontColor);
		colorCube = new obelisk.CubeColor(0xFFFFFF, 0xFFFFFF,fontSideColor, fontFrontColor, fontColor);
	}
    dimensionCube = new obelisk.CubeDimension(gridSize, gridSize, fontHeight);
    cube = new obelisk.Cube(dimensionCube, colorCube, false);
}

function draw() {
    // parameters
	var gridSize = con.gridSize;
    var gridWidth = con.gridWidth;
    var gridHeight = con.gridHeight;
	var fontSize = con.fontSize;
	var message = con.message;
	var metrics = ctx.measureText(message);
	var textWidth = Math.floor(metrics.width/2)*2;
	
	if(gridWidth > textWidth){

		// clear everything
		pixelView.clear();
		ctx.clearRect(0, 0, gridWidth, gridHeight);

		ctx.fillText(message, 0, fontSize );
		var textData = ctx.getImageData(0, 0, gridWidth, gridHeight);
		
		var index, p3d;
		var threshold = 130;
		for (var y = -gridHeight/2; y <= gridHeight/2; y++) {
			for (var x = -gridWidth/2; x <= gridWidth/2; x++) {
				// draw grid
				if(con.gridDisplay){
					p3d = new obelisk.Point3D(x * (gridSize - 2), y * (gridSize - 2), 0);
					pixelView.renderObject(brick, p3d);
				}
				// draw message
				index = ((y+fontSize/2) * textData.width + (x+textWidth/2)) * 4;

				if (textData.data[index + 3] > threshold) {
					p3d = new obelisk.Point3D(x * (gridSize - 2), y * (gridSize - 2), 0);
					pixelView.renderObject(cube, p3d);
				}
			}
		}
	}
}

// main
function main(){
	buildPrimitive();
	draw();
}