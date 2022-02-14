/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEY = {
    "UP": 38,
    "DOWN": 40,

    "W": 83,
    "S": 87,
  };

  var BOARD_WIDTH = $('#board').width(); // Number: the maximum X-Coordinate of the screen
  var BOARD_HEIGHT = $('#board').height();
  
  // Game Item Objects

  function GameItem(x, y, speedX, speedY, id) {
    var gameItemInstance = {
      x: x,
      y: y,
      h: $(id).height(),
      w: $(id).width(),
      speedX: speedX,
      speedY: speedY,
      id: id,
    };
    return gameItemInstance;
  }

  var paddleLeft = GameItem(20, 200, 0, 0, "#paddleLeft");

  var paddleRight = GameItem(BOARD_WIDTH - 20 - $('#paddleRight').width(), 200, 0, 0, "#paddleRight");

  var ball = GameItem(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), "#ball");



  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown); // change 'eventType' to the type of event you want to handle

  $(document).on('keyup', handleKeyUp); // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawGameObject(paddleLeft);
    drawGameObject(paddleRight);
    drawGameObject(ball);

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {

    if (event.which === KEY.UP) {
      paddleRight.speedY = -7;
    }
    if (event.which === KEY.DOWN) {
      paddleRight.speedY = 7;
    }

    if (event.which === KEY.W) {
      paddleLeft.speedY = 7;
    }
    if (event.which === KEY.S) {
      paddleLeft.speedY = -7;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      paddleRight.speedY = 0;
    }
    if (event.which === KEY.W || event.which === KEY.S) {
      paddleLeft.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function drawGameObject(obj) {
    obj.y += obj.speedY; // update the position of paddleLeft along the y-axis
    obj.x += obj.speedX;
    $(obj.id).css("top", obj.y); // draw paddleLeft in the new location, positionY pixels away from the "top"
    $(obj.id).css("left", obj.x);
  }




  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}