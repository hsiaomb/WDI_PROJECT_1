$(function(){
  var buttons = $("td");
  soundManager.setup({
    url: "/swf/",
    preferFlash: true
  });

  $(buttons).on("click", playSong)

  function playSong(){
    song = $(this).attr("data-song");
    var element = $(this)
    element.addClass("hit");
    setTimeout(function(){$(buttons).removeClass("hit")}, 200);
    soundManager.createSound({
      id: song,
      url: "./sounds/" + song + ".wav"
    }).play();
  }
  $('h3').fadeTo(0,0);
  $('h2').fadeTo(0,0);
  $('.controls').hide(0,0)

  var game ={

    beatCounter: 1,
    playerOneSequence:[],
    playerTwoRepeat:[],
    computerSequence:[],
    round: 0,
    roundNum: $('#0'),
    keyboardMap: {
     119:  "#high-tom",
     97: "#high-hat",
     115: "#snare-drum",
     100: "#bass-drum"
   },
   arrowMap:{
     38:  "#high-tom",
     37: "#high-hat",
     40: "#snare-drum",
     39: "#bass-drum"
   },
   computerMap:{
    1:  "#high-tom",
    2: "#high-hat",
    3: "#snare-drum",
    4: "#bass-drum"
  },


  startGame: function(){
    event.preventDefault();
    $('#start').prop("disabled",true);
    $('#computer').prop("disabled",true);
    game.round = 1;
    game.roundNum.text("Round: "+game.round);
    $('.controls').show(0,0);
    $('h3').fadeTo(0,1);
    $('h2').fadeTo(0,1);
    $('#computerGame').show();
    $('#2').text("2");
    $('#3').text("Player 1");
    game.computerGame.off;
    game.playerOneArray();
    game.beatCounter= 1
    game.playerOneSequence=[];
    game.playerTwoRepeat=[];
  },
  playerOneArray: function(){
   $(document).on('keypress', function(e) {
    if([119,100,115,97].indexOf(e.keyCode)!== -1){
     game.playerOneSequence.push(game.keyboardMap[e.keyCode]);
     if (game.playerOneSequence.length === game.beatCounter){
      for (var i = 0; i < game.playerOneSequence.length; i++) {
        (function(index) {
          setTimeout(function() {game.keyboardSequence(game.playerOneSequence[index]);  }, i * 650);
        })(i);
      }
      $(document).off('keypress');
      game.playerTwoRepeatArray();
      $('#player').text("Player 2")
    };

  }
})
 },

 playerTwoRepeatArray: function(){
   $(document).on('keydown', function(e) {
    if([37,38,39,40].indexOf(e.keyCode) !== -1){
     game.playerTwoRepeat.push(game.arrowMap[e.keyCode]);
     $(game.arrowMap[e.keyCode]).trigger("click");
     for (var i = 0; i < game.playerTwoRepeat.length; i++) {
      if(game.playerTwoRepeat[i] !== game.playerOneSequence[i]) {
        soundManager.stop(song)
        var audio = new Audio('./sounds/Wrong Buzzer.mp3');
        audio.play();
        game.gameOver();
        $(document).off('keydown');
        $('.controls').hide();


      }
      else if(game.playerTwoRepeat.slice(0,game.beatCounter).toString()=== game.playerOneSequence.slice(0,game.beatCounter).toString()){
        $(document).off('keydown');
        game.nextRound();

      }
    };

  }
})

 },  

 nextRound: function(){
  game.playerTwoRepeat = [];
  game.playerOneSequence = [];
  game.beatCounter++;
  setTimeout(function(){game.playerOneArray(), 2000});
  game.round++;
  game.roundNum.text("Round: "+game.round);
  $('#player').text("Player 1");
},

gameOver: function(){
  game.roundNum.text("Game Over! You Reached Round: "+game.round);
  $('#start').fadeTo(0,1).prop("disabled",false);
  $('#computer').fadeTo(0,1).prop("disabled",false);
  game.round = 0;
  $('h3').fadeTo(0,0);

},

computerGame: function(){
  event.preventDefault();
  $('#computer').prop("disabled",true);
  $('#start').prop("disabled",true);
  game.round = 1;
  game.roundNum.text("Round: "+game.round);
  $('#computerGame').hide();
  $('#2').text("1");
  $('#3').text("Computer");
  $('h3').fadeTo(0,1);
  $('h2').fadeTo(0,1);
  $('.controls').fadeTo(0,1)
  game.startGame.off;
  game.beatCounter = 1
  game.computerSequence=[];
  game.playerTwoRepeat=[];
  game.computerToArray();
},

computerToArray: function(){ 
  $(document).off('keydown');
  var randomNumber = game.randomNumber();
  game.computerSequence.push(game.computerMap[randomNumber]);
  if (game.computerSequence.length === game.beatCounter){
    for (var i = 0; i <= game.computerSequence.length; i++) {
      (function(index) {
        setTimeout(function() {game.keyboardSequence(game.computerSequence[index]);  }, i * 650);
      })(i);
    }
    game.playerTwoRepeatComputerArray();
  };
  $('#player').text("Player 1")
},

playerTwoRepeatComputerArray: function(){
  $(document).on('keydown', function(e) {
    if([37,38,39,40].indexOf(e.keyCode) !== -1){
     game.playerTwoRepeat.push(game.arrowMap[e.keyCode]);
     $(game.arrowMap[e.keyCode]).trigger("click");
     for (var i = 0; i < game.playerTwoRepeat.length; i++) {
      if(game.playerTwoRepeat[i] !== game.computerSequence[i]) {
        soundManager.stop(song)
        var audio = new Audio('./sounds/Wrong Buzzer.mp3');
        audio.play();
        game.gameOver();
        $(document).off('keydown');
        $('.controls').hide();
      }
      else if(game.playerTwoRepeat.slice(0,game.beatCounter).toString()=== game.computerSequence.slice(0,game.beatCounter).toString()){
        $(document).off('keydown');
        game.nextRoundComputer();
      }
    };
  }
})
},  

nextRoundComputer: function(){
 game.playerTwoRepeat = [];
 game.beatCounter++;
 game.round++;
 setTimeout(function(){game.computerToArray()}, 2000);
 game.roundNum.text("Round: "+game.round);
 $('#player').text("Computer");
},

randomNumber: function() {
  return Math.floor((Math.random()*4)+1);
},

keyboardSequence: function(id){
 $(id).trigger("click");
},
}
$('#start').on('click', game.startGame);
$('#computer').on('click', game.computerGame);
})





