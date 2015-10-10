$(function(){
  var doc = $('html')
  doc.keypress(function(e){
    e = e || window.event;
    switch (event.keyCode) {
      case 119:
          console.log("W");
          break;
      case 97:
          console.log("A");
          break;
      case 115:
          console.log('S');
          break;
      case 100:
          console.log('D');
          break;
}
})

  doc.keydown(function(e){
  switch (event.keyCode) {
          case 37:
              console.log("Left");
              break;
          case 38:
              console.log("Up");
              break;
          case 39:
              console.log('Right');
              break;
          case 40:
              console.log('Down');
              break;
      }
})
})



