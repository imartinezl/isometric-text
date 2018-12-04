// control bar
var ControlBar = function () {
	this.message = "imartinezl";
	this.autoHeight = false;
    this.fontHeight = 30;
	this.fontSize = 20;
	this.fontColor = "#7b8dd4";
	this.backColor = "#243473";

	this.fontCustomEnable = false;
	this.fontTopColor = "#243473";
	this.fontFrontColor = "#182352";
	this.fontSideColor = "#161f47";
	
	this.gridDisplay = false;
    this.gridSize = 8;
	this.gridWidth = 150;
	this.gridHeight = 30;
	this.gridLineColor = "#cbcbcb"
	this.gridBackColor = "#1c285e"
};
var con = new ControlBar();
var gui = new dat.GUI({load: loadExternalJSON() });
gui.remember(con);

var f1 = gui.addFolder('Text Parameters');
var conMessage = f1.add(con, 'message');
var conAutoHeight = f1.add(con, 'autoHeight');
var conFontHeight = f1.add(con, 'fontHeight', 4, 100).step(1).listen();
var conFontSize = f1.add(con, 'fontSize',12,30).step(2);
var conFontColor = f1.addColor(con, 'fontColor');
var conBackColor = f1.addColor(con, 'backColor');
//f1.open();

var f11 = f1.addFolder('Custom Font Colors');
var conFontCustomEnable = f11.add(con, 'fontCustomEnable');
var conFontTopColor = f11.addColor(con, 'fontTopColor');
var conFontFrontColor = f11.addColor(con, 'fontFrontColor');
var conFontSideColor = f11.addColor(con, 'fontSideColor');

var f2 = gui.addFolder('Grid Parameters');
var conGridDisplay = f2.add(con, 'gridDisplay');
var conGridSize = f2.add(con, 'gridSize', 6, 40).step(2);
var conGridWidth = f2.add(con, 'gridWidth',20,300).step(10);
var conGridHeight = f2.add(con, 'gridHeight',20,300).step(10);
var conGridLineColor = f2.addColor(con, 'gridLineColor');
var conGridBackColor = f2.addColor(con, 'gridBackColor');

// On change functions
conMessage.onChange(main);
conAutoHeight.onChange(main);
conFontHeight.onChange(main);
conFontSize.onChange(main);
conFontColor.onChange(main);
conBackColor.onChange(main);

conFontCustomEnable.onChange(main);
conFontTopColor.onChange(main);
conFontFrontColor.onChange(main);
conFontSideColor.onChange(main);

conGridDisplay.onChange(main);
conGridSize.onChange(main);
conGridWidth.onChange(main);
conGridHeight.onChange(main);
conGridLineColor.onChange(main);
conGridBackColor.onChange(main);






conMessage.onFinishChange(function(){cancelAnimationFrame(request)});
//conAutoHeight.onFinishChange(function(){cancelAnimationFrame(request)});
conFontHeight.onFinishChange(function(){cancelAnimationFrame(request)});
conFontSize.onFinishChange(function(){cancelAnimationFrame(request)});
conFontColor.onFinishChange(function(){cancelAnimationFrame(request)});
conBackColor.onFinishChange(function(){cancelAnimationFrame(request)});

conFontCustomEnable.onFinishChange(function(){cancelAnimationFrame(request)});
conFontTopColor.onFinishChange(function(){cancelAnimationFrame(request)});
conFontFrontColor.onFinishChange(function(){cancelAnimationFrame(request)});
conFontSideColor.onFinishChange(function(){cancelAnimationFrame(request)});

conGridDisplay.onFinishChange(function(){cancelAnimationFrame(request)});
conGridSize.onFinishChange(function(){cancelAnimationFrame(request)});
conGridWidth.onFinishChange(function(){cancelAnimationFrame(request)});
conGridHeight.onFinishChange(function(){cancelAnimationFrame(request)});
conGridLineColor.onFinishChange(function(){cancelAnimationFrame(request)});
conGridBackColor.onFinishChange(function(){cancelAnimationFrame(request)});
