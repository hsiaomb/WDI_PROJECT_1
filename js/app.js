$(function(){
  var game ={
    playerOneSequence: [],
    playerTwoSequence:[],
    playerOneRepeat:[],
    playerTwoRepeat:[],
    round: 0,
    turnCounter: 0,
    playerOneScore: 0,
    playerTwoScore: 0,

    playerOneToArray: function(){
     document.addEventListener('keypress', function(e) {
       game.playerOneSequence.push(e.keyCode);
       console.log(game.playerOneSequence.slice(0,4));
       if (game.playerOneSequence.length === 4){

        for (var i = 0; i <= game.playerOneSequence.length; i++) {
            (function(index) {
                setTimeout(function() {game.keyboardSequence(game.playerOneSequence[index]); }, i * 1000);
            })(i);
        }

     //    for(var i = 0; i < game.playerOneSequence.length; i++){

     // setTimeout(function(){
     //  console.log(game.playerOneSequence[i])}, 1000*i);
     
     //        // keyboard(game.playerOneSequence[i]);
               game.playerTwoRepeatArray();
             };
          
        // game.playerOneSequence.slice(0,4).trigger("click")
      })
   },

   playerTwoRepeatArray: function(){
    document.addEventListener('keypress', function(e) {
      game.playerTwoRepeat.push(e.keyCode);
      console.log(game.playerTwoRepeat.slice(0,4));
      if (game.playerTwoRepeat.slice(0,4).toString() === game.playerOneSequence.slice(0,4).toString()){
        console.log("Match");
      }
      else {
        console.log("Not a match!");
        playerOneScore++;
        $("#data-string").innerText(playerOneScore);



      }
    })



  },
  repeatKeyboardSequence: function(){$('html').keypress(function(e){
    e = e || window.event;
   switch (keycode) {
     case 119:
     $("#high-tom").trigger("click");
     break;
     case 97:
     $("#high-hat").trigger("click");
     break;
     case 115:
     $("#snare-drum").trigger("click");
     break;
     case 100:
     $("#bass-drum").trigger("click");
     break;
   }
 })
 },
  keyboardSequence: function(keycode){
   switch (keycode) {
     case 119:
     $("#high-tom").trigger("click");
     break;
     case 97:
     $("#high-hat").trigger("click");
     break;
     case 115:
     $("#snare-drum").trigger("click");
     break;
     case 100:
     $("#bass-drum").trigger("click");
     break;
  // keyboard: function(){$('html').keypress(function(e){
  //   e = e || window.event;
  //   switch (event.keyCode) {
  //     case 119:
  //         $("#high-tom").trigger("click");
  //         break;
  //     case 97:
  //         $("#high-hat").trigger("click");
  //         break;
  //     case 115:
  //         $("#snare-drum").trigger("click");
  //         break;
  //     case 100:
  //         $("#bass-drum").trigger("click");
  //         break;
}
},

arrow: function(){$('html').keydown(function(e){
  e = e || window.event;
  switch (event.keyCode) {
    case 37:
    event.preventDefault;
    $("#high-hat").trigger("click");
    break;
    case 38:
    event.preventDefault;
    $("#high-tom").trigger("click");
    break;

    case 39:
    event.preventDefault;
    $("#bass-drum").trigger("click");
    break;
    case 40:
    event.preventDefault;
    $("#snare-drum").trigger("click");
    break;
  }
})
},
playSound: function(){
  var buttons = document.getElementsByTagName("td");
  soundManager.setup({
    url: "/swf/",
    preferFlash: true
  });

  for(var i = buttons.length -1; i >= 0; i--){
    buttons[i].addEventListener("click", playSong)
  }

  function playSong(){
    soundManager.createSound({
      id: event.target.getAttribute("data-song"),
      url: "./sounds/" + event.target.getAttribute("data-song") + ".wav"
    }).play();
  }
}
}
game.playSound();
game.arrow();
game.playerOneToArray();

})





