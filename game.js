jQuery(document).ready(function($){
Crafty.init(1000, 500);
Crafty.background('rgb(127,127,127)');
MAX_HEIGHT = 200;
naturalDir = 1;
tranny_color1 = 'rgb(255,0,255)';
tranny_color2 = 'rgb(255,0,255)';
tranny_color3 = 'rgb(255,0,255)';
tranny_color4 = 'rgb(255,0,255)';
point1 = false;
point2 = false;
point3 = false;
point4 = false;
enemies = [];
playerSpeed = 10;
playerJump = 8;

  // The loading screen that will display while our assets load
  Crafty.scene("loading", function() {
  console.log('loading');
    // Load takes an array of assets and a callback when complete
    Crafty.load(["player.jpg"], function() {
      Crafty.scene("title"); //when everything is loaded, run the main scene
    });
    
    // Black background with some loading text
    Crafty.background('rgb(127,127,127)');
    Crafty.e("2D, DOM, Text").attr({w: 100, h: 20, x: 150, y: 120})
      .text("Loading")
      .css({"text-align": "center"});
  });
  
  Crafty.scene("dead", function() {
  	  Crafty.viewport.x = 0;
  	  Crafty.e("2D, DOM, Text").attr({w: 1000, h: 20, x: 0, y: 120})
	      .text("You have died. Press SPACE to Try Again.")
	      .css({"text-align": "center", "font-family":"VT323", "font-size":"24px", "color":"#000"})
	      .bind('KeyDown', function(e) {
		      if(e.key == Crafty.keys['SPACE']) {
			      Crafty.scene("main");
			  }
		  });
	  console.log('dead');
  });
  
  Crafty.scene("won", function() {
	  Crafty.viewport.x = 0;
	  Crafty.e("2D, DOM, Text").attr({w: 1000, h: 20, x: 0, y: 120})
	      .text("You have won.")
	      .css({"text-align": "center", "font-family":"VT323", "font-size":"24px", "color":"#000"})
	  console.log('won');
  });
  
  Crafty.scene("title", function() {
  	  Crafty.e("2D, DOM, Text").attr({w: 1000, h: 20, x: 0, y: 120})
	      .text("Game Title")
	      .css({"text-align": "center", "color":"#000", "font-family":"VT323"});
	  Crafty.e("2D, DOM, Text").attr({w: 1000, h: 20, x: 0, y: 420})
	      .text("PRESS SPACE TO CONTINUE")
	      .css({"text-align": "center", "color":"#000", "font-family":"VT323", "font-size":"36px"})
	      .bind('KeyDown', function(e) {
		      if(e.key == Crafty.keys['SPACE']) {
			      Crafty.scene("main");
			  }
		  });
	  console.log('title');
  });
  
  Crafty.scene("main", function() {
	Crafty.background('rgb(127,127,127)');
    function createPlatform(rgb, x, y, w, h){
	if(!rgb){
		rgb = 'rgb(0,0,0)';
	}
	if(!h){
		h = w;
	}
	if(!x){
		x = 0;
	}
	if(!y){
		y = 0;
	}
	if(!w){
		w = 100;
	}
	var p = Crafty.e("platform, 2D, DOM, Color, Collision")
    .color(rgb)
    .attr({ x: x, y: y, w: w, h: h })
    .collision();
    return p;
}

function createEnemy(dir, dist, rgb, x, y, w, h){
	var origx = x;
	var origy = y;
	left = false;
	right = false;
	up = false;
	down = false;

	if(!dir){
		dir = 'lr';
	}

	if(!dist){
		dist = 40;
	}
	if(!rgb){
		rgb = 'rgb(0,0,0)';
	}
	if(!h){
		h = w;
	}
	if(!x){
		x = 0;
	}
	if(!y){
		y = 0;
	}
	if(!w){
		w = 100;
	}
	var enemy = Crafty.e("enemy, 2D, DOM, Color, Tween, Collision")
    .color(rgb)
    .attr({ x: x, y: y, w: w, h: h, origx: x, origy: y })
    .collision()
    .bind('EnterFrame', function () {
    	if(point1 && point2 && point3 && point4){
	    	Crafty.scene("won");
    	}
    	if(point1){
	    	// deres stage 1

    	}
    	if(point1 && point2){
	    	// deres stage 2
	    	
    	}
    	if(point1 && point2 && point3){
	    	// deres stage 3
	    	
    	}
/*
    	if(dir == 'lr'){
		    if(this.x >= origx+(dist/2) && right == true){
		    	right = false;
		    	left = true;
			    this.tween({x: origx-(dist/2), y: y}, 60)
		    } else if(this.x <= origx-(dist/2) && left == true){
		    	right = true;
		    	left = false;
			    this.tween({x: origx+(dist/2), y: y}, 60)
		    }
    	} else if (dir == 'ud'){
		    if(this.y >= origy+(dist/2) && down == true){
		    	down = false;
		    	up = true;
			    this.tween({x: x, y: origy-(dist/2)}, 60)
		    } else if(this.y <= origy-(dist/2) && up == true){
		    	down = true;
		    	up = false;
			    this.tween({x: x, y: origy+(dist/2)}, 60)
		    }
		}
*/
    })
    .bind('TweenEnd', function(){
	    if(dir == 'lr'){
		    if(this.x >= origx+(dist/2)){
			    this.tween({x: origx-(dist/2), y: y}, 60)
		    } else if(this.x <= origx-(dist/2)){
			    this.tween({x: origx+(dist/2), y: y}, 60)
		    }
    	} else if (dir == 'ud'){
		    if(this.y >= origy+(dist/2)){
			    this.tween({x: x, y: origy-(dist/2)}, 60)
		    } else if(this.y <= origy-(dist/2)){
			    this.tween({x: x, y: origy+(dist/2)}, 60)
		    }
		}
    });
    if(dir == 'lr'){
		right = true;
		enemy.tween({x: origx+(dist/2), y: y}, 30)
	}

	
	if(dir == 'ud'){
		down = true;
		enemy.tween({x: x, y: origy+(dist/2)}, 30)
	}
    return enemy;
}

var playerSprite = Crafty.sprite(60, 60, "player.jpg", {
    walkleft: [0, 0, 60, 60],
    wakright: [0, 1, 60, 60]
});

var ground = Crafty.e("platform, 2D, DOM, Collision, Color")
    .color('rgb(0,255,0)')
    .attr({ x: 0, y: 460, w: 11000, h: 40 })
    .collision()
    .onHit("Player", function(obj){
	    hit = true;
    });
    
var p1 = createPlatform('rgb(0,255,0)', 100, 100, 100, 10);
var p2 = createPlatform('rgb(0,255,0)', 140, 200, 100, 10);
var p3 = createPlatform('rgb(0,255,0)', 500, 100, 100, 30);
var p4 = createPlatform('rgb(0,255,0)', 840, 200, 10, 30);
var enemy1 =  createEnemy('ud', 200, 'rgb(255,0,0)', 300, 100, 20, 20);
var enemy2 =  createEnemy('lr', 100, 'rgb(255,0,0)', 200, 200, 20, 20);
var enemy3 =  createEnemy('lr', 200, 'rgb(255,0,0)', 200, 300, 20, 20);
var enemy4 =  createEnemy('ud', 100, 'rgb(255,0,0)', 200, 400, 20, 20);
var enemy5 =  createEnemy('lr', 200, 'rgb(255,0,0)', 400, 100, 20, 20);
var enemy6 =  createEnemy('lr', 100, 'rgb(255,0,0)', 400, 200, 20, 20);
var enemy7 =  createEnemy('ud', 200, 'rgb(255,0,0)', 400, 300, 20, 20);
var enemy8 =  createEnemy('lr', 100, 'rgb(255,0,0)', 400, 400, 20, 20);
/* var enemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8]; */
	
var tranny1 = Crafty.e("tranny1, 2D, DOM, Color, Collision")
	.color(tranny_color1)
	.attr({x: 600, y: 440, w: 20, h: 20})
	.collision();

var tranny2 = Crafty.e("tranny2, 2D, DOM, Color, Collision")
	.color(tranny_color2)
	.attr({x: 700, y: 440, w: 20, h: 20})
	.collision();

var tranny3 = Crafty.e("tranny3, 2D, DOM, Color, Collision")
	.color(tranny_color3)
	.attr({x: 800, y: 440, w: 20, h: 20})
	.collision();
	
var tranny4 = Crafty.e("tranny4, 2D, DOM, Color, Collision")
	.color(tranny_color4)
	.attr({x: 900, y: 440, w: 20, h: 20})
	.collision();
    
var sherwood = Crafty.e("Player, 2D, DOM, Color, Gravity, Twoway, Controls, Collision, walkleft, walkright, SpriteAnimation")
    .color('rgb(0,0,255)')
    .attr({ x: 100, y: 150, w: 60, h: 60, 
            dX: Crafty.math.randomInt(2, 5), 
            dY: Crafty.math.randomInt(2, 5) })
    .bind("NewDirection", function (direction) {
    			 if ((direction.x < 0) && (!this.isPlaying("walk_left"))) this.stop().animate("walk_left", 6, -1);
    			 if ((direction.x > 0) && (!this.isPlaying("walk_right"))) this.stop().animate("walk_right", 3, -1);
/*
		        if (direction.x < 0) {
		            if (!this.sprite.isPlaying("walk"))
		                this.sprite.stop().animate("walk", 0, 0, 6)
		        }
		        if (direction.x > 0) {
		            if (!this.sprite.isPlaying("walk"))
		                this.sprite.stop().animate("walk", 0, 0, 6)
		        }
*/
		        if(!direction.x && !direction.y) {
		            this.stop();
		        }
		  })
    .gravity("platform")
    .gravityConst(.1)
    .animate('walk_left', 0, 0, 6)
    .animate('walk_right', 0, 1, 3)
    .twoway(playerSpeed, playerJump)// 1=1, 1.2=5 2=15, 3=50, 4=80, 5=120
    .collision()
    .bind('EnterFrame', function () {
		Crafty.viewport.x = -this.x+100;
    })
	.onHit('platform',function(ent){
		var target = ent[0]; //get the object of the collided EntityReference
		if(this.y>target.obj._y){
			this.y = target.obj._y+target.obj._h;
		}
	})
	.onHit('tranny1', function(ent){
		tranny1.requires('Keyboard').bind('KeyDown', function () { 
			if (tranny1.isDown('SPACE') && point1 == false) {
				tranny_color1 = 'rgb(255,255,255)';
				tranny1.color(tranny_color1);
				point1 = true;
				playerSpeed = 2;
				playerJump = 2;
				console.log(playerJump);
				sherwood.twoway(playerSpeed, -3)
			}
		});
	})
	.onHit('tranny2', function(ent){
		tranny2.requires('Keyboard').bind('KeyDown', function () { 
			if (tranny2.isDown('SPACE') && point2 == false) {
				tranny_color2 = 'rgb(255,255,255)';
				tranny2.color(tranny_color2);
				point2 = true;
			}
		});
	})
	.onHit('tranny3', function(ent){
		tranny3.requires('Keyboard').bind('KeyDown', function () { 
			if (tranny3.isDown('SPACE') && point3 == false) {
				tranny_color3 = 'rgb(255,255,255)';
				tranny3.color(tranny_color3);
				point3 = true;
			}
		});
	})
	.onHit('tranny4', function(ent){
		tranny4.requires('Keyboard').bind('KeyDown', function () { 
			if (tranny4.isDown('SPACE') && point4 == false) {
				tranny_color4 = 'rgb(255,255,255)';
				tranny4.color(tranny_color4);
				point4 = true;
			} 
		});
	})
	.onHit('enemy', function(ent){
		console.log("You're hurting me!!!");
		Crafty.scene("dead");
	/*
	this.x += Math.ceil(target.normal.x * -target.overlap);
	this.y += Math.ceil(target.normal.y * -target.overlap);
	*/
	});

  });
  Crafty.scene("loading");
});
