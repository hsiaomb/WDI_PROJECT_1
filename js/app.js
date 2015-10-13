$(function(){
  var buttons = $("td");
  soundManager.setup({
    url: "/swf/",
    preferFlash: true
  });

  $(buttons).on("click", playSong)

  function playSong(){
    var song = $(this).attr("data-song");
    soundManager.createSound({
      id: song,
      url: "./sounds/" + song + ".wav"
    }).play();
  }
  $('h2').hide();
  $('h3').hide();


  var game ={

    beatCounter: 1,
    playerOneSequence: [],
    playerTwoSequence:[],
    storedMoves:[],
    playerTwoRepeat:[],
    round: 0,
    playerTwoScore: 0,
    roundNum: $('#0'),
    playerTwoScoreboard: $('#2'),
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
    $('h2').fadeIn();
    $('h3').fadeIn();
    $('#start').fadeOut();
    game.round++;
    game.roundNum.text(game.round);

    game.playerOneToArray();

  },
  playerOneToArray: function(){
   $(document).on('keypress', function(e) {
    if([119,100,115,97].indexOf(e.keyCode)!== -1){
     game.playerOneSequence.push(game.keyboardMap[e.keyCode]);
     console.log(game.playerOneSequence);
     if (game.playerOneSequence.length === game.beatCounter){
      for (var i = 0; i < game.playerOneSequence.length; i++) {
        (function(index) {
          setTimeout(function() {game.keyboardSequence(game.playerOneSequence[index]); }, i * 650);
        })(i);
      }
      $(document).off('keypress');
      game.playerTwoRepeatArray();
    };

  }
})
 },

 playerTwoRepeatArray: function(){
   $(document).on('keydown', function(e) {
    if([37,38,39,40].indexOf(e.keyCode) !== -1){
     game.playerTwoRepeat.push(game.arrowMap[e.keyCode]);
     $(game.arrowMap[e.keyCode]).trigger("click");
     console.log(game.playerTwoRepeat);
     for (var i = 0; i < game.playerTwoRepeat.length; i++) {
      console.log(game.playerTwoRepeat[i]);
      console.log(game.playerOneSequence[i]);
      if(game.playerTwoRepeat[i] !== game.playerOneSequence[i]) {
        alert("you lose!");
      }
      else if(game.playerTwoRepeat.slice(0,game.beatCounter).toString()=== game.playerOneSequence.slice(0,game.beatCounter).toString()){
        alert("Nice! Next Round!");
        game.playerTwoScore++;
        game.playerTwoScoreboard.text(game.playerTwoScore);
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
  game.roundNum.text(game.round);
  console.log(game.playerTwoRepeat);
  console.log(game.playerOneSequence);
  console.log(game.beatCounter)

},

keyboardSequence: function(id){
 $(id).trigger("click");
},
}
$('#start').on('click', game.startGame);
})





