(function(){var s = document.createElement("script");s.setAttribute("src","template.js");document.head.appendChild(s);})()
function start(){
	U.empty();
	U.camera.centerZero();
	U.bcolor = "grey";
	U.add(new (function(){
		this.rl = 1;
		this.keydown = function(k){
			switch (k.name){
				case "esc":
					if (slotTaken(galaxy.slot))
						deleteSlot(galaxy.slot);
					start();
				break;
				case "n1":
					galaxy.visibleSize = 20;
				break;
				case "n2":
					galaxy.visibleSize = 15;
				break;
				case "n3":
					galaxy.visibleSize = 10;
				break;
			}
		}
		this.render = function(g){
			g.font = "20px Arial";
			g.fillStyle = "white";
			g.fillText("Press esc for fresh start",-250+U.w/2, 30-U.h/2);
			g.fillText("Press 1, 2, or 3 to toggle zoom",-280+U.w/2, 60-U.h/2);
		}
	})());
	StartGame();
	//ShowInstructions();
}
function StartGame(){
	
	Physics.setScale(100);
	U.add(makeShortcut(new UI.DBox(-500,-500,700,700),"World",true));
	U.add(makeShortcut(new UI.DBox(200,200,300,300),"Minimap",true));
	Minimap.bcolor = "grey";
	//U.add(makeShortcut(new UI.DBox(-500,-500,700,700),"World"));
	//U.add(makeShortcut(new UI.DBox(-500,-500,700,700),"World"));
	World.camera.setGrid(true);
	World.bcolor = "grey";
	World.add(new UI.DBox(),"bullets");
	World.add(new UI.DBox(),"bullets.p");
	World.add(new UI.DBox(),"bullets.e");
	World.add(new UI.DBox(),"entities");
	World.add(new UI.DBox(),"entities.player");
	World.add(new UI.DBox(),"ores");
	World.add(new UI.DBox(),"drops");
	World.add(new UI.DBox(),"structures");
	U.add(new UI.DBox(),"follows");
	U.add(new UI.DBox(),"misc");
	World.add(new UI.DBox(),"sectors");
	var slot = 1;
	//deleteSlot(slot);
	//if (!slotTaken(slot))
			World.add(makeShortcut(new Galaxy().setSlot(slot),"galaxy",true));
		galaxy.load();
		
		//galaxy.load();
	//else	World.add(makeShortcut(new Galaxy().setSlot(slot).load(),"galaxy"));
	//deleteSlot(1);
	//if (!slotTaken(slot))
	//		World.add(makeShortcut(new Galaxy().setSlot(slot).startTutorial(),"galaxy"));
	//else 	World.add(makeShortcut(new Galaxy().setSlot(slot).load(),"galaxy"));
	World.get("entities").ul = -1;
	World.get("entities").rl = 1;
	World.get("entities.player").ul = -1;
	World.get("bullets").rl = -1;
	//U.get("follows").ul = 2;
	World.get("sectors").hidden = true;
	//World.camera.zoom(World.w/Physics.scale/galaxy.visibleSize);
	window.onbeforeunload = function(){
		galaxy.save(true);
		return null;
	}
	//for (var i = 1; i < 6; i++)
	//	for (var j = 1; j < 6; j++)
			//U.add(new T1Ore(3,3).build(),"ores.");
	//if (!slotTaken(2))
	//	U.get("Galaxy").save(2);
	
	//U.add(new Player(),"player");
	//U.add(new UI.DBox(),"drops");
	//U.add(new UI.DBox(),"enemies");
	//Math.seedrandom("x0y0");
	//console.log(Math.random());
	//U.add(new Utils.Repeater().setDelay(1/4).setOncomp(function(){U.add(new OriginalEnemy(),"enemies.")}).setOnfinish(function(){
	//	U.add(new Utils.Listener(function(){return U.get("enemies").getq().length == 0},function(){U.add(new Utils.Timer(0).setAuto(true,function(){start()}).start());return true;}));}));
	//U.add(new SB());
}
/*function BlankSlate(){
	Physics.setScale(100);
	U.empty();
	U.add(makeShortcut(new UI.DBox(-500,-500,700,700),"World"));
	U.add(makeShortcut(new UI.DBox(200,200,300,300),"Minimap"));
	Minimap.bcolor = "grey";
	//U.add(makeShortcut(new UI.DBox(-500,-500,700,700),"World"));
	//U.add(makeShortcut(new UI.DBox(-500,-500,700,700),"World"));
	World.camera.setGrid(true);
	World.bcolor = "grey";
	World.add(new UI.DBox(),"bullets");
	World.add(new UI.DBox(),"bullets.p");
	World.add(new UI.DBox(),"bullets.e");
	World.add(new UI.DBox(),"entities");
	World.add(new UI.DBox(),"entities.player");
	World.add(new UI.DBox(),"ores");
	World.add(new UI.DBox(),"drops");
	World.add(new UI.DBox(),"structures");
	U.add(new UI.DBox(),"follows");
	U.add(new UI.DBox(),"misc");
	World.add(new UI.DBox(),"sectors");
	var slot = 1;
	//deleteSlot(slot);
	//if (!slotTaken(slot))
			World.add(makeShortcut(new Galaxy().setSlot(slot),"galaxy"));
		galaxy.load();
		
		//galaxy.load();
	//else	World.add(makeShortcut(new Galaxy().setSlot(slot).load(),"galaxy"));
	//deleteSlot(1);
	//if (!slotTaken(slot))
	//		World.add(makeShortcut(new Galaxy().setSlot(slot).startTutorial(),"galaxy"));
	//else 	World.add(makeShortcut(new Galaxy().setSlot(slot).load(),"galaxy"));
	World.get("entities").ul = -1;
	World.get("entities").rl = 1;
	World.get("entities.player").ul = -1;
	World.get("bullets").rl = -1;
	//U.get("follows").ul = 2;
	World.get("sectors").hidden = true;
}*/
function deleteSlot(slot){
	localStorage.removeItem("SaveSlot"+slot);
}
function slotTaken(slot){
	return localStorage.getItem("SaveSlot"+slot) != null;
}
function Galaxy(){
	var sectorWrap = false;
	var wrappingSector;
	//this.init = function(){this.startGame();}
	this.init = function(){
		this.seed = Math.random();
		this.sectorSize = 50;
		this.visibleSize = 30;
		//this.center = {x:0,y:0};
		//U.container.add(new (function(){
		//		this.render = function(g){
		//			g.fillStyle = "red";
		//			g.fillText(""+World.get("ores").getq().length,0,0)
		//		}
		//})());
		//World.camera.zoom(World.w/Physics.scale/galaxy.visibleSize);
	}
	this.setSlot = function(slot){
		this.slot = slot;
		return this;
	}
	this.startTutorial = function(){
		//this.sectorSize = 10;
		this.visibleSize = 11;
		this.createSave();
		this.toggleWrap(true);
		return this;
	}
	this.startGame = function(){
		//this.save();
		//		World.add(new Sector(0,0).generate(),"sectors.X"+0+"Y"+0);
	}
	this.unloadSector = function(x,y){
		if (World.has("sectors.X"+x+"Y"+y))
			World.get("sectors.X"+x+"Y"+y).remove();
	}
	this.toggleWrap = function(on){
		if (typeof on == "undefined")
			sectorWrap = !sectorWrap;
		else	sectorWrap = on;
		if (!sectorWrap)
			return;
		wrappingSector = World.get("entities.player.p").getSector();
		for (var y = wrappingSector.y-1; y <= wrappingSector.y+1; y++)
			for (var x = wrappingSector.x-1; x <= wrappingSector.x+1; x++)
				if (y!=wrappingSector.y||x!=wrappingSector.x)
					this.unloadSector(x,y);
	}
	this.update = function(){
		World.camera.zoomto(World.w/Physics.scale/galaxy.visibleSize);
		if (!sectorWrap)
			return;
		var p = World.get("entities.player.p"),
			ps = p.getSector(),
			dx = ps.x-wrappingSector.x,
			dy = ps.y-wrappingSector.y,
			s = this.sectorSize,
			v = this.visibleSize;
			//console.log(ps);
		//if (Math.abs(ps.x)>0 && Math.abs
		//if (Math.abs(dx)>0 && Math.abs(s/2-ps.xx)<=s/2-this.visibleSize/2)	p.abb.pos.x-=Math.sign(ps.x)*(s+this.visibleSize);
		//if (Math.abs(dy)>0 && Math.abs(s/2-ps.yy)<=s/2-this.visibleSize/2)	p.abb.pos.y-=Math.sign(ps.y)*(s+this.visibleSize);
		if (dx!=0 && Math.abs(s/2-ps.xx)<s/2-this.visibleSize/2-1)
			p.abb.pos.x-=Math.sign(dx)*(s+this.visibleSize+2);
		if (dy!=0 && Math.abs(s/2-ps.yy)<s/2-this.visibleSize/2-1)
			p.abb.pos.y-=Math.sign(dy)*(s+this.visibleSize+2);
	}
	this.save = function(override){
		if (slotTaken(this.slot)&&!override){
			console.log("Save slot already taken.");
			return;
		}
		//var savefile = {
		//	gsave:this.getSave(),
		//	psave:World.get("entities.player.p").getSave()
		//};
		localStorage.setItem("SaveSlot"+this.slot,JSON.stringify(this.getSave()));
	}
	this.load = function(){
		if (!slotTaken(this.slot)){
			console.log("No save exists in this slot.");
			return this.createSave();
		}
		//var loadfile = JSON.parse(localStorage.getItem("SaveSlot"+this.slot));
		return this.loadSave(JSON.parse(localStorage.getItem("SaveSlot"+this.slot)));
		//this.center = {x:0,y:0};
		
		
		//this.seed = loadfile.gseed;this.startGame();
		//World.get("entities.player.p").loadSave(loadfile.psave);
		//return this;
	}
	this.createSave	= function(){
		World.add(new UI.DBox(),"Tutorial");
		World.add(new Tutorial(),"Tutorial.t");
		World.get("Tutorial.t").createSave();
		
		//World.add(new Player(),"entities.player.p");
		//for (var i = -1; i <= 1; i++)
		//	for (var j = -1; j <= 1; j++)
		//		World.add(new Sector(i,j).generate(),"sectors.X"+i+"Y"+j);
	}
	this.loadSave = function(file){
		this.createSave();
		this.seed = file.gsave.seed;
		this.sectorSize = file.gsave.ssize;
		this.visibleSize = file.gsave.vsize;
		//World.camera.zoom(World.w/Physics.scale/galaxy.visibleSize);
		
		World.get("Tutorial.t").loadSave(file.tsave);
		
		//World.add(new Player(),"entities.player.p");
		var p = World.get("entities.player.p");
		p.loadSave(file.psave);
		var px = p.getSector().x,
			py = p.getSector().y;
		//for (var i = -1; i <= 1; i++)
		//	for (var j = -1; j <= 1; j++)
		//		World.add(new Sector(px+i,py+j).generate(),"sectors.X"+(px+i)+"Y"+(py+j));
	}
	this.getSave = function(){
		return {
			gsave:{
				seed:this.seed,
				ssize:this.sectorSize,
				vsize:this.visibleSize
			},
			psave:World.get("entities.player.p").getSave(),
			tsave:World.get("Tutorial.t").getSave()
		};
	}
}
function Tutorial(){
			var txt = new (function(){
					this.clear = function(){this.txt = ["","","","","",""];}
					this.clear();
					this.render = function(g){
						g.fillStyle = "white";
						g.font = "40px Arial";
						for (var i = 0; i < this.txt.length; i++)
							Drw.drawCText(g,this.txt[i],this.x,this.y+45-i*45);
					}
				})(),
				box = new UI.DBox(),
				spacecont = new spaceCont();
			//T.container.add(txt);
			function spaceCont(){
				this.ready = false;
				this.down = false;
				this.consume = function(){
					if (this.ready){
						this.ready = false;
						return true;
					}
				}
				this.keydown = function(k){
					if (k.name == "space" && !this.down){
						this.ready = true;
						this.down = true;
					}
				}
				this.keyup = function(k){
					if (k.name == "space")
						this.down = false;
				}
			}
			function randpos(){		return new Physics.Vec(Math.random()*galaxy.sectorSize,Math.random()*galaxy.sectorSize);	}
			function Tutbullet(pos,vel,col){
				var T = World.get("Tutorial.t"),
					Tc= T.container,
					p = World.get("entities.player.p");
				this.init = function(){
					this.abb = new Physics.ABB(pos.copy()||new Physics.Vec(),.2,.2).setVel(vel||new Physics.Vec()).setColor(col);
					this.range = 8;
					this.pierce = 0;
				}
				this.update = function(delta){
					this.abb.update(delta);
					var x = this.abb.pos.x,
						y = this.abb.pos.y;
					if (x < 0 || y < 0 || x > galaxy.sectorSize || y > galaxy.sectorSize)
						this.pierce--;//this.container.remove(this);
					this.range -= this.abb.vel.copy().mult(delta).len();
					if (this.range < 0 || this.pierce < 0)
						this.container.remove(this);
				}
				this.render = function(g){
					this.abb.render(g);
				}
			}
			function Tutweapon(){
				var T = World.get("Tutorial.t"),
					Tc= T.container,
					p = World.get("entities.player.p");
				this.target = new Physics.Vec();
				this.barrel = new Physics.Vec(.35,0);
				this.coold = new Utils.Timer(.35).start(true).setLoop(true);
				this.aimat = function(vec){
					this.target = vec.copy();
					this.barrel.rotateto(vec.sub(this.owner.abb.pos).ang());
				}
				this.update = function(delta){
					this.coold.update(delta);
					if (Ms.isdown())
						if (this.coold.consume())
							this.fire();
				}
				this.fire = function(){
					World.add(new Tutbullet(this.owner.abb.pos.copy().add(this.barrel),this.target.copy().sub(this.owner.abb.pos).setLen(10)),"bullets.p.");					
				}
				this.render = function(g){ 
					g.fillStyle="darkgrey";
					//if(this.hp>0)
					//	g.fillRect(-25,20,this.hp/this.mhp*50,5);
					g.rotate(this.barrel.ang());
					g.fillRect(0,-5,this.barrel.len()*Physics.scale,10)
				}
			}
			function hoop(){
			var T = World.get("Tutorial.t"),
				Tc= T.container,
				p = World.get("entities.player.p");
				this.init = function(){
					this.abb = new Physics.ABB(
						new Physics.Vec(Math.random()*galaxy.sectorSize,Math.random()*galaxy.sectorSize),
						//World.get("entities.player.p").abb.pos.copy().add(new Physics.Vec(4,0).rotate(Math.random()*2*Math.PI)),
						1,1
					).setColor("red");
				}
				this.update = function(){
					var p = World.get("entities.player.p");
					if (this.abb.collide(p.abb)){
						this.pget("t").substage--;
						//console.log(this.container);
						if (this.pget("t").substage > 0)
							this.container.add(new hoop());
						else txt.clear();
						this.container.remove(this);
					}
				}
				this.render = function(g){
					g.lineWidth = 5;
					this.abb.render(g);
					var x = Physics.tscale(this.abb.pos.x),
						y = Physics.tscale(this.abb.pos.y),
						s = Physics.scale;
					b = World.getbounds();
					if (y + s/2 > b.d) y = b.d - s/2;
					if (y - s/2 < b.u) y = b.u + s/2;
					if (x + s/2 > b.r) x = b.r - s/2;
					if (x - s/2 < b.l) x = b.l + s/2;
					//if (x > b.r-330) x = b.r-330;
					//if (x < b.l) x = b.l;
					g.fillRect(x-s/2,y-s/2,s,s);
				}
			}
			function Tutenemy1(pos){
			var T = World.get("Tutorial.t"),
				Tc= T.container,
				p = World.get("entities.player.p");
				this.init = function(){
					this.abb = new Physics.ABB(pos.copy()||new Physics.Vec(),.7,.7).setColor("orange");
				}
				this.update = function(){
					var bb = World.get("bullets.p"),
						bs = bb.getq();
					for (var b in bs)
						if (bs[b].abb.collide(this.abb)){
							//bb.remove(bs[b]);
							bs[b].pierce--;
							this.container.remove(this);
						}
				}
				this.render = function(g){
					this.abb.render(g);
					var x = Physics.tscale(this.abb.pos.x),
						y = Physics.tscale(this.abb.pos.y),
						s = Physics.scale*.7;
					b = World.getbounds();
					if (y + s/2 > b.d) y = b.d - s/2;
					if (y - s/2 < b.u) y = b.u + s/2;
					if (x + s/2 > b.r) x = b.r - s/2;
					if (x - s/2 < b.l) x = b.l + s/2;
					//if (x > b.r-330) x = b.r-330;
					//if (x < b.l) x = b.l;
					g.fillRect(x-s/2,y-s/2,s,s);
				}
			}
			function Tutenemy2(pos){
			var T = World.get("Tutorial.t"),
				Tc= T.container,
				p = World.get("entities.player.p");
				this.init = function(){
					this.abb = new Physics.ABB(pos.copy()||new Physics.Vec(),.7,.7).setColor("orange").setMaxVel(4);
					this.dest = randpos();
					this.timer = new Utils.Timer(3).setLoop(true).start();
				}
				this.update = function(delta){
					var bb = World.get("bullets.p"),
						bs = bb.getq();
					this.abb.addVel(this.dest.copy().sub(this.abb.pos).setLen(5*delta));
					//this.abb.addVel(new Physics.Vec((Math.random()-.5)*delta,(Math.random()-.5)*delta));
					this.abb.update(delta);
					if (this.abb.pos.copy().sub(this.dest).len() < 1 || this.timer.consume()){
						this.dest = randpos();
						this.timer.start();
					}
					for (var b in bs)
						if (bs[b].abb.collide(this.abb)){
							//bb.remove(bs[b]);
							bs[b].pierce--;
							this.container.remove(this);
							T.substage--;
						}
				}
				this.render = function(g){
					this.abb.render(g);
					var x = Physics.tscale(this.abb.pos.x),
						y = Physics.tscale(this.abb.pos.y),
						s = Physics.scale*.7;
					b = World.getbounds();
					if (y + s/2 > b.d) y = b.d - s/2;
					if (y - s/2 < b.u) y = b.u + s/2;
					if (x + s/2 > b.r) x = b.r - s/2;
					if (x - s/2 < b.l) x = b.l + s/2;
					//if (x > b.r-330) x = b.r-330;
					//if (x < b.l) x = b.l;
					g.fillRect(x-s/2,y-s/2,s,s);
				}
			}
			function DroppingTarget(pos){
				var T = World.get("Tutorial.t"),
					Tc= T.container,
					p = World.get("entities.player.p");
				this.init = function(){
					this.hp = this.mhp = 2;
					var that = this;
					this.abb = new Physics.ABB(pos.copy()||new Physics.Vec(),1,1).setColor("cyan").setPartial(true,function(){
						return that.hp/that.mhp;
					});
				}
				this.update = function(){
					var bb = World.get("bullets.p"),
						bs = bb.getq();
					for (var b in bs)
						if (bs[b].abb.collide(this.abb)){
							//bb.remove(bs[b]);
							bs[b].pierce--;
							this.hp--;
							if (this.hp <= 0){
								for (var i = 0; i < 4; i++)
									World.add(new Tutdrop(this.abb.pos),"drops.");
								this.container.remove(this);
								if (T.substage > 0)
									T.substage--;
							}
						}
				}
				this.render = function(g){
					//this.abb.render(g);
					var x = Physics.tscale(this.abb.pos.x),
						y = Physics.tscale(this.abb.pos.y),
						s = Physics.scale*1,
						pos = this.abb.pos.copy();
					b = World.getbounds();
					if (y + s/2 > b.d) y = b.d - s/2;
					if (y - s/2 < b.u) y = b.u + s/2;
					if (x + s/2 > b.r) x = b.r - s/2;
					if (x - s/2 < b.l) x = b.l + s/2;
					this.abb.pos = new Physics.Vec(x,y).mult(1/Physics.scale);
					this.abb.render(g);
					this.abb.pos = pos;
					//if (x==Physics.tscale(this.abb.pos.x)&&y==Physics.tscale(this.abb.pos.y))
					//	return;
					//if (x > b.r-330) x = b.r-330;
					//if (x < b.l) x = b.l;
					//g.fillRect(x-s/2,y-s/2,s,s);
				}
			}
			function Tutdrop(pos){
				var T = World.get("Tutorial.t"),
					Tc= T.container,
					p = World.get("entities.player.p");
				this.init = function(){
					this.abb = new Physics.ABB(pos.copy()||new Physics.Vec(),.25,.25).setColor("cyan");
					this.abb.setVel(new Physics.Vec(20,0).rotateto(Math.random()*2*Math.PI));//.setMaxVel(15);
					this.range = 1.5;
					this.speed = 1;
				}
				this.update = function(delta){
					this.abb.update(delta);
					var pdist = p.abb.pos.copy().sub(this.abb.pos);
					
					if (this.range > 0)
						this.range-=this.abb.vel.len()*delta;
					//this.abb.maxVel-=100*delta;
					//if (this.abb.maxVel < .2)
					if (this.range < 0){
						this.abb.setVel(new Physics.Vec());
						this.range = 0;
					}
					if (this.range != 0) return;
					if (pdist.len() < 2){
						this.abb.setVel(pdist.setLen(this.speed+=.5));
						//this.abb.addVel(pdist.setLen(3*delta));
						//return;
					}
					else this.abb.setVel(new Physics.Vec());
					if (this.abb.collide(p.abb)){
						this.container.remove(this);
						return;
					}
				}
				this.render = function(g){
					this.abb.render(g);
				}
			}
	var Stages = new Utils.Sequence(
	[{//movement - going through hoops etc.
		c:function(){return World.get("Tutorial.t").substage == 0;},
		e:function(){
			var T = World.get("Tutorial.t"),
				Tc= T.container,
				p = World.get("entities.player.p");
			//var T = World.get("Tutorial.t");
			T.stage = 1;
			T.substage = 3;
			/*var txt = new (function(){
				this.clear = function(){this.txt = ["","","","","",""];}
				this.clear();
				this.render = function(g){
					g.fillStyle = "white";
					g.font = "40px Arial";
					for (var i = 0; i < this.txt.length; i++)
						Drw.drawCText(g,this.txt[i],this.x,this.y+45-i*45);
				}
			})();*/
			
			Tc.add(new Utils.Sequence([
			{
				c:function(){return true},
				e:function(){
					txt.clear();
					txt.txt[1] = "Welcome to the Tutorial";
					txt.txt[0] = "[SPACE]";
				}
			},{
				c:function(){return spacecont.consume()},
				e:function(){
					txt.clear();
					txt.txt[1] = "Use WASD to move";
					txt.txt[0] = "[SPACE]";
				}
			},{
				c:function(){return spacecont.consume()},
				e:function(){
					txt.clear();
					txt.txt[1] = "Run into the Red";
					txt.txt[0] = "Squares to continue";
					World.add(new hoop(),"Tutorial.");
				}
			}
			]));
			/*
			txt.clear();
			txt.txt[1] = "Welcome to the Tutorial";
			txt.txt[0] = "[SPACE]";
			Tc.add(new spaceCont(function(){
				txt.clear();
				txt.txt[1] = "Use WASD to move";
				txt.txt[0] = "[SPACE]";
			Tc.add(new spaceCont(function(){
				txt.clear();
				txt.txt[1] = "Use WASD to move";
				txt.txt[0] = "[SPACE]";
			}));
			}));*
			T.container.add(new Utils.TimedSequence([
			{
				c:0,e:function(){
					txt.clear();
					txt.txt[0] = "Welcome to the Tutorial";
				}
			},{
				c:2,e:function(){
					txt.clear();
					txt.txt[0] = "Use WASD to move";
				}
			},{
				c:2,e:function(){
					txt.clear();
					txt.txt[1] = "Run into the Red";
					txt.txt[0] = "Squares to continue";
					World.add(new hoop(),"Tutorial.");
				}
			}
			]));*/
		}
	},{//shooting - aiming and shooting at targets
		c:function(){return World.get("Tutorial.t").substage == 0;},
		e:function(){
			var T = World.get("Tutorial.t"),
				Tc= T.container,
				p = World.get("entities.player.p");
			//Tc.add(txt);
			Tc.add(box,"sbox");
			//U.add(new UI.Follow(txt,World.get("entities.player.p").abb.pos,0,-1,Physics.scale),"follows.");
			T.stage = 2;
			T.substage = 2;
			var targetspawns = new Utils.Sequence([
			{
				c:function(){return true;},
				e:function(){
					for (var i = 0; i < 3; i++)
						Tc.add(new Tutenemy1(randpos()),"sbox.");
				}
			},{
				c:function(){return Tc.get("sbox").getq().length == 0},
				e:function(){
					for (var i = 0; i < 2; i++)
						Tc.add(new Tutenemy2(randpos()),"sbox.");
				}
			}
			])
			
			
			Tc.add(new Utils.Sequence([
			{
				c:function(){return true},
				e:function(){
					txt.clear();
					txt.txt[2] = "You have been given";
					txt.txt[1] = "your first weapon";
					txt.txt[0] = "[SPACE]";
				}
			},{
				c:function(){return spacecont.consume()},
				e:function(){
					txt.clear();
					txt.txt[2] = "Use the mouse to aim";
					txt.txt[1] = "and click to shoot";
					txt.txt[0] = "[SPACE]";
				}
			},{
				c:function(){return spacecont.consume()},
				e:function(){
					txt.clear();
					txt.txt[2] = "For now you can only";
					txt.txt[1] = "shoot while in the main sector";
					txt.txt[0] = "[SPACE]";
				}
			},{
				c:function(){return spacecont.consume()},
				e:function(){
					txt.clear();
					txt.txt[1] = "Shoot all the targets";
					txt.txt[0] = "to continue";
					Tc.add(targetspawns);
				}
			}
			]));/*
			Tc.add(new Utils.TimedSequence([
			{
				c:0,e:function(){
					txt.clear();
					txt.txt[1] = "You have been given";
					txt.txt[0] = "your first weapon";
				}
			},{
				c:3,e:function(){
					txt.clear();
					txt.txt[1] = "Use the mouse to aim";
					txt.txt[0] = "and click to shoot";
				}
			},{
				c:3,e:function(){
					txt.clear();
					txt.txt[1] = "For now you can only";
					txt.txt[0] = "shoot while in the main sector";
				}
			},{
				c:3,e:function(){
					txt.clear();
					txt.txt[1] = "Shoot all the targets";
					txt.txt[0] = "to continue";
					Tc.add(targetspawns);
					//txt.txt[1] = "For now you can only";
					//txt.txt[0] = "shoot while in the main sector";
				}
			}
			]));*/
			p.weapon = new Tutweapon();
			p.weapon.owner = p;
		}
	},{//drops - picking up drops
		c:function(){return World.get("Tutorial.t").substage == 0;},
		e:function(){
			var T = World.get("Tutorial.t"),
				Tc= T.container,
				p = World.get("entities.player.p");
			//World.remove(World.get("Tutorial.s2box"));
			//var T = World.get("Tutorial.t"),
			//	Tc= T.container;
			T.stage = 3;
			T.substage = 1;
	
			Tc.add(new Utils.Sequence([
			{
				c:function(){return true},
				e:function(){
					txt.clear();
					txt.txt[2] = "These next targets will take";
					txt.txt[1] = "more than one hit to destroy";
					txt.txt[0] = "[SPACE]";
				}
			},{
				c:function(){return spacecont.consume()},
				e:function(){
					txt.clear();
					txt.txt[2] = "And will drop collectible";
					txt.txt[1] = "items once disposed of";
					txt.txt[0] = "[SPACE]";
				}
			},{
				c:function(){return spacecont.consume()},
				e:function(){
					txt.clear();
					txt.txt[2] = "Most objects in this game";
					txt.txt[1] = "drop items when destroyed";
					txt.txt[0] = "[SPACE]";
				}
			},{
				c:function(){return spacecont.consume()},
				e:function(){
					txt.clear();
					txt.txt[2] = "Simply move near the";
					txt.txt[1] = "items to pick them up";
					txt.txt[0] = "[SPACE]";
					//Tc.add(targetspawns);
					//txt.txt[1] = "For now you can only";
					//txt.txt[0] = "shoot while in the main sector";
				}
			},{
				c:function(){return spacecont.consume()},
				e:function(){
					txt.clear();
					txt.txt[1] = "Destroy all targets and";
					txt.txt[0] = "pick up all items to continue";
					for (var i = 0; i < 2; i++){
						Tc.add(new DroppingTarget(randpos()));
						T.substage++;
					}
					T.substage--;
				}
			}
			]));
			p.weapon = new Tutweapon();
			p.weapon.owner = p;
			/*
			Tc.add(new Utils.Sequence([
			{
				c:function(){return true},
				e:function(){
					
					for (var i = 0; i < 5; i++)
						Tc.add(new DroppingTarget(randpos()));
				}
			}
			]));*/
		}
	},{//mining - switching weapons shooting ores then collecting drops
		c:function(){return World.get("Tutorial.t").substage == 0 && World.get("drops").getq().length == 0;},
		e:function(){
			txt.clear();
			txt.txt[1] = "Tutorial Completed!"
			txt.txt[0] = "More content coming soon"
		}
	},{
		
	},{
		
	},{
		
	}]
	);
	this.createSave = function(){	// fresh initialize
		this.stage = 0;
		this.substage = 0;
		galaxy.sectorSize = 35;
		galaxy.visibleSize = 15;
		World.get("entities.player").empty();
		World.add(new Player(),"entities.player.p");
		
		galaxy.toggleWrap(true);
		this.container.add(Stages);
		this.container.add(new (function(){
			this.render = function(g){
				var c = Physics.tscale(galaxy.sectorSize/2),
					x = c-165, y = c+95,
					b = World.getbounds();
				//if (y > b.d + World.y) y = b.d + World.y;
				//if (y < b.u + World.y) y = b.u + World.y;
				if (y > b.d) y = b.d;
				if (y < b.u+75) y = b.u+75;
				if (x > b.r-330) x = b.r-330;
				if (x < b.l) x = b.l;
				//console.log(c);
				g.globalAlpha = .5;
				g.font = "100px Arial";
				g.fillStyle = "white";
				g.fillText("Tutorial",x,y);
			}
		})());
		this.container.add(txt);
		this.container.add(spacecont);
			U.add(new UI.Follow(txt,World.get("entities.player.p").abb.pos,0,-1,Physics.scale),"follows.");
		//console.log(this.container);
	}
	this.loadSave = function(file){	// initialize from save
		//this.createSave();
		this.stage = file.stage;
		//galaxy.visibleSize = 10;
		/*this.substage = 0;
		galaxy.sectorSize = 15;
		galaxy.visibleSize = 12;
		World.add(new Player(),"entities.player.p");
		
		galaxy.toggleWrap(true);
		this.container.add(Stages);
		*/
		//console.log(this.stage);
		for (var i = this.stage; i > 1; i--){
			Stages.skip();
			//console.log("skipped");
		}
	}
	this.getSave = function(){	// prepare save
		return {
			stage:this.stage,
			
		};
	}
}
/*function Saveable(){
	this.createSave = function(){	// fresh initialize
		
	}
	this.loadSave = function(file){	// initialize from save
		
	}
	this.getSave = function(){	// prepare save
		
	}
}
entities 6-10
ores 2-5
structures 1
*/
function Sector(x,y){
	this.seed = "x"+x+"y"+y+"gs"+galaxy.seed;
	this.generate = function(){
		Math.seedrandom(this.seed);
		var sectorObjs = [],
			objCount = Math.random()*10+15;
		for (var i = 0; i < objCount; i++){
			//if (Math.random()<.1)//structure
			//	U.add(new Structure(),"structures.");
				//sectorObjs.push(new Structure());
			//else if (Math.random()<.5)//ore
				World.add(new Ores.T1((Math.random()+x)*galaxy.sectorSize,(Math.random()+y)*galaxy.sectorSize),"ores.");
		}
				World.add(new Ores.T1(1,1),"ores.");
				World.add(new Ores.T1(1,galaxy.sectorSize-1),"ores.");
				World.add(new Ores.T1(galaxy.sectorSize-1,1),"ores.");
				World.add(new Ores.T1(galaxy.sectorSize-1,galaxy.sectorSize-1),"ores.");
				//sectorObjs.push(new T1Ore((Math.random()+x)*G.sectorSize,(Math.random()+y)*G.sectorSize));
			//else 
			//	U.add(new Entity(),"entities.");
				//sectorObjs.push(new Entity());
		//for (var i = 0; i < sectorObjs.length; i++)
			
		return this;
	}
	this.createSave = function(){
		
	}
	this.loadSave = function(save){
		
	}
	this.getSave = function(){
		
	}
	this.contains = function(o){
		var s = o.getSector();
		return s.x==x&&s.y==y;
	}
	this.remove = function(){
		var ores = World.get("ores").getq();
		for (var o = 0; o < ores.length; o++)
			if (this.contains(ores[o])){
				ores[o].container.remove(ores[o]);
				o = -1;
			}
	}
}
function Entity(){
	
}
function Structure(){
	
}
function ShowInstructions(){
	function Instructions(){
		this.keydown = function(k){
			if (k.name != "space") return;
			U.remove(this);
			StartGame();
		}
		this.render = function(g){
			g.fillStyle = "white";
			g.font = "30px Arial";
			Drw.drawCText(g,"WASD to move",0,-50);
			Drw.drawCText(g,"Mouse to aim and left click to shoot",0,-10);
			Drw.drawCText(g,"Press Space to begin game",0,30);
		}
	}
	U.add(new Instructions());
}
var Ores = new (function(){
	function Ore(pos, size, corecolor){//abb,color){
		//if (coresize > 2.7)	coresize = 2.7;
		this.core = new Physics.ABB(pos,size*.6,size*.6).setColor(corecolor);
		this.abb = new Physics.ABB(pos,size,size).setColor("grey");
		//this.color = color || -1;
		this.init = function(){
			
		}
		this.getSector = function(){
			var s = galaxy.sectorSize;
			return {x:Math.floor(this.abb.pos.x/s),y:Math.floor(this.abb.pos.y/s),xx:Math.floor(Math.abs(this.abb.pos.x)%s),yy:Math.floor(Math.abs(this.abb.pos.y)%s)};
		}
		this.update = function(delta){
			//if (this.abb.collide(U.get("entities.player").abb))
			//	console.log("ore collision");
		}
		this.render = function(g){
			this.abb.render(g);
			this.core.render(g);
		}
	}
	this.T1 = function(x,y){	return new Ore(new Physics.Vec(x,y),1.5,"red");	}
})();
var Projectiles = new (function(){
	//this.
})();
var Weapons = new (function(){
	this.Miner = function(){
		this.render = function(g){
			
		}
	}
})();

function Player(){
	this.init = function(){
		//this.pos = new Physics.Vec();
		var s = galaxy.sectorSize;
		this.abb = new Physics.ABB(new Physics.Vec(s/2,s/2),.5,.5).setColor("grey");
		this.dpad=new K.dpad("wasd");
		this.container.add(this.dpad);
		//this.container.add(this.cd = new Utils.Timer(1/5).setLoop(true).start());
	//	this.container.add(new UI.Follow(this.container.camera,this.pos));
		//this.container.add(new UI.Follow(this,this.pos));
		this.abb.setMaxVel(6.5);
		U.add(new UI.Follow(World.camera,this.abb.pos,0,0,Physics.scale),"follows.");
		U.add(new UI.Follow(this,this.abb.pos,0,0,Physics.scale),"follows.");
		this.hp=this.mhp=50;
		this.rl=1;
		this.ul=-1;
	}
	this.createSave = function(){
	}
	this.loadSave = function(save){
		//console.log(save);
		var sl = save.sectorloc;
		//console.log(sl);
		this.abb.pos.x=sl.x*galaxy.sectorSize+sl.xx;
		this.abb.pos.y=sl.y*galaxy.sectorSize+sl.yy;
		//console.log(this.abb);
	}
	this.getSave = function(){
		return {
			sectorloc:this.getSector()
		};
	}
	this.getSector = function(){
		var s = galaxy.sectorSize;
		return {x:Math.floor(this.abb.pos.x/s),y:Math.floor(this.abb.pos.y/s),xx:(Math.abs(this.abb.pos.x)%s),yy:(Math.abs(this.abb.pos.y)%s)};
	}
	this.barrelPos = function(){
		
	}
	this.keydown = function(k){
		//if (k.name=="space")
		//	console.log(
		//World.get("Tutorial.t").createSave();
		//	this.abb.setVel(new Physics.Vec());
		//	galaxy.toggleWrap();
			//galaxy.unloadSector(this.getSector().x,this.getSector().y);
			//World.frozen = !World.frozen;
			//console.log(U.getq());
	}
	this.mousedown = function(){
		
		if (exists(this.weapon))
			if (exists(this.weapon.down))
				this.weapon.down();
	}
	this.update=function(delta){
		//this.pos.add(new Physics.Vec(this.dpad.dx,this.dpad.dy).setLen(6.5));
		//if (this.dpad.dx!=0||this.dpad.dy!=0)
			this.abb.addVel(new Physics.Vec(this.dpad.dx,this.dpad.dy).setLen(25*delta));
		this.abb.update(delta);
		if (exists(this.weapon)){
			if (exists(this.weapon.aimat))
				this.weapon.aimat(this.abb.pos.copy().add(
					//new Physics.Vec(Physics.fscale(Ms.relx(this)),Physics.fscale(Ms.rely(this)))
					new Physics.Vec(Ms.relx(this),Ms.rely(this)).mult(1/this.container.cumZoom()/Physics.scale)
				));
			if (exists(this.weapon.update))
				this.weapon.update(delta);
		}
			//console.log(new Physics.Vec(Ms.relx(this),Ms.rely(this)).mult(1/this.container.cumZoom()/Physics.scale));
			//console.log(new Physics.Vec(Ms.reld(this)/this.container.cumZoom()/Physics.scale,0).rotateto(Ms.rela(this)));
			//console.log("");
			//console.log(this.container.cumZoom()+0);
		//this.abb.pos.add(new Physics.Vec(this.dpad.dx,this.dpad.dy).setLen(6.5*delta));
		//this.x+=this.dpad.dx;this.y+=this.dpad.dy;
		/*
		if(this.hp<=0){
			U.remove("enemies");
			this.container.remove(this);
			U.add(new Utils.Timer().start().setAuto(true,function(){console.log("AAAAHHH");
				U.container.get("stats")["container"]=undefined;
			localStorage.setItem("highscores",JSON.stringify(U.container.get("stats")));
			start();}));
			
			
		};
		U.get("stats").tme+=delta;
		var s=U.container.get("stats")||U.get("stats"),
		s2=U.get("stats");
		if(s.sht<s2.sht)s.sht=s2.sht;
		if(s.hit<s2.hit)s.hit=s2.hit;
		if(s.tme<s2.tme)s.tme=s2.tme;
		U.container.add(s,"stats");
		
		if(Ms.isdown())
			if(this.cd.consume())
				U.add(new Bullet(
					this.abb.pos.x,
					this.abb.pos.y
				),"bullets.");*/
	}
	this.render=function(g){
		g.fillStyle = "white";
		var x = (this.abb.pos.x),
			y = (this.abb.pos.y),
			s = galaxy.sectorSize,
			v = galaxy.visibleSize,
			mx = x%s,
			my = y%s,
			nx =  Math.abs(x%s)*Math.sign(x),
			ny = Math.abs(y%s)*Math.sign(y),
			px = (s-Math.abs(x%s))*Math.sign(x),
			py = (s-Math.abs(y%s))*Math.sign(y);
			
		if (Math.abs(nx) < v/2)	g.fillRect((x-nx)*Physics.scale-2,(y-v/2)*Physics.scale,3,v*Physics.scale);
		if (Math.abs(px) < v/2)	g.fillRect((x+px)*Physics.scale-2,(y-v/2)*Physics.scale,3,v*Physics.scale);
		if (Math.abs(ny) < v/2)	g.fillRect((x-v/2)*Physics.scale,(y-ny)*Physics.scale-2,v*Physics.scale,3);
		if (Math.abs(py) < v/2)	g.fillRect((x-v/2)*Physics.scale,(y+py)*Physics.scale-2,v*Physics.scale,3);
		
		this.abb.render(g);
		g.translate(this.abb.pos.x*Physics.scale,this.abb.pos.y*Physics.scale);
		if (exists(this.weapon))
			if (exists(this.weapon.render))
				this.weapon.render(g);
		//g.translate(this.abb.pos.x*Physics.scale,this.abb.pos.y*Physics.scale);
		//g.fillStyle="darkgrey";
		//if(this.hp>0)
		//	g.fillRect(-25,20,this.hp/this.mhp*50,5);
		//g.rotate(Ms.rela(this));
		//g.fillRect(0,-5,40,10)
	}
}
/*
function Player(){
	this.init = function(){
		this.pos = new Physics.Vec();
		this.abb = new Physics.ABB(new Physics.Vec(),50,50).setColor("blue");
		this.dpad=new K.dpad("wasd");
		this.container.add(this.dpad);
		this.container.add(this.cd = new Utils.Timer(1/5).setLoop(true).start());
	//	this.container.add(new UI.Follow(this.container.camera,this.pos));
		//this.container.add(new UI.Follow(this,this.pos));
		this.container.add(new UI.Follow(this.container.camera,this.abb.pos));
		this.container.add(new UI.Follow(this,this.abb.pos));
		this.hp=this.mhp=50;
		this.rl=1;
		this.ul=-1;
		U.add(new UI.DBox(),"bullets");
	}
	this.keydown = function(k){
		if (k.name=="space")
			console.log(U.getq());
	}
	this.update=function(delta){
		//this.pos.add(new Physics.Vec(this.dpad.dx,this.dpad.dy).setLen(6.5));
		this.abb.pos.add(new Physics.Vec(this.dpad.dx,this.dpad.dy).setLen(6.5));
		//this.x+=this.dpad.dx;this.y+=this.dpad.dy;
		if(this.hp<=0){
			U.remove("enemies");
			this.container.remove(this);
			U.add(new Utils.Timer().start().setAuto(true,function(){console.log("AAAAHHH");
				U.container.get("stats")["container"]=undefined;
			localStorage.setItem("highscores",JSON.stringify(U.container.get("stats")));
			start();}));
			
			
		};
		U.get("stats").tme+=delta;
		var s=U.container.get("stats")||U.get("stats"),
		s2=U.get("stats");
		if(s.sht<s2.sht)s.sht=s2.sht;
		if(s.hit<s2.hit)s.hit=s2.hit;
		if(s.tme<s2.tme)s.tme=s2.tme;
		U.container.add(s,"stats");
		
		if(Ms.isdown())
			if(this.cd.consume())
				U.add(new Bullet(
					this.abb.pos.x,
					this.abb.pos.y
				),"bullets.");
	}
	this.render=function(g){
		this.abb.render(g);
		//g.fillStyle="blue";
		//g.fillRect(this.x-25,this.y-25,50,50);
		g.translate(this.abb.pos.x,this.abb.pos.y);
		g.fillStyle="dodgerblue";
		if(this.hp>0)
			g.fillRect(-25,20,this.hp/this.mhp*50,5);
		g.rotate(Ms.rela(this));
		g.fillRect(0,-5,40,10)
	}
}
function Bullet(x,y){
	this.abb = new Physics.ABB(new Physics.Vec(x,y),20,20).setColor("cyan");
	//this.x=x;this.y=y;
	this.dist=0;
	this.rng=500;
	this.pierce=0;
	this.init=function(){
		//this.container.add(this.abb);
		this.a=Ms.rela({x:this.abb.pos.x,y:this.abb.pos.y,container:this.container});
		//this.container.remove(this.abb);
		this.abb.pos.add(new Physics.Vec(30,0).rotateto(this.a));
//		this.abb.x+=30*Math.cos(this.a);
	//	this.abb.y+=30*Math.sin(this.a);
		//this.abb = new Physics.ABB(this.x,this.y,20,20).setColor("cyan");
		U.get("stats").sht++;
	}
	this.update=function(){
		//this.abb.x+=10*Math.cos(this.a);
		//this.abb.y+=10*Math.sin(this.a);
		this.abb.pos.add(new Physics.Vec(10,0).rotateto(this.a));
		this.dist+=10;
		if(this.dist>this.rng||this.pierce<0)
			this.container.remove(this);
	}
	this.render=function(g){
		this.abb.render(g);
		//g.fillStyle="cyan";
		//g.fillRect(this.x-10,this.y-10,20,20);
	}
}
function SB(){
	U.add(new UI.Follow(this,U.get("player"),-500,-500));
	this.rl=2;
	this.render=function(g){
		var c=U.get("stats"),h=U.container.get("stats");
		g.translate(this.x,this.y);
		g.font="30px Arial";
		g.fillStyle="white";
		g.fillText("current    highscore",110,30);
		g.fillText("shots        "+(c.sht),10,70);
		g.fillText("hits           "+c.hit,10,110);
		g.fillText("time          "+Math.round(c.tme),10,150);
		g.fillText(h.sht,280,70);
		g.fillText(h.hit,280,110);
		g.fillText(Math.round(h.tme),280,150);
	}
}*/
