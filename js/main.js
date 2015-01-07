//Canvas initialisation
var canvas = document.getElementById("canvas");
canvas.width = Math.floor((window.innerWidth-80)/16)*16;
canvas.height = Math.floor((window.innerHeight-80)/16)*16;
var ctx = canvas.getContext("2d");
//Getting media
var mower = document.getElementById("mower");
var rock = document.getElementById("rock");
var grass = document.getElementById("grass");
var mowedgrassv = document.getElementById("mowedgrassv");
var mowedgrassh = document.getElementById("mowedgrassh");
var longgrass = document.getElementById("longgrass");
var fuel = document.getElementById("fuel");
var rip = document.getElementById("rip");
var scrunch = document.getElementById("scrunch");
var water = document.getElementById("water");
//Character positions and direction
var charx = 0.0;
var chary = 0.0;
//Chunk and world gen variables
var protomap = [];
var tempmaprow = [];
//Gameplay variables
var fuellevel = 50;
var fuelgauge = document.getElementById('fuelgauge');
fuelgauge.innerHTML='Fuel: ' + fuellevel;

//Map Gen
function genMap(xlim, ylim) {
	for (k=0; k<ylim; k++) {
		for (l=0; l<xlim; l++) {
			var randompercent = (Math.random()*99)+1;
			if (randompercent <= 25 && randompercent >= 1) {
				tempmaprow.push(0);
			}
			if (randompercent <= 75 && randompercent > 25) {
				tempmaprow.push(1);
			}
			if (randompercent <= 87.5 && randompercent > 75) {
				tempmaprow.push(2);
			}
			if (randompercent <= 100 && randompercent > 87.5) {
				tempmaprow.push(3);
			}
		}
		protomap.push(tempmaprow);
		tempmaprow = [];
	}
}
genMap(Math.floor(canvas.width/16), Math.floor(canvas.height/16));
drawMap(protomap);
ctx.drawImage(mower, 0, 0, 14, 16, charx, chary, 14, 16);
//Keyboardy stuff
function keys(event) {
	switch (event.keyCode) {
		case 87: //W
			if (fuellevel > 0 && chary > 0) {
				fuellevel--;
				chary-=16;
				if ((protomap[chary/16][charx/16] == 1) || (protomap[chary/16][charx/16] == 4)) {
					protomap[chary/16][charx/16] = 5;
					rip.pause();
					rip.play();
				}
				if (protomap[chary/16][charx/16] == 2) {
					protomap[chary/16][charx/16] = 1;
					rip.pause();
					rip.play();
				}
				drawMap(protomap);
				ctx.drawImage(mower, 0, 0 , 14, 16, charx, chary, 14, 16);
				fuelgauge.innerHTML='Fuel: ' + fuellevel;
				break;
			}
			if (fuellevel == 0) {
				fuelgauge.innerHTML='OUT OF FUEL!';
				break;
			}
			break;
		case 65: //A
			if (fuellevel > 0 && charx > 0) {
				fuellevel--;
				charx-=16;
				if ((protomap[chary/16][charx/16] == 1) || (protomap[chary/16][charx/16] == 5)) {
					protomap[chary/16][charx/16] = 4;
					rip.pause();
					rip.play();
				}
				if (protomap[chary/16][charx/16] == 2) {
					protomap[chary/16][charx/16] = 1;
					rip.pause();
					rip.play();
				}
				drawMap(protomap);
				ctx.drawImage(mower, 0, 0, 14, 16, charx, chary, 14, 16);
				fuelgauge.innerHTML='Fuel: ' + fuellevel;
				break;
			}
			if (fuellevel == 0) {
				fuelgauge.innerHTML='OUT OF FUEL!';
				break;
			}
			break;
		case 83: //S
			if (fuellevel > 0 && chary < canvas.height-16) {
				fuellevel--;
				chary+=16;
				if ((protomap[chary/16][charx/16] == 1) || (protomap[chary/16][charx/16] == 4)) {
					protomap[chary/16][charx/16] = 5;
					rip.pause();
					rip.play();
				}
				if (protomap[chary/16][charx/16] == 2) {
					protomap[chary/16][charx/16] = 1;
					rip.pause();
					rip.play();
				}
				drawMap(protomap);
				ctx.drawImage(mower, 0, 0, 14, 16, charx, chary, 14, 16);
				fuelgauge.innerHTML='Fuel: ' + fuellevel;
				break;
			}
			if (fuellevel == 0) {
				fuelgauge.innerHTML='OUT OF FUEL!';
				break;
			}
			break;
		case 68: //D
			if (fuellevel > 0 && charx < canvas.width-16) {
				fuellevel--;
				charx+=16;
				if ((protomap[chary/16][charx/16] == 1) || (protomap[chary/16][charx/16] == 5)) {
					protomap[chary/16][charx/16] = 4;
					rip.pause();
					rip.play();
				}
				if (protomap[chary/16][charx/16] == 2) {
					protomap[chary/16][charx/16] = 1;
					rip.pause();
					rip.play();
				}
				drawMap(protomap);
				ctx.drawImage(mower, 0, 0, 14, 16, charx, chary, 14, 16);
				fuelgauge.innerHTML='Fuel: ' + fuellevel;
				break;
			}
			if (fuellevel == 0) {
				fuelgauge.innerHTML='OUT OF FUEL!';
				break;
			}
			break;
		case 69: //E
			if (protomap[chary/16][charx/16] == 0) {
				protomap[chary/16][charx/16] = 1;
				scrunch.pause();
				scrunch.play();
			}
			if (protomap[chary/16][charx/16] == 3) {
					protomap[chary/16][charx/16] = 1;
					fuellevel += 20;
					water.pause();
					water.play();
			}
			drawMap(protomap);
			ctx.drawImage(mower, 0, 0, 14, 16, charx, chary, 14, 16);
			break;
	}
}
window.addEventListener('keydown', keys, false);

//Map drawing
function drawMap(map) {
	for (var i=0; i<map.length; i++) {
		for (var j=0; j<map[i].length; j++) {
			if (map[i][j] == 0) {
				ctx.drawImage(rock, 0, 0, 16, 16, j*16, i*16, 16, 16);
			}
			if (map[i][j] == 1) {
				ctx.drawImage(grass, 0, 0, 16, 16, j*16, i*16, 16, 16);
			}
			if (map[i][j] == 2) {
				ctx.drawImage(longgrass, 0, 0, 16, 16, j*16, i*16, 16, 16);
			}
			if (map[i][j] == 3) {
				ctx.drawImage(fuel, 0, 0, 16, 16, j*16, i*16, 16, 16);
			}
			if (map[i][j] == 4) {
				ctx.drawImage(mowedgrassh, 0, 0, 16, 16, j*16, i*16, 16, 16);
			}
			if (map[i][j] == 5) {
				ctx.drawImage(mowedgrassv, 0, 0, 16, 16, j*16, i*16, 16, 16);
			}
		}
	}
}
function inspect() {
	for (var aa=0; aa<protomap.length; aa++) {
		for (var bb=0; bb<protomap[aa].length; bb++) {
			if ((protomap[aa][bb] != 4) && (protomap[aa][bb] != 5)) {
				alert('Lawn Mowing is Insufficient!');
				return false;
			}
		}
	}
	alert('Lawn is good. You win!');
	return true;
}
function win() {
	for (var cc=0; cc<protomap.length; cc++) {
		for (var dd=0; dd<protomap[cc].length; dd++) {
			protomap[cc][dd]=4;
		}
	}
	drawMap(protomap);
	ctx.drawImage(mower, 0, 0, 14, 16, charx, chary, 14, 16);
}