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

  var game ={

    beatCounter: 1,
    playerOneSequence: [],
    playerTwoRepeat:[],
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

   startGame: function(){
    event.preventDefault();
    $('#start').fadeTo(0,0,function(){
      $(this).prop("disabled",true);
    });
    game.round++;
    game.roundNum.text("Round: "+game.round);
    $('h3').fadeTo(0,1);
    $('h2').fadeTo(0,1);
    game.playerOneToArray();
    game.beatCounter= 1
    game.playerOneSequence=[];
    game.playerTwoRepeat=[];


  },
  playerOneToArray: function(){
   $(document).on('keypress', function(e) {
    if([119,100,115,97].indexOf(e.keyCode)!== -1){
     game.playerOneSequence.push(game.keyboardMap[e.keyCode]);
     console.log(game.playerOneSequence);
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
      console.log(game.playerTwoRepeat[i]);
      console.log(game.playerOneSequence[i]);
      if(game.playerTwoRepeat[i] !== game.playerOneSequence[i]) {
        soundManager.stop(song)
        var audio = new Audio('./sounds/Wrong Buzzer.mp3');
        audio.play();
        game.gameOver();
        $(document).off('keydown');


      }
      else if(game.playerTwoRepeat.slice(0,game.beatCounter).toString()=== game.playerOneSequence.slice(0,game.beatCounter).toString()){
        game.playerOneSequence;
        console.log(game.playerTwoRepeat);
        console.log(game.playerOneSequence);
        console.log(game.beatCounter)
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
  game.playerOneToArray();
  game.round++;
  game.roundNum.text("Round: "+game.round);
  $('#player').text("Player 1");
  console.log(game.playerTwoRepeat);
  console.log(game.playerOneSequence);
  console.log(game.beatCounter)
},

  gameOver: function(){
    game.roundNum.text("Game Over! You Reached Round: "+game.round);
    $('#start').fadeTo(0,1).prop("disabled",false);
    game.round = 0;

  },

keyboardSequence: function(id){
 $(id).trigger("click");
 // $(id).addClass("hit");
 // $(document).keyup(function(){
 //  $(id).removeClass("hit");
 // }
},
}
$('#start').on('click', game.startGame);
})





