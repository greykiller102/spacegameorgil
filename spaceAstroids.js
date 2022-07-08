
var spaceShip = new Image();
var laser = new Image();
var rock = new Image();
spaceShip.src = 'https://www.pngmart.com/files/3/Spaceship-PNG-File.png';
laser.src = 'https://donaldcarling.files.wordpress.com/2016/03/blast-harrier-laser-1.png';
rock.src = 'https://www.pngmart.com/files/4/Asteroid-PNG-Photos.png';
console.log(rock);

var alienHit =0;
var haruul =0;
var prompt;
var start = false;
var onoo = 1;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;
var BulletAmounts = 2;
var starInitial = 10;
var count=0;
var enemywidth = 50;
var enemyheight = 100;
var shoot = false;

window.addEventListener('keydown',function(){
	canvas.key=event.keyCode;
	if(canvas.key === 32){
		canvas.key=event.keyCode;
		shoot=true;
	}
})


window.addEventListener('keyup',function(){
	canvas.key= false;
   })

function startGame(){
	Swal.fire({
		title: 'ALERT!',
		text: 'Spacerocks are coming!!',
		background:"black",
		color:"white",
		font:"font-family: 'VT323', monospace;",
		imageUrl: '/images/kino.jpg',
		imageWidth: 400,
		imageHeight: 200,
		imageAlt: 'Custom image',
	  }).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				text: 'We need to defend our ship!',
				imageUrl: '/images/defend.jpg',
				background:"black",
				color:"white",
				font:"Roboto",
				imageWidth: 400,
				imageHeight: 200,
				imageAlt: 'Custom image',
			  }).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						
						text: 'Get on your battle-ship and shoot them all!',
						imageUrl: '/images/rocks.jpg',
						imageWidth: 400,
						imageHeight: 200,
						background:"black",
						color:"white",
						font:"Roboto",
						imageAlt: 'Custom image',
					  }).then((result) => {
						if (result.isConfirmed) {
							start = true;
							animate();
						} else {
							location.reload();
						}
					  })
				} else {
					location.reload();
				}
			  })
		} else {
			start = false;
		}
	  })
	  
	  
	  
	  
}


function Component(img,x,y,width,height,isBullet,isShip,isComet,color,dx,dy){
	this.img = img;
	this.x=x;
	this.y=y;
	this.color=color;
	this.width=width;
	this.height=height;
	this.dx=dx;
	this.radius=10;
	this.dy=dy;

	this.draw=function(){
	
		ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
		


	}


	this.collisionShipStars = function()
	{
		if((this.x ) < (ship.x + ship.width) && (this.x) > ship.x &&
               (this.y) < (ship.y + ship.height) && (this.y) > (ship.y))
		{
			console.log('hit by alien')
			if(alienHit <= 10 && l<=1){
				  Swal.fire({
						
					title: 'OH NO!',
					text: 'You hit by space-rock in 1st round.Score: '+haruul,
					imageUrl: './images/suirel.jpg',
					imageWidth: 400,
					imageHeight: 200,
					background:"black",
					color:"white",
					font:"Roboto",
					imageAlt: 'Custom image',
				  }).then((result) => {
					if (result.isConfirmed) {
						location.reload()
						}
				  })
			}else{
				  Swal.fire({
						
					title: 'Rest in peace soldier',
					text: 'You did your best.Your score is '+ haruul,
					imageUrl: './images/suirel.jpg',
					imageWidth: 400,
					imageHeight: 200,
					background:"black",
					color:"white",
					font:"Roboto",
					imageAlt: 'Custom image',
					backdrop: `
			  		rgba(0,0,123,0.4)
			  		url("/images/pngwing.com.png")
			  		left top
			  		no-repeat
					`,
				  }).then((result) => {
					if (result.isConfirmed) {
						location.reload()
						}
				  })
				}
			playAgain("Play Again?Y/N")
			
			start = false;
			

		}
	}
	this.collision = function(){
		if((this.x+enemyheight) < (bullet.x + bullet.width) && (this.x+enemyheight) > bullet.x &&
               (this.y+enemywidth) < bullet.y + bullet.height && (this.y+enemywidth) > bullet.y)
		{

			
			alienHit+=1;
			haruul += onoo;
			this.width= 0;
			this.x=0;
			this.y=0;
			this.dx=0;
			this.dy=0;
			this.height = 0;
			


		}
		if(alienHit >= starInitial){
			ctx.font="50px Arial";
			ctx.fillStyle="white"
			ctx.fillText("You Win!",innerWidth/2-100,innerHeight/2);
		}

	}
	this.update = function () {
		if(isBullet){

			if(canvas.key && canvas.key === 32)
			{
				bullet.y=ship.y;
				bullet.x=ship.x;


			}
			bullet.y-=20;

			this.draw();
		}

		else if(isShip){
			if(this.x >= innerWidth-this.width || this.x <= 0){
				this.x = -this.x
			}
			if(this.y >= innerHeight-this.height|| this.y <= 0){
				this.y = -this.y;

			}

			if(canvas.key && canvas.key == 37){
				this.x -= 15;
			}
			else if (canvas.key && canvas.key ==39){
				this.x+=15;
			}
			else if(canvas.key && canvas.key== 38){
				this.y-=10;
			}
			else if(canvas.key && canvas.key == 40){
				this.y+=10;
			}else if(canvas.key&& canvas.key == 82){
				ship; 
			}
			this.draw();

		}
		else if(isComet){
			if((this.x + enemyheight > innerWidth )|| (this.x ) < 0 ){
				this.dx = -this.dx;// - temdegiig + bolgowol solir oilgohgui//

			}
			else if((this.y + enemywidth > innerHeight) || (this.y) < 0){
				this.dy = -this.dy;

			}
			this.x += this.dx;
			this.y += this.dy;
			this.collisionShipStars();
			this.draw();
		}
	}

}


var ship = new Component(spaceShip,innerWidth/2, innerHeight/2,100,50,false,true,false);
var bullet = new Component(laser,Math.random() * innerWidth, Math.random() * (innerHeight-110),100,50,true,false,false);
var randomloc = Math.floor(Math.random()*canvas.height);

var starArrays= [];
var bulletArray=[];
for(var i=0;i<BulletAmounts;i++){

	bulletArray.push(bullet);
}
startenemy();
function startenemy(){

	for (var i = 0; i<starInitial; i++){
		var dx = Math.random()*3;
		var dy = Math.random()*3; 	
		starArrays.push(new Component(rock, randomloc,0,enemyheight,enemywidth,false,false,true,"red",dx,dy));
	}
}





function animate(){
	if(start){
		

		nextround();
		playAgain("Play Again?Y/N")

		requestAnimationFrame(animate);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.font="50px 'VT323', monospace";
		ctx.fillStyle="rgb(110, 34, 109)"
		ctx.fillText("All round Score: " + haruul,50,150);
		ctx.fillText("You must shoot: " + starInitial +" Enemy",50,200);
		ctx.fillText("Point per 1 enemy in this round: " + onoo +" point",50,250);
		ctx.fillStyle="red";
		ctx.font="80px 'VT323', monospace"
		ctx.fillText("ITS BLACK HOLE DONT GET CLOSE!!!",250,canvas.height);
		


		for( var i=0; i<starArrays.length; i++){
			starArrays[i].update();
			starArrays[i].collision(starArrays[i]);
		}
		for (var b = 0; b<bulletArray.length;b++){
			if (shoot){
				bulletArray[b].update()
			    bulletArray[b].collision(bulletArray[b]);
			}
		}
		ship.update();
	}
}
var l = 1;
var nemegdeh =10;
function nextround(str){
	if(alienHit>=starInitial){
		starInitial +=starInitial;
		enemyheight+=5;
		enemywidth+=5;
		onoo += nemegdeh;
		alienHit = 0;
		
		Swal.fire({
			title: 'Round '+ l +" completed",
			width: 600,
			padding: '3em',
			color: '#716add',
			font:"Roboto",
			background: '#fff url(./images/Space-PNG-Pic.gif)',
			backdrop: `
			  rgba(0,0,123,0.4)
			  url("/images/pngwing.com.png")
			  left top
			  no-repeat
			`
		  }).then((result) => {
			if (result.isConfirmed) {
				setTimeout(()=>{
					startenemy();
				},2000)
				}
		  })
		l++
		if(l >= 5){
			Swal.fire({
							
				title: 'Congratulation!',
				text: 'You destroyed all of space rocks! Score: '+ haruul,
				imageUrl: './images/winner.webp',
				imageWidth: 400,
				imageHeight: 200,
				background:"black",
				color:"white",
				imageAlt: 'Custom image',
				backdrop: `
				  rgba(0,0,123,0.4)
				  url("/images/pngwing.com.png")
				  left top
				  no-repeat
				`,
			  }).then((result) => {
				if (result.isConfirmed) {
					start=false;
					location.reload()
					}
			  })
			  
		}
		
	}
	
	
}
function playAgain(str){
	if(alienHit>=starInitial){
		prompt = prompt(str);
		if(prompt == "Y" || prompt === "y"){
			location.reload();
		}
		else{
			console.log("pass");
		}

	}
}
