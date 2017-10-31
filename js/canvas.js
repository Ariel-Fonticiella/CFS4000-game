/* Canvas Variables */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

window.addEventListener('resize',
    function() {
      canvas.width = window.innerWidth;
      canvas.height= window.innerHeight;
    });
    
/* Mouse Tracking */
// var mouse = {
//     x: undefined,
//     y: undefined
//   };
//
// window.addEventListener('mousemove',
//     function(event){
//       mouse.x = event.x;
//       mouse.y = event.y;
//       console.log(mouse);
// });
