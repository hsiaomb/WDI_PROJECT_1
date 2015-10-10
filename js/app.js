$(function(){
var game ={
  keyboard: function(){$('html').keypress(function(e){
    e = e || window.event;
    switch (event.keyCode) {
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

  arrow: function(){$('html').keydown(function(e){
    e = e || window.event;
  switch (event.keyCode) {
          case 37:
             $("#high-hat").trigger("click");
              break;
          case 38:
              $("#high-tom").trigger("click");
              break;
          case 39:
              $("#bass-drum").trigger("click");
              break;
          case 40:
              $("#snare-drum").trigger("click");
              break;
      }
})
},
start: function(){
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
game.start();
game.arrow();
game.keyboard();
})





