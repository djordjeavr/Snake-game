interface Cordinate{
    x:number;
    y:number;
}

class Snake{

    fields:number=30;
    GAME:HTMLElement=document.getElementById('game');
    dx:number=0;
    dy:number=0;
    score:number=0;
    snake:Cordinate[]=[
        {y:5,x:7},
        {y:5,x:6},
        {y:5,x:5}
    ];
    food:Cordinate={x:12,y:8};
    renderScreen(){
        this.GAME.innerHTML='';
        for (let y = 0; y < this.fields; y++) {
           for (let x = 0; x < this.fields; x++) {
               
            let div=document.createElement('div');
            div.className='field'
            if(this.isSnakeOnScreen(y,x)){
                div.classList.add('snake');
            }
            if(this.isSnakeHead(y,x)){
                div.classList.add('snake-head');
            }
            if(this.isFoodOnScreen(y,x)){
                div.classList.add('food');
            }
            this.GAME.appendChild(div);
               
           }
            
        }
        
    }
    isSnakeOnScreen(y:number, x:number){
   for (let i = 0; i < this.snake.length; i++) {
      if(this.snake[i].x==x&&this.snake[i].y==y){
          return true;
      }
       
   }
    }
    private isFoodOnScreen(y:number, x:number):boolean{
        if(this.food.x==x && this.food.y==y){
            return true
        }
    }
   private isSnakeHead(y:number, x:number):boolean{
        let head=this.getSnakeHead();
        if(head.x==x&&head.y==y){
            return true;
        }
    }
  private  getSnakeHead(){
        return this.snake[0];
    }
    handleSnakeDirection(event){
    
        switch(event.keyCode){
             case 37:
                 console.log('Move Left');
                 if(this.dx!==1)
                 this.moveSnake('Left');
                 break;
                 case 38:
                 console.log('Move Up');
                 if(this.dy!==1)
                 this.moveSnake('Up');
                 break;
                 case 39:
                 console.log('Move Right');
                 if(this.dx!==-1)
                 this.moveSnake('Right');
                 break;
                 case 40:
                 console.log('Move Down');
                 if(this.dy!==-1)
                 this.moveSnake('Down');
                 break;
        }
     
    }
    moveSnake(direction:string){
       
           switch(direction){
               case 'Left':
                  this.dx=-1;
                  this.dy=0;
               break;
               case 'Right':
                this.dx=1;
                this.dy=0;
            break;
            case 'Up':
                this.dx=0;
                this.dy=-1;
            break;
            case 'Down':
                this.dx=0;
                this.dy=1;
            break;
           
           }
         
    }
    goSnake(){
        if(this.dx==0 && this.dy==0){
            return;
        }
      let head =this.getSnakeHead();
      let newX= head.x+this.dx;
      let newY=head.y+this.dy;
      newX=newX%this.fields;
      if(newX<0){
          newX=this.fields;
      }
      newY=newY%this.fields;
      if(newY<0){
        newY=this.fields;
    }
      this.snake.unshift({x:newX,y:newY});
      this.snake.pop();
    }
    playGame(){
        this.goSnake();
        let head=this.getSnakeHead();
        let interval=400;
        if(this.snake.length-3>5){
            interval=300;
        }
        if(this.snake.length-3>8){
            interval=200;
        }
        if(this.snake.length-3>11){
            interval=100;
        }
        if(head.x==this.food.x&& head.y==this.food.y){
              this.eatFood();
              this.readScore();
              this.food={x:Math.floor(Math.random()*this.fields),y:Math.floor(Math.random()*this.fields)}
        }
        this.gameOver();
        this.renderScreen();

        setTimeout(()=>{
            this.playGame();
        },interval)

    }
     private gameOver(){
         const head=this.getSnakeHead();
         for (let i = 1; i < this.snake.length; i++) {
             if(head.x==this.snake[i].x&&head.y==this.snake[i].y){
                this.snake=[ 
                    {y:5,x:7},
                    {y:5,x:6},
                    {y:5,x:5}
                ];
                this.score=0;
                this.dx=0;
                this.dy=0;
                 return alert('Game Over');
             }
             
         }
     }
    private eatFood(){
        let head =this.getSnakeHead();
        let newX= head.x+this.dx;
        let newY=head.y+this.dy;
        this.snake.unshift({x:newX,y:newY});
    }
    private readScore(){
        this.score++;
        let score=document.getElementById('score');
        score.innerHTML=`Score: ${this.score}`;
    }
}