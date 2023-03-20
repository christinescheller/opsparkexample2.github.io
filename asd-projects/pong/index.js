/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
//KEY object that assigns the key numbers to their respective keys
    //needs w, s, up, and down

     var KEY = {
       "UP": 38,
       "DOWN": 40,
        "W": 87,
        "S": 83,
        }
     
//variables
  var speedY = 0;
  var speedX = 0;


 const BOARD_WIDTH = $('#board').width();
 const BOARD_HEIGHT = $('#board').height();
 const PADDLE_WIDTH = $("#paddleRight").width();
 const PADDLE_HEIGHT = $("#paddleRight").height();
 const PADDLE2_WIDTH = $("#paddleLeft").width();
 const PADDLE2_HEIGHT = $("#paddleLeft").height();



  // Game Item Objects
   
  function GameItem(x, y, speedX, speedY, id){
    var item = {
     x: x,
     y: y, 
     speedX: speedX,
     speedY: speedY,
     h: $(id).height(),
     w: $(id).width(),
     id: id,
    }
      return item;
  
  }

    var paddleLeft = GameItem(10, 200, 0, 0, '#paddleLeft');
    var paddleRight = GameItem(BOARD_WIDTH - 10 -$('#paddleRight').width(), 200 , 0, 0, '#paddleRight');
    var ball = GameItem(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), '#ball');




  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  //create an event listener for
  
 
 ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawItem(paddleLeft);
    drawItem(paddleRight);
    drawItem(ball);
    updateItem(paddleLeft);
    updateItem(paddleRight);
    updateItem(ball);
    paddleBoundary();
  }
  
  /* 
  Called in response to events.
  */
 
 //handles movement for paddles
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      paddleRight.speedY = -5;
    }
   
    if (event.which === KEY.DOWN) {
      paddleRight.speedY = 5;
           
    } 
    if (event.which === KEY.W) {
      paddleLeft.speedY = -5;
           
    } 
    if (event.which === KEY.S) {
      paddleLeft.speedY = 5;
           
    } 
  }

//function that handles Keyup

 function handleKeyUp(){
     if (event.which === KEY.UP) {
          paddleRight.speedY = 0;         
     }
     if (event.which === KEY.DOWN) {
          paddleRight.speedY = 0;          
  
     }
     if (event.which === KEY.W) {
      paddleLeft.speedY = 0;
           
    } 
    if (event.which === KEY.S) {
      paddleLeft.speedY = 0;
           
    } 
}
  
 
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  //redraws the image of the object on every frame
  function drawItem(obj){
    $(obj.id).css("top", obj.y); //draw an object in the new location on the y axis.
    $(obj.id).css("left", obj.x); //draws an object in the new location on the x axis.


  }

  //update the position of the object on every frame
  function updateItem(obj){
    obj.x = obj.x + obj.speedX;
    obj.y = obj.y + obj.speedY;
  }

  //function that checks the boundaries of top and bottom walls
       //ball changes direction
    




  //function that checks the boundaries of the right and left walls
      //ball doesn't bounce but it awards a point to the other player
      //ball resets in middle
 


  //function that checks the boundaries for the paddles (top/bottom)
  function paddleBoundary(){
   
      if(paddleLeft.y > BOARD_HEIGHT - paddleLeft.h){
        paddleLeft.y = BOARD_HEIGHT - paddleLeft.h;
      }
      if(paddleLeft.y < 0){
        paddleLeft.y = 0;
      }
       
  }
  

   //function that will handle what happens when a player scores 



   //function that will display the score
  


   //function that will handle winner instance


   //function that will display play again button when winner is determined


   //do Collide function to determine if two objects have collided (copy/paste one we did in class)
     function doCollide(obj1, obj2) {
    
        obj1.leftX = obj1.x;
        obj1.topY = obj1.y;
        obj1.rightX = obj1.leftX + $(obj1.id).width();
        obj1.bottomY = obj1.topY + $(obj1.id).height();
      
      
        obj2.leftX = obj2.x;
        obj2.topY = obj2.y;
        obj2.rightX = obj2.leftX + $(obj2.id).width();
        obj2.bottomY = obj2.topY + $(obj2.id).height();
    }

   //function that changes ball speed when it hits the paddle


   //function that will handle what happens when the ball hits the paddle
       //ball changes direction
       //ball speeds up


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
